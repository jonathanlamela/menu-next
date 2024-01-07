import { CrudType } from "@/src/types";


export default function AdminSearchForm(props: { placeholder: string, params: CrudType }) {
    return <>
        <form className="m-0 flex space-x-2" method="get">
            <input type="hidden" name="ascend" defaultValue={`${props.params.ascending}`}></input>
            <input type="hidden" name="orderBy" defaultValue={`${props.params.orderBy}`}></input>
            <input type="hidden" name="perPage" defaultValue={`${props.params.perPage}`}></input>
            <input type="hidden" name="page" defaultValue={`1`}></input>
            <input name="search" type="text" className="text-input bg-white" placeholder={props.placeholder} defaultValue={props.params.search}
            />
            <button type="submit" className="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            </button>
        </form>

    </>
}
