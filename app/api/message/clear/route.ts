import { NextResponse } from "next/server";
import { clearMessages } from "@/src/services/messageService";

export async function GET(request: Request) {
  await clearMessages();

  return NextResponse.json({});
}
