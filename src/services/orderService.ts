"use server";

import authOptions from "@/src/authOptions";
import { prisma } from "@/src/lib/prisma";
import { getCarrierById } from "@/src/services/carrierService";
import { getCart, storeCart } from "@/src/services/cartService";
import { getSettings } from "@/src/services/settingService";
import {
  CartRow,
  CrudResults,
  CrudType,
  OrderDTO,
  emptyCart,
} from "@/src/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { Prisma } from "@prisma/client";
import { sendCustomerOrderCreatedEmail } from "@/src/services/mailService";

export async function createOrder(formData: FormData) {
  var cart = await getCart();
  const data = await getServerSession(authOptions);
  var user = data?.user!;
  var settings = await getSettings();
  var carrier = await getCarrierById(cart.carrierId!);

  var orderTotal =
    (parseFloat(`${carrier?.costs}`) || 0) + (parseFloat(`${cart.total}`) || 0);

  var order = await prisma.order.create({
    data: {
      carrierId: cart.carrierId,
      userId: user.id,
      shippingAddress: cart.deliveryAddress,
      shippingDeliveryTime: cart.deliveryTime,
      orderStateId: settings?.orderStateCreatedId,
      notes: (formData.get("note")?.valueOf() as string) ?? "",
      total: orderTotal,
    },
    include: {
      details: true,
    },
  });

  if (order.id) {
    const orderDetailPromises = Object.values(cart.items).map(
      async (row: CartRow) => {
        return prisma.orderDetail.create({
          data: {
            name: row.item.name,
            quantity: row.quantity,
            unitPrice: row.item.price,
            orderId: order.id,
          },
        });
      }
    );

    await Promise.all(orderDetailPromises);

    await prisma.orderDetail.create({
      data: {
        name: "Spese di consegna",
        quantity: 1,
        unitPrice: carrier?.costs ?? 0,
        orderId: order.id,
      },
    });

    await storeCart(emptyCart);

    await sendCustomerOrderCreatedEmail(order.id);

    redirect(`/account/ordini/${order.id}`);
  } else {
    redirect(`/`);
  }
}

export async function getOrderById(id: number) {
  return await prisma.order.findFirst({
    where: {
      id: id,
    },
    include: {
      carrier: true,
      details: {
        orderBy: {
          id: "asc",
        },
      },
      orderState: true,
    },
  });
}

export async function payOrder(formData: FormData) {
  const orderId = formData.get("orderId")?.valueOf() as string;

  const order = await getOrderById(parseInt(orderId));

  if (!order) {
    redirect("/");
  }

  const order_items = order.details.map((item) => {
    return {
      price_data: {
        currency: "eur",
        unit_amount: item.unitPrice.toNumber() * 100,
        product_data: {
          name: item.name,
        },
      },
      quantity: item.quantity,
    };
  });

  const { STRIPE_SECRET_KEY, SERVER_URL } = process.env;

  if (STRIPE_SECRET_KEY) {
    const stripe = new Stripe(STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      line_items: order_items,
      mode: "payment",
      success_url: `${SERVER_URL}/account/ordini/pagamento/successo?orderId=${order.id}`,
      cancel_url: `${SERVER_URL}/account/ordini/${order.id}`,
      metadata: {
        order_sku: order.id,
      },
    });

    if (session.url) {
      redirect(session.url);
    } else {
      redirect("/");
    }
  } else {
    redirect("/");
  }
}

export async function getAllOrderByCustomerId(
  userId: number,
  params: CrudType
): Promise<CrudResults<OrderDTO>> {
  var orderByParams: Prisma.OrderOrderByWithRelationInput = {};

  switch (params.orderBy) {
    case "id":
      orderByParams = { id: params.ascending ? "asc" : "desc" };
      break;
    case "total":
      orderByParams = { total: params.ascending ? "asc" : "desc" };
      break;
  }

  var whereParams: Prisma.OrderWhereInput = {};

  whereParams.deleted = false;
  whereParams.userId = userId;

  if (params.paginated) {
    return {
      items: await prisma.order.findMany({
        skip: params.perPage * (params.page - 1),
        take: params.perPage,
        orderBy: orderByParams,
        where: whereParams,
        include: {
          orderState: true,
        },
      }),
      count: await prisma.order.count({
        where: whereParams,
      }),
    };
  } else {
    return {
      items: await prisma.order.findMany({
        orderBy: orderByParams,
        where: whereParams,
        include: {
          orderState: true,
        },
      }),
      count: await prisma.order.count({
        where: whereParams,
      }),
    };
  }
}
