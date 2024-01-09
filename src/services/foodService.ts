"use server";

import { prisma } from "@/src/lib/prisma";
import { pushMessage } from "@/src/services/messageService";
import { CrudType, FoodDTO, MessageType, Paginated, Sorted } from "@/src/types";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function searchFoods(
  args: {
    search?: string;
  } & Paginated &
    Sorted
): Promise<{ foods: any; count: number }> {
  var orderByParams = {};

  if (!args.search) {
    return {
      foods: [],
      count: 0,
    };
  }

  switch (args.orderBy) {
    case "id":
      orderByParams = { id: args.ascending ? "asc" : "desc" };
      break;
    case "name":
      orderByParams = { name: args.ascending ? "asc" : "desc" };
      break;
    case "price":
      orderByParams = { price: args.ascending ? "asc" : "desc" };
      break;
    case "category":
      orderByParams = { category: { name: args.ascending ? "asc" : "desc" } };
      break;
  }

  var query: Prisma.foodWhereInput = {
    AND: [
      {
        OR: [
          {
            name: {
              contains: args.search,
            },
          },
          {
            ingredients: {
              contains: args.search,
            },
          },
          {
            category: {
              name: {
                contains: args.search,
              },
            },
          },
        ],
      },
      {
        deleted: false,
      },
    ],
  };

  return {
    foods: await prisma.food.findMany({
      skip: args.perPage * (args.page - 1),
      take: args.perPage,
      orderBy: orderByParams,
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      where: query,
    }),
    count: await prisma.food.count({
      where: query,
    }),
  };
}

export async function getFoodsByCategorySlug(slug: string) {
  return prisma.food.findMany({
    where: {
      category: {
        slug: slug,
      },
      deleted: false,
    },
  });
}

export async function getAllFoods(
  params: CrudType
): Promise<{
  foods: FoodDTO[];
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
    case "category":
      orderByParams = { categoryId: params.ascending ? "asc" : "desc" };
      break;
    case "price":
      orderByParams = { price: params.ascending ? "asc" : "desc" };
      break;
  }

  var whereParams: Prisma.foodWhereInput = {};

  if (params.search && params.search != "") {
    whereParams = {
      OR: [
        {
          name: {
            contains: params.search,
          },
        },
        {
          ingredients: {
            contains: params.search,
          },
        },
        {
          category: {
            name: {
              contains: params.search,
            },
          },
        },
      ],
    };
  }

  if (!params.deleted) {
    whereParams.deleted = false;
  }

  if (params.paginated) {
    return {
      foods: await prisma.food.findMany({
        skip: params.perPage * (params.page - 1),
        take: params.perPage,
        orderBy: orderByParams,
        where: whereParams,
        include: {
          category: true,
        },
      }),
      count: await prisma.food.count({
        where: whereParams,
      }),
    };
  } else {
    return {
      foods: await prisma.food.findMany({
        orderBy: orderByParams,
        where: whereParams,
        include: {
          category: true,
        },
      }),
      count: await prisma.food.count({
        where: whereParams,
      }),
    };
  }
}

export async function getFoodById(id: number) {
  return prisma.food.findFirst({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });
}

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
