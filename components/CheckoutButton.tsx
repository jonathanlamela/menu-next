import { getUser } from "@/src/services/accountService";
import { getCart } from "@/src/services/cartService";
import Link from "next/link";


export default async function CheckoutButton() {
    const user = await getUser();

    if (user) {
        return <>
            <Link className="bg-green-800 text-white p-4 hover:bg-green-900" href="/checkout/tipologia-consegna">Vai alla cassa</Link>
        </>

    } else {
        return null;
    }


}
