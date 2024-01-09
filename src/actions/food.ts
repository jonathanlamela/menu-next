"use server";
import { prisma } from "@/src/lib/prisma";
import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteFood(id: number) {
  await prisma.food.update({
    data: {
      deleted: true,
    },
    where: {
      id: id,
    },
  });

  pushMessage({
    text: "Cibo eliminato con successo",
    type: MessageType.SUCCESS,
  });
}

export async function createFood(data: FormData) {
  var name = data.get("name")?.valueOf() as string;
  var ingredients = data.get("ingredients")?.valueOf() as string;
  var price = data.get("price")?.valueOf() as number;
  var categoryId = data.get("categoryId")?.valueOf() as string;

  var food = await prisma.food.create({
    data: {
      name: name,
      ingredients: ingredients,
      categoryId: parseInt(categoryId),
      price: price,
    },
  });

  if (food.id) {
    pushMessage({
      text: "Cibo creato con successo",
      type: MessageType.SUCCESS,
    });

    redirect(`/amministrazione/catalogo/cibi`);
  } else {
    pushMessage({
      text: "Si è verificato un errore durante la creazione",
      type: MessageType.ERROR,
    });
  }
}

export default async function updateFood(data: FormData) {
  var id = parseInt(data.get("id")?.valueOf() as string);
  var name = data.get("name")?.valueOf() as string;
  var ingredients = data.get("ingredients")?.valueOf() as string;
  var price = data.get("price")?.valueOf() as number;
  var categoryId = data.get("categoryId")?.valueOf() as string;

  //Update category name
  await prisma.food.update({
    data: {
      name: name,
      ingredients: ingredients,
      categoryId: parseInt(categoryId),
      price: price,
    },
    where: {
      id: id,
    },
  });

  revalidatePath(`/amministrazione/catalogo/cibi/modifica/${id}`);

  pushMessage({
    text: "Cibo aggiornato con successo",
    type: MessageType.SUCCESS,
  });
}
