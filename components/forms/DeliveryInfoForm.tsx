'use client';
import { updateDeliveryInfo, updateDeliveryType } from "@/src/services/cartService";
import { CarrierDTO, CartState, DeliveryInfoFields, PickDeliveryTypeFields } from "@/src/types";
import { deliveryInfoValidator, pickDeliveryMethodValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


export default function DeliveryInfoForm(props: { cart: CartState }) {

    const { register, handleSubmit, formState: { errors } } = useForm<DeliveryInfoFields>({
        resolver: yupResolver<DeliveryInfoFields>(deliveryInfoValidator),
        defaultValues: {
            deliveryAddress: props.cart.deliveryAddress,
            deliveryTime: props.cart.deliveryTime
        }
    });

    const processForm = async (data: DeliveryInfoFields) => {

        var formData = new FormData();

        if (data.deliveryAddress) {
            formData.set("deliveryAddress", data.deliveryAddress);
        }

        formData.set("deliveryTime", data.deliveryTime);

        await updateDeliveryInfo(formData);
    }

    return <>

        <form className="w-full m-0 flex flex-col space-y-2" onSubmit={handleSubmit(processForm)}>
            <h5 className="font-semibold h-10 text-lg border-b-slate-300 border-b-2 flex items-center">
                2. Dettagli di consegna
            </h5>
            <p>Inserisci le informazioni di consegna</p>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Indirizzo di consegna</label>
                <input type="text"
                    {...register("deliveryAddress")}
                    className={errors.deliveryAddress ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.deliveryAddress?.message}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Orario</label>
                <input type="text"
                    {...register("deliveryTime")}
                    className={errors.deliveryTime ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.deliveryTime?.message}
                </div>
            </div>
            <div className="w-full">
                <button type="submit" className="btn-secondary-outlined w-20 h-10">Vai</button>
            </div>
        </form>

    </>
}
