import { prisma } from "@/src/lib/prisma";
import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return redirect("/");
  }

  pushMessage({
    text: "Hai pagato il tuo ordine",
    type: MessageType.SUCCESS,
  });
  return redirect(`/account/ordini/${orderId}`);
}
