"use server";

import { Message } from "@/src/types";
import { cookies } from "next/headers";

export async function pushMessage(msg: Message) {
  const cookiesList = cookies();

  let buff = Buffer.from(JSON.stringify(msg), "utf8");
  cookiesList.set("message", buff.toString("base64"), {
    sameSite: "lax",
  });

  return true;
}

export async function clearMessages() {
  const cookiesList = cookies();

  cookiesList.delete("message");
}
