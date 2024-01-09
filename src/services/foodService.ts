import { prisma } from "@/src/lib/prisma";
import { CrudType, FoodDTO, Paginated, Sorted } from "@/src/types";
import { Prisma } from "@prisma/client";

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

  var query = {
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
        deleted: false,
      },
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
