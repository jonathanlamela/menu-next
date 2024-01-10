'use client';
import { CarrierDTO, CategoryDTO } from "@/src/types";
import { carrierValidator, categoryValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import updateCategory, { createCategory } from "@/src/services/categoryService";
import updateCarrier, { createCarrier } from "@/src/services/carrierService";

export default function AdminCarrierForm(props: { carrier?: CarrierDTO }) {

    const [isPending, setIsPending] = useState(false);


    const { register, formState: { errors, isValid, isDirty }, handleSubmit } = useForm<CarrierDTO>({
        resolver: yupResolver<CarrierDTO>(carrierValidator),
        mode: "onChange",
        defaultValues: {
            name: props.carrier?.name ?? '',
            costs: props.carrier?.costs
        }
    });

    const processForm = async (object: CarrierDTO) => {
        setIsPending(true);
        var data = new FormData();

        data.set("name", object.name);
        data.set("costs", `${object.costs}`);


        if (props.carrier) {
            data.append("id", `${props.carrier.id}`);
            await updateCarrier(data);

        } else {
            await createCarrier(data);
        }
        setIsPending(false);
    }

    return <>

        <form className="flex-col space-y-2" onSubmit={handleSubmit(processForm)}>
            <div className="w-1/3 flex flex-col space-y-2">
                <label className="form-label">Nome</label>
                <input type="text"
                    {...register("name")}
                    className={errors.name ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.name?.message}
                </div>
            </div>
            <div className="w-1/3 flex flex-col space-y-2">
                <label className="form-label">Costo</label>
                <input type="text"
                    {...register("costs")}
                    className={errors.costs ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.costs?.message}
                </div>
            </div>
            <div className="w-1/3 flex flex-col space-y-2 items-start">
                <button disabled={!isValid} type="submit" className="btn-success space-x-2">
                    <ButtonCircularProgress isPending={isPending} />
                    {props.carrier ? "Modifica" : "Crea"}
                </button>
            </div>
        </form>

    </>
}
