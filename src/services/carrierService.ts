"use server";

import { prisma } from "@/src/lib/prisma";
import { pushMessage } from "@/src/services/messageService";
import { CrudType, MessageType, CarrierDTO } from "@/src/types";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllCarriers(
  params: CrudType
): Promise<{
  carriers: CarrierDTO[];
  count: number;
}> {
  var orderByParams = {};

  switch (params.orderBy) {
    case "id":
      orderByParams = { id: params.ascending ? "asc" : "desc" };
      break;
    case "name":
      orderByParams = { name: params.ascending ? "asc" : "desc" };
      break;
  }

  var whereParams: Prisma.CarrierWhereInput = {};

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
      carriers: await prisma.carrier.findMany({
        skip: params.perPage * (params.page - 1),
        take: params.perPage,
        orderBy: orderByParams,
        where: whereParams,
      }),
      count: await prisma.carrier.count({
        where: whereParams,
      }),
    };
  } else {
    return {
      carriers: await prisma.carrier.findMany({
        orderBy: orderByParams,
        where: whereParams,
      }),
      count: await prisma.carrier.count({
        where: whereParams,
      }),
    };
  }
}

export async function getCarrierById(id: number) {
  return prisma.carrier.findFirst({
    where: {
      id: id,
    },
  });
}

export async function createCarrier(data: FormData) {
  var name = data.get("name")?.valueOf() as string;
  var costs = data.get("costs")?.valueOf() as number;

  var carrier = await prisma.carrier.create({
    data: {
      name: name,
      costs: costs,
    },
  });

  if (carrier.id) {
    pushMessage({
      text: "Corriere creato con successo",
      type: MessageType.SUCCESS,
    });

    redirect(`/amministrazione/vendite/corrieri`);
  } else {
    pushMessage({
      text: "Si è verificato un errore durante la creazione",
      type: MessageType.ERROR,
    });
  }
}

export default async function updateCarrier(data: FormData) {
  var id = parseInt(data.get("id")?.valueOf() as string);
  var name = data.get("name")?.valueOf() as string;
  var costs = data.get("costs")?.valueOf() as number;

  await prisma.carrier.update({
    data: {
      name: name,
      costs: costs,
    },
    where: {
      id: id,
    },
  });

  pushMessage({
    text: "Corriere aggiornato con successo",
    type: MessageType.SUCCESS,
  });

  revalidatePath(`/amministrazione/vendite/corrieri/modifica/${id}`);
}

export async function deleteCarrier(id: number) {
  await prisma.carrier.update({
    data: {
      deleted: true,
    },
    where: {
      id: id,
    },
  });

  pushMessage({
    text: "Corriere eliminato con successo",
    type: MessageType.SUCCESS,
  });
}
