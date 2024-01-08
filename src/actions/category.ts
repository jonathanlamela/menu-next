"use server";
import { prisma } from "@/src/lib/prisma";
import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";
import slugify from "slugify";
const fs = require("fs");

export async function createCategory(data: FormData) {
  var name = data.get("name")!.valueOf() as string;

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
  var id = parseInt(data.get("id")!.valueOf() as string);
  var name = data.get("name")!.valueOf() as string;

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
