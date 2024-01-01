
import { getCart } from "@/src/services/cartService"
import { CartState } from "@/src/types";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link"



export default async function CartButton() {
    const cart: CartState = await getCart();

    return <>
        <Link className="text-white hover:bg-slate-800 p-2 flex flex-row space-x-1 justify-center items-center" href="/carrello"
        >
            {Object.keys(cart.items).length > 0 ? <span className="text-white bg-red-600 text-sm rounded-full h-6 w-6 flex justify-center items-center ">
                {Object.keys(cart.items).length}
            </span> : null}
            <ShoppingCartIcon className="h-6 w-6" />
            <span>Carrello</span>
        </Link>
    </>


}
