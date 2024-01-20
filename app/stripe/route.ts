import { prisma } from "@/src/lib/prisma";
import { sendCustomerOrderPaidEmail } from "@/src/services/mailService";
import { getSettings } from "@/src/services/settingService";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  var bodyData = await request.json();

  if (bodyData["type"] == "checkout.session.completed") {
    const { data } = bodyData as Stripe.Event;
    const object = data.object as Stripe.Checkout.Session;

    const { order_sku } = object.metadata as any;

    var settings = await getSettings();

    await prisma.order.update({
      data: {
        isPaid: true,
        orderStateId: settings?.orderStatePaidId,
      },
      where: {
        id: parseInt(order_sku),
      },
    });

    await sendCustomerOrderPaidEmail(parseInt(order_sku));
  }
  return NextResponse.json({});
}
