import { CrudType } from "@/src/types"
import Link from "next/link"


export default function AdminOrderToggler(props: { label: string, field: string, params: CrudType, className: string, link: string }) {


    if (props.field == props.params.orderBy) {

        return <>
            <Link href={{
                href: props.link,
                query: {
                    ...props.params,
                    ascending: !props.params.ascending
                }
            }} className={"items-center " + props.className}>
                <span>{props.label}</span>
                <div className="bg-slate-900 rounded-full p-1 text-white">
                    {!props.params.ascending ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                    </svg>}
                </div>
            </Link>
        </>
    }

    return <>
        <Link href={{
            href: props.link,
            query: {
                ...props.params,
                ascending: true,
                orderBy: props.field
            }
        }} className={props.className}>
            <span>{props.label}</span>
        </Link>
    </>
}
