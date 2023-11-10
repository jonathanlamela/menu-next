import { prisma } from "@/src/lib/prisma";
import { Settings } from "@/src/types";
import { Prisma } from "@prisma/client";

export async function getSettings(): Promise<any> {
  var settings = await prisma.setting.findFirst({
    select: {
      siteTitle: true,
      siteSubtitle: true,
      shippingCosts: true,
      orderStateCreated: true,
      orderStatePaid: true,
    },
  });

  return settings;
}
