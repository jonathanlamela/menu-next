"use server";

import { prisma } from "@/src/lib/prisma";
import { CategoryDTO, CrudResults, CrudType } from "@/src/types";
import { Prisma } from "@prisma/client";

import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";
import slugify from "slugify";
const fs = require("fs");

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
): Promise<CrudResults<CategoryDTO>> {
  var orderByParams = {};

  switch (params.orderBy) {
    case "id":
      orderByParams = { id: params.ascending ? "asc" : "desc" };
      break;
    case "name":
      orderByParams = { name: params.ascending ? "asc" : "desc" };
      break;
  }

  var whereParams: Prisma.CategoryWhereInput = {};

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
      items: await prisma.category.findMany({
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
      items: await prisma.category.findMany({
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

export async function createCategory(data: FormData) {
  var name = data.get("name")?.valueOf() as string;

  var category = await prisma.category.create({
    data: {
      name: name,
      slug: String(slugify(name)).toLowerCase(),
    },
  });

  if (data.has("imageFile") && category.id) {
    const imgFile = data.get("imageFile")?.valueOf() as File;

    if (imgFile.size > 0) {
      const buffer = Buffer.from(await imgFile.arrayBuffer());

      var fileName = category.id + "." + imgFile.name.split(".").at(1);

      var publicPath = `/assets/category/${fileName}`;
      var serverPath =
        "public/assets/category/" +
        category.id +
        "." +
        imgFile.name.split(".").at(1);

      await writeFile(path.join(process.cwd(), serverPath), buffer);

      await prisma.category.update({
        data: {
          imageUrl: publicPath,
        },
        where: {
          id: category.id,
        },
      });
    }
  }

  if (category.id) {
    pushMessage({
      text: "Categoria creata con successo",
      type: MessageType.SUCCESS,
    });

    redirect(`/amministrazione/catalogo/categorie`);
  } else {
    pushMessage({
      text: "Si è verificato un errore durante la creazione",
      type: MessageType.ERROR,
    });
  }
}

export default async function updateCategory(data: FormData) {
  var id = parseInt(data.get("id")?.valueOf() as string);
  var name = data.get("name")?.valueOf() as string;

  //Update category name
  var category = await prisma.category.update({
    data: {
      name: name,
    },
    where: {
      id: id,
    },
  });

  //Update image if the new exists
  if (data.has("imageFile") && category.id) {
    const imgFile = data.get("imageFile")?.valueOf() as File;

    if (imgFile.size > 0) {
      fs.unlink(`public/${category.imageUrl}`, () => {});

      const buffer = Buffer.from(await imgFile.arrayBuffer());

      var fileName = category.id + "." + imgFile.name.split(".").at(1);

      var publicPath = `/assets/category/${fileName}`;
      var serverPath =
        "public/assets/category/" +
        category.id +
        "." +
        imgFile.name.split(".").at(1);

      await writeFile(path.join(process.cwd(), serverPath), buffer);

      await prisma.category.update({
        data: {
          imageUrl: publicPath,
        },
        where: {
          id: category.id,
        },
      });
    }

    revalidatePath(`/amministrazione/catalogo/categorie/modifica/${id}`);
  }

  pushMessage({
    text: "Categoria aggiornata con successo",
    type: MessageType.SUCCESS,
  });
}

export async function deleteCategory(id: number) {
  await prisma.category.update({
    data: {
      deleted: true,
    },
    where: {
      id: id,
    },
  });

  pushMessage({
    text: "Categoria eliminata con successo",
    type: MessageType.SUCCESS,
  });
}
