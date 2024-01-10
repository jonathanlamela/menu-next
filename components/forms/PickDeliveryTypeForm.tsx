'use client';
import { updateDeliveryType } from "@/src/services/cartService";
import { CarrierDTO, CartState, PickDeliveryTypeFields } from "@/src/types";
import { pickDeliveryMethodValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


export default function PickDeliveryTypeForm(props: { cart: CartState, carriers: CarrierDTO[] }) {

    const { register, handleSubmit, formState: { errors } } = useForm<PickDeliveryTypeFields>({
        resolver: yupResolver<PickDeliveryTypeFields>(pickDeliveryMethodValidator),
        defaultValues: {
            carrierId: props.cart.carrierId
        }
    });

    const processForm = async (data: PickDeliveryTypeFields) => {
        await updateDeliveryType(data.carrierId);
    }

    return <>

        <form className="w-full md:w-1/2 m-0 flex flex-col space-y-2" onSubmit={handleSubmit(processForm)}>
            <h5 className="font-semibold h-10  text-lg border-b-slate-300 border-b-2 flex items-center">
                1. Corriere
            </h5>
            <p>Scegli il modo in cui vuoi ricevere il tuo ordine</p>
            <select {...register("carrierId")}
                className={errors.carrierId ? "input-select-invalid" : "input-select"}>
                {props.carriers.map(row => {
                    return <>
                        <option value={row.id!}>{row.name} ({`${parseFloat(`${row.costs}`).toFixed(2)} €`})</option>
                    </>
                })}
            </select>
            <div className="invalid-feedback">
                {errors.carrierId?.message}
            </div>
            <div className="w-full">
                <button type="submit" className="btn-secondary-outlined w-20 h-10">Vai</button>
            </div>
        </form>

    </>
}
