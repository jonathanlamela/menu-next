'use client';
import { CarrierDTO, CategoryDTO, OrderStateDTO } from "@/src/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import updateOrderState, { createOrderState } from "@/src/services/orderStateService";
import { orderStateValidator } from "@/src/validators";

export default function AdminOrderStateForm(props: { orderState?: OrderStateDTO }) {

    const [isPending, setIsPending] = useState(false);


    const { register, formState: { errors, isValid, isDirty }, handleSubmit, watch } = useForm<OrderStateDTO>({
        resolver: yupResolver<OrderStateDTO>(orderStateValidator),
        mode: "onChange",
        defaultValues: {
            name: props.orderState?.name ?? '',
            cssBadgeClass: props.orderState?.cssBadgeClass
        }
    });

    const values = watch();


    const processForm = async (object: OrderStateDTO) => {
        setIsPending(true);
        var data = new FormData();

        data.set("name", object.name);
        if (object.cssBadgeClass) {
            data.set("cssBadgeClass", object.cssBadgeClass);
        }


        if (props.orderState) {
            data.append("id", `${props.orderState.id}`);
            await updateOrderState(data);

        } else {
            await createOrderState(data);
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
                <label className="form-label">CSS Badge</label>
                <select
                    {...register("cssBadgeClass")}
                    className={errors.cssBadgeClass ? "text-input-invalid" : "text-input"}>
                    <option value="badge-primary">Primary</option>
                    <option value="badge-secondary">Secondary</option>
                    <option value="badge-info">Info</option>
                    <option value="badge-success">Success</option>
                    <option value="badge-danger">Danger</option>
                </select>
                <div className="invalid-feedback">
                    {errors.cssBadgeClass?.message}
                </div>
            </div>
            <div className="w-1/3 flex flex-col space-y-2">
                <label className="form-label">Preview</label>
                <p className={values?.cssBadgeClass ?? ''}>
                    Badge
                </p>
            </div>

            <div className="w-1/3 flex flex-col space-y-2 items-start">
                <button disabled={!isValid} type="submit" className="btn-success space-x-2">
                    <ButtonCircularProgress isPending={isPending} />
                    {props.orderState ? "Modifica" : "Crea"}
                </button>
            </div>
        </form>

    </>
}
