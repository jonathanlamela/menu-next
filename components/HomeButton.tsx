import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


export default function HomeButton() {
    return <>
        <Link className="text-white flex flex-row p-2 items-center hover:bg-slate-800 justify-center space-x-2"
            href="/">
            <HomeIcon className="w-6 h-6" />
            <span>Home</span>
        </Link>
    </>
}
