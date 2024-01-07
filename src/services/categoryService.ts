import { prisma } from "@/src/lib/prisma";
import {
  Category,
  CategoryFields,
  CrudType,
  Paginated,
  Sorted,
} from "@/src/types";
import { Prisma } from "@prisma/client";
var slugify = require("slugify");

export async function getCategoriesForPills() {
  return prisma.category.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
    },
    where: {
      deleted: false,
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

  var whereParams: Prisma.categoryWhereInput = {
    deleted: false,
  };

  if (params.search && params.search != "") {
    whereParams = {
      name: {
        contains: params.search,
      },
      deleted: false,
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

export async function getCategoryById(id: number) {
  return prisma.category.findFirst({
    where: {
      id: id,
    },
  });
}
