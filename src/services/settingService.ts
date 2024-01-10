"use server";
import { prisma } from "@/src/lib/prisma";
import { SettingDTO } from "@/src/types";

export async function getSettings(): Promise<SettingDTO | undefined | null> {
  var settings = await prisma.setting.findFirst({
    include: {
      orderStateCreated: true,
      orderStateDeleted: true,
      orderStatePaid: true,
    },
  });

  return settings;
}
