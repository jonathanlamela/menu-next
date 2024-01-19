"use server";

import authOptions from "@/src/authOptions";
import { prisma } from "@/src/lib/prisma";
import { getCarrierById } from "@/src/services/carrierService";
import { getCart, storeCart } from "@/src/services/cartService";
import mailService from "@/src/services/mailService";
import { getSettings } from "@/src/services/settingService";
import { CartRow, CurrentUser, emptyCart } from "@/src/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function createOrder(formData: FormData) {
  var cart = await getCart();
  const data = await getServerSession(authOptions);
  var user = data?.user! as CurrentUser;
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
    Object.values(cart.items).forEach(async (row: CartRow) => {
      await prisma.orderDetail.create({
        data: {
          name: row.item.name,
          quantity: row.quantity,
          unitPrice: row.item.price,
          orderId: order.id,
        },
      });
    });

    await prisma.orderDetail.create({
      data: {
        name: "Spese di consegna",
        quantity: 1,
        unitPrice: carrier?.costs ?? 0,
        orderId: order.id,
      },
    });

    await storeCart(emptyCart);

    await mailService.initService();

    await mailService.sendCustomerOrderCreatedEmail(order.id);

    redirect(`/account/ordini/${order.id}`);
  } else {
    redirect(`/`);
  }
}
