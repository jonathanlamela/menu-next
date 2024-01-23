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
  MessageType,
  OrderDTO,
  OrderDetailDTO,
  emptyCart,
} from "@/src/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { Prisma } from "@prisma/client";
import {
  sendCustomerOrderCreatedEmail,
  sendCustomerOrderStateUpdatedEmail,
} from "@/src/services/mailService";
import { revalidatePath, revalidateTag } from "next/cache";
import { pushMessage } from "@/src/services/messageService";

export async function createOrder(formData: FormData) {
  var cart = await getCart();
  const data = await getServerSession(authOptions);
  var user = data?.user!;
  var settings = await getSettings();
  var carrier = await getCarrierById(cart.carrierId!);

  var order = await prisma.order.create({
    data: {
      carrierId: cart.carrierId,
      userId: user.id,
      deliveryAddress: cart.deliveryAddress,
      deliveryTime: cart.deliveryTime,
      orderStateId: settings?.orderStateCreatedId,
      notes: (formData.get("note")?.valueOf() as string) ?? "",
      total: cart.total,
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
      user: true,
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
          carrier: true,
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
          carrier: true,
        },
      }),
      count: await prisma.order.count({
        where: whereParams,
      }),
    };
  }
}

export async function getAllOrders(
  params: CrudType
): Promise<CrudResults<OrderDTO>> {
  var orderByParams: Prisma.OrderOrderByWithRelationInput = {};

  switch (params.orderBy) {
    case "id":
      orderByParams = { id: params.ascending ? "asc" : "desc" };
      break;
    case "customer":
      orderByParams = {
        user: {
          lastname: params.ascending ? "asc" : "desc",
        },
      };
      break;
    case "orderState":
      orderByParams = {
        orderState: {
          name: params.ascending ? "asc" : "desc",
        },
      };
      break;
    case "total":
      orderByParams = { total: params.ascending ? "asc" : "desc" };
      break;
  }

  var whereParams: Prisma.OrderWhereInput = {};

  if (params.search && params.search != "") {
    whereParams = {
      user: {
        OR: [
          {
            firstname: {
              contains: params.search,
            },
          },
          {
            lastname: {
              contains: params.search,
            },
          },
        ],
      },
    };
  }

  if (!params.deleted) {
    whereParams.deleted = false;
  }

  if (params.paginated) {
    return {
      items: await prisma.order.findMany({
        skip: params.perPage * (params.page - 1),
        take: params.perPage,
        orderBy: orderByParams,
        where: whereParams,
        include: {
          user: true,
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
          user: true,
          orderState: true,
        },
      }),
      count: await prisma.order.count({
        where: whereParams,
      }),
    };
  }
}

export async function updateOrderDeliveryInfo(
  id: number,
  deliveryTime: string,
  deliveryAddress?: string | null | undefined
) {
  if (!deliveryTime) {
    redirect("/");
  }
  await prisma.order.update({
    data: {
      deliveryAddress: deliveryAddress,
      deliveryTime: deliveryTime,
    },
    where: {
      id: id,
    },
  });

  revalidatePath(`/amministrazione/vendite/ordini/modifica/${id}`);

  pushMessage({
    text: "Informazioni di consegna aggiornate con successo",
    type: MessageType.SUCCESS,
  });
}

export async function updateOrderCarrier(id: number, carrierId: number) {
  await prisma.order.update({
    data: {
      carrierId: carrierId,
    },
    where: {
      id: id,
    },
  });

  revalidatePath(`/amministrazione/vendite/ordini/modifica/${id}`);

  pushMessage({
    text: "Corriere ordine cambiato con successo",
    type: MessageType.SUCCESS,
  });
}

export async function updateOrderState(id: number, orderStateId: number) {
  await prisma.order.update({
    data: {
      orderStateId: orderStateId,
    },
    where: {
      id: id,
    },
  });

  await sendCustomerOrderStateUpdatedEmail(id);

  revalidatePath(`/amministrazione/vendite/ordini/modifica/${id}`);

  pushMessage({
    text: "Stato ordine cambiato con successo",
    type: MessageType.SUCCESS,
  });
}

export async function increaseItemQty(orderDetailId: number) {
  var orderDetail = await prisma.orderDetail.findFirst({
    where: {
      id: orderDetailId,
    },
  });

  if (orderDetail) {
    await prisma.orderDetail.update({
      data: {
        quantity: orderDetail.quantity + 1,
      },
      where: {
        id: orderDetailId,
      },
    });

    await updateOrderTotal(orderDetail.orderId);

    revalidatePath(
      `/amministrazione/vendite/ordini/modifica/${orderDetail.orderId}`
    );
  }
}

export async function decreaseItemQty(orderDetailId: number) {
  var orderDetail = await prisma.orderDetail.findFirst({
    where: {
      id: orderDetailId,
    },
  });

  if (orderDetail) {
    if (orderDetail.quantity > 1) {
      await prisma.orderDetail.update({
        data: {
          quantity: orderDetail.quantity - 1,
        },
        where: {
          id: orderDetailId,
        },
      });
    } else {
      await prisma.orderDetail.delete({
        where: {
          id: orderDetailId,
        },
      });
    }

    await updateOrderTotal(orderDetail.orderId);

    revalidatePath(
      `/amministrazione/vendite/ordini/modifica/${orderDetail.orderId}`
    );
  }
}

export async function removeItem(orderDetailId: number) {
  var orderDetail = await prisma.orderDetail.findFirst({
    where: {
      id: orderDetailId,
    },
  });

  if (orderDetail) {
    await prisma.orderDetail.delete({
      where: {
        id: orderDetailId,
      },
    });

    await updateOrderTotal(orderDetail.orderId);

    revalidatePath(
      `/amministrazione/vendite/ordini/modifica/${orderDetail.orderId}`
    );
  }
}

export async function addOrderItem(
  orderId: number,
  name: string,
  price: number
) {
  await prisma.orderDetail.create({
    data: {
      name: name,
      quantity: 1,
      unitPrice: price,
      orderId: orderId,
    },
  });

  await updateOrderTotal(orderId);

  revalidatePath(`/amministrazione/vendite/ordini/modifica/${orderId}`);
}

async function updateOrderTotal(orderId: number) {
  var order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      details: true,
    },
  });

  if (order) {
    var total = 0;

    order.details.forEach((row: OrderDetailDTO) => {
      total += parseFloat(`${row.unitPrice.toNumber() * row.quantity}`);
    });

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        total: total,
      },
    });
  }
}

export async function updateOrderNote(orderId: number, notes?: string | null) {
  var order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
  });

  if (order) {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        notes: notes,
      },
    });
    revalidatePath(`/amministrazione/vendite/ordini/modifica/${orderId}`);
  }
}
