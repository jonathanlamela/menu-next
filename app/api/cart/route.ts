import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookiesList = cookies();

  if (cookiesList.get("cart")) {
    let buff = Buffer.from(cookiesList.get("cart")!.value, "base64");
    let string_decoded = buff.toString("utf-8");
    return NextResponse.json({ cart: JSON.parse(string_decoded) });
  } else {
    return NextResponse.json({});
  }
}

export async function POST(request: Request) {
  const cookiesList = cookies();

  const { cart } = await request.json();

  if (cart) {
    let buff = Buffer.from(JSON.stringify(cart), "utf8");
    cookiesList.set("cart", buff.toString("base64"));
  }

  return NextResponse.json({});
}
