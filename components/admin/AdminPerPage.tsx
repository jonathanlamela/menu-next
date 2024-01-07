'use client';
import { CrudType } from "@/src/types";
import { useRef } from "react";
import { useForm } from "react-hook-form";


export default function AdminPerPage(props: { params: CrudType }) {

    const selectForm = useRef(null)

    const { params } = props;


    const { register } = useForm({
        defaultValues: {
            ascending: params.ascending,
            orderBy: params.orderBy,
            page: 1,
            search: params.search,
            perPage: params.perPage
        }
    })



    const handleChange = () => {
        // Chiamare il metodo submit del form quando il valore della select cambia
        if (selectForm != null) {
            (selectForm!.current! as any).submit();
        }
    };

    return <>
        <form className="m-0 flex space-x-2 items-center h-10" ref={selectForm}>
            <input type="hidden" {...register("ascending")}></input>
            <input type="hidden" {...register("orderBy")}></input>
            <input type="hidden" {...register("page")}></input>
            <input type="hidden" {...register("search")} />
            <label className="text-sm">Elementi per pagina</label>
            <select {...register("perPage")} className="input-select" onChange={handleChange}>
                {[2, 5, 10, 20, 50].map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
        </form>
    </>
}


