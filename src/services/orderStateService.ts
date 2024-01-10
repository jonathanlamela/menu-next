"use server";

import { prisma } from "@/src/lib/prisma";
import { pushMessage } from "@/src/services/messageService";
import { CrudResults, CrudType, MessageType, OrderStateDTO } from "@/src/types";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllOrderStates(
  params: CrudType
): Promise<CrudResults<OrderStateDTO>> {
  var orderByParams = {};

  switch (params.orderBy) {
    case "id":
      orderByParams = { id: params.ascending ? "asc" : "desc" };
      break;
    case "name":
      orderByParams = { name: params.ascending ? "asc" : "desc" };
      break;
  }

  var whereParams: Prisma.OrderStateWhereInput = {};

  if (params.search && params.search != "") {
    whereParams = {
      name: {
        contains: params.search,
      },
    };
  }

  if (!params.deleted) {
    whereParams.deleted = false;
  }

  if (params.paginated) {
    return {
      items: await prisma.orderState.findMany({
        skip: params.perPage * (params.page - 1),
        take: params.perPage,
        orderBy: orderByParams,
        where: whereParams,
      }),
      count: await prisma.orderState.count({
        where: whereParams,
      }),
    };
  } else {
    return {
      items: await prisma.orderState.findMany({
        orderBy: orderByParams,
        where: whereParams,
      }),
      count: await prisma.orderState.count({
        where: whereParams,
      }),
    };
  }
}

export async function getOrderStateById(id: number) {
  return prisma.orderState.findFirst({
    where: {
      id: id,
    },
  });
}

export async function createOrderState(data: FormData) {
  var name = data.get("name")?.valueOf() as string;
  var cssBadgeClass = data.get("cssBadgeClass")?.valueOf() as string;

  var orderState = await prisma.orderState.create({
    data: {
      name: name,
      cssBadgeClass: cssBadgeClass,
    },
  });

  if (orderState.id) {
    pushMessage({
      text: "Stato ordine creato con successo",
      type: MessageType.SUCCESS,
    });

    redirect(`/amministrazione/vendite/stati-ordine`);
  } else {
    pushMessage({
      text: "Si è verificato un errore durante la creazione",
      type: MessageType.ERROR,
    });
  }
}

export default async function updateOrderState(data: FormData) {
  var id = parseInt(data.get("id")?.valueOf() as string);
  var name = data.get("name")?.valueOf() as string;
  var cssBadgeClass = data.get("cssBadgeClass")?.valueOf() as string;

  await prisma.orderState.update({
    data: {
      name: name,
      cssBadgeClass: cssBadgeClass,
    },
    where: {
      id: id,
    },
  });

  pushMessage({
    text: "Stato ordine aggiornato con successo",
    type: MessageType.SUCCESS,
  });

  revalidatePath(`/amministrazione/vendite/stati-ordine/modifica/${id}`);
}

export async function deleteOrderState(id: number) {
  await prisma.orderState.update({
    data: {
      deleted: true,
    },
    where: {
      id: id,
    },
  });

  pushMessage({
    text: "Stato ordine eliminato con successo",
    type: MessageType.SUCCESS,
  });
}
