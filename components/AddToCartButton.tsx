'use client';

import { addToCart } from "@/src/services/cartService";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function AddToCartButton({ item }: any) {

    return <>
        <button className="p-2 bg-gray-300 hover:text-white hover:bg-gray-700 rounded-xl" onClick={() => addToCart(item)}>
            <ShoppingCartIcon className="h-6 w-6" />
        </button>
    </>
}
