"use server";
import { prisma } from "@/src/lib/prisma";
import { pushMessage } from "@/src/services/messageService";
import { MessageType, SettingDTO } from "@/src/types";
import { revalidatePath } from "next/cache";

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

export async function updateSettings(data: FormData) {
  await prisma.setting.update({
    data: {
      siteTitle: data.get("siteTitle")!.valueOf(),
      siteSubtitle: data.get("siteSubtitle")?.valueOf(),
      orderStateCreatedId: parseInt(
        data.get("orderStateCreatedId")!.valueOf() as string
      ),
      orderStateDeletedId: parseInt(
        data.get("orderStateDeletedId")!.valueOf() as string
      ),
      orderStatePaidId: parseInt(
        data.get("orderStatePaidId")!.valueOf() as string
      ),
    },
    where: {
      id: parseInt(data.get("id")?.valueOf() as string),
    },
  });

  pushMessage({
    text: "Impostazioni negozio aggiornate con successo",
    type: MessageType.SUCCESS,
  });

  revalidatePath(`/amministrazione/impostazioni`);
}
