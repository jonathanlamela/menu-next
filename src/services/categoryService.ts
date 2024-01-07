import { prisma } from "@/src/lib/prisma";
import { Category, CrudType, Paginated, Sorted } from "@/src/types";

export async function getCategoriesForPills() {
  return prisma.category.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
    },
  });
}

export async function getAllCategories(
  params: CrudType
): Promise<{
  categories: Category[];
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

  var whereParams = {};

  if (params.search && params.search != "") {
    whereParams = {
      name: {
        contains: params.search,
      },
    };
  }

  if (params.paginated) {
    return {
      categories: await prisma.category.findMany({
        skip: params.perPage * (params.page - 1),
        take: params.perPage,
        orderBy: orderByParams,
        where: whereParams,
      }),
      count: await prisma.category.count({
        where: whereParams,
      }),
    };
  } else {
    return {
      categories: await prisma.category.findMany({
        orderBy: orderByParams,
        where: whereParams,
      }),
      count: await prisma.category.count({
        where: whereParams,
      }),
    };
  }
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findFirst({
    where: {
      slug: slug,
    },
  });
}

export async function getFoodsByCategorySlug(slug: string) {
  return prisma.food.findMany({
    where: {
      category: {
        slug: slug,
      },
    },
  });
}
