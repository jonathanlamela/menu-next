import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookiesList = cookies();

  cookiesList.delete("message");

  return NextResponse.json({});
}
