'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function CategoryPill({ item }: any) {
    const pathname = usePathname();
    var classes = " text-white p-4 hover:bg-slate-600 w-full text-center mx-4 md:mx-0"
    if (pathname.endsWith(item.slug)) {
        classes += " bg-red-900 border border-slate-50/5"
    }

    return <>
        <li className="w-full md:w-auto flex items-center justify-center py-2">
            <Link className={classes} href={"/categoria/" + item.slug}>{item.name}</Link>
        </li>
    </>
}
