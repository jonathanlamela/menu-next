import { authOptions } from "@/src/lib/auth";
import { getCart } from "@/src/services/cartService";
import { getServerSession } from "next-auth";
import Link from "next/link";


export default async function CheckoutButton() {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        return <>
            <Link className="bg-green-800 text-white p-4 hover:bg-green-900" href="/checkout/tipologia-consegna">Vai alla cassa</Link>
        </>

    } else {
        return null;
    }


}
