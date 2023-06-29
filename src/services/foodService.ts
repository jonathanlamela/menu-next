import { prisma } from "@/src/lib/prisma";
import { Paginated, Sorted } from "@/src/types/globalTypes";

export async function searchFoods(
  args:
    & {
      search?: string;
    }
    & Paginated
    & Sorted,
): Promise<{ foods: any; count: number }> {
  var orderByParams = {};

  if (!args.search) {
    return {
      "foods": [],
      "count": 0,
    };
  }

  switch (args.orderBy) {
    case "id":
      orderByParams = { id: args.ascend ? "asc" : "desc" };
      break;
    case "name":
      orderByParams = { name: args.ascend ? "asc" : "desc" };
      break;
    case "price":
      orderByParams = { price: args.ascend ? "asc" : "desc" };
      break;
    case "category":
      orderByParams = { category: { name: args.ascend ? "asc" : "desc" } };
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
