"use server";

import {
  CartItem,
  CartRow,
  CartState,
  DeliveryType,
  emptyCart,
} from "@/src/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addToCart = async (item: CartItem) => {
  const cart = await getCart();

  cart.items[item.id] = {
    item: item,
    quantity: 1,
  };

  storeCart(cart);
};

export const removeFromCart = async (item: CartItem) => {
  const cart = await getCart();

  delete cart.items[item.id];

  storeCart(cart);
};

export const increaseQty = async (item: CartItem) => {
  const cart = await getCart();

  cart.items[item.id].quantity += 1;

  storeCart(cart);
};

export const decreaseQty = async (item: CartItem) => {
  const cart = await getCart();

  if (cart.items[item.id].quantity > 1) {
    cart.items[item.id].quantity -= 1;
  } else {
    //altrimenti elimina il prodotto
    delete cart.items[item.id];
  }

  storeCart(cart);
};

export const updateCartCarrier = async (carrier_id: number) => {
  const cart = await getCart();

  cart.carrierId = carrier_id;

  storeCart(cart);
};

export const updateCartInformazioniConsegna = async (item: {
  delivery_address: string;
  delivery_time: string;
}) => {
  const cart = await getCart();

  cart.deliveryAddress = item.delivery_address;
  cart.deliveryTime = item.delivery_time;

  storeCart(emptyCart);
};

export const updateCartNote = async (note: string) => {
  const cart = await getCart();

  cart.note = note;

  storeCart(emptyCart);
};

export const resetCart = async () => {
  storeCart(emptyCart);
};

export async function getCart(): Promise<CartState> {
  const cookiesList = cookies();

  if (cookiesList.get("cart")) {
    let buff = Buffer.from(cookiesList.get("cart")!.value, "base64");
    let string_decoded = buff.toString("utf8");
    return JSON.parse(string_decoded);
  } else {
    return emptyCart;
  }
}

export async function storeCart(cart: CartState) {
  const cookiesList = cookies();

  if (cart) {
    cart.total = 0;
    Object.values(cart.items).forEach((row: CartRow) => {
      cart.total += row.item.price! * row.quantity;
    });

    let buff = Buffer.from(JSON.stringify(cart), "utf8");
    cookiesList.set("cart", buff.toString("base64"));
  }
}

export async function updateDeliveryType(carrierId: number) {
  var cart = await getCart();
  cart.carrierId = carrierId;

  await storeCart(cart);

  redirect("2");
}

export async function updateDeliveryInfo(form: FormData) {
  var cart = await getCart();

  var deliveryAddress = form.get("deliveryAddress");
  var deliveryTime = form.get("deliveryTime");

  if (deliveryAddress) {
    cart.deliveryAddress = deliveryAddress.valueOf() as string;
  } else {
    cart.deliveryAddress = "";
  }

  cart.deliveryTime = deliveryTime as string;

  await storeCart(cart);

  redirect("3");
}
