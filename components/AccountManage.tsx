import LogoutForm from "@/components/forms/LogoutForm";
import authOptions from "@/src/authOptions";
import { ArrowRightStartOnRectangleIcon, UserIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AccountManage() {

    const data = await getServerSession(authOptions);

    if (data) {
        return <>
            <Link className="text-white flex flex-row p-2 items-center hover:bg-slate-800 justify-center space-x-2"
                href="/account">
                <UserIcon className="w-6 h-6" />
                <span>Profilo</span>
            </Link>
            <LogoutForm />
        </>
    } else {
        return <>
            <Link href="/auth/login" className="text-white flex flex-row p-2 items-center hover:bg-slate-800 justify-center space-x-2"
            >
                <ArrowRightStartOnRectangleIcon className="w-6 h-6"></ArrowRightStartOnRectangleIcon>
                <span>Accedi</span>
            </Link>
        </>
    }


}
