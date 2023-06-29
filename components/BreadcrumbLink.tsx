import Link from "next/link";

export type BreadcrumbLinkProps = {
    href: string;
}


export default function BreadcrumbLink({ href, children }: any) {
    return <Link className="bg-slate-100 p-3 rounded-lg hover:text-white hover:bg-red-900 text-black" href={href}>{children}</Link>
}
