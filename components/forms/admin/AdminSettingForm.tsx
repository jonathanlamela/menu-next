'use client';
import { OrderStateDTO, SettingDTO } from "@/src/types";
import { settingValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import { updateSettings } from "@/src/services/settingService";

export default function AdminSettingForm(props: { setting: SettingDTO, orderStates: OrderStateDTO[] }) {

    const [isPending, setIsPending] = useState(false);


    const { register, formState: { errors, isValid, isDirty }, handleSubmit } = useForm<SettingDTO>({
        resolver: yupResolver<SettingDTO>(settingValidator),
        mode: "onChange",
        defaultValues: {
            orderStateCreatedId: props.setting.orderStateCreatedId,
            orderStateDeletedId: props.setting.orderStateDeletedId,
            orderStatePaidId: props.setting.orderStatePaidId,
            siteTitle: props.setting.siteTitle,
            siteSubtitle: props.setting.siteSubtitle
        }
    });

    const processForm = async (object: SettingDTO) => {
        setIsPending(true);
        var data = new FormData();

        data.set("id", `${props.setting.id}`);
        data.set("siteTitle", object.siteTitle);

        if (object.siteSubtitle) {
            data.set("siteSubtitle", object.siteSubtitle);
        }


        data.set("orderStateCreatedId", `${object.orderStateCreatedId}`);
        data.set("orderStateDeletedId", `${object.orderStateDeletedId}`);
        data.set("orderStatePaidId", `${object.orderStatePaidId}`);

        await updateSettings(data);
        setIsPending(false);
    }

    const orderStatesOptions = () => {
        return <>
            <option>-- Nessuna opzione --</option>
            {
                props.orderStates.map((state: OrderStateDTO) => (
                    <option value={state.id!} key={state.id}>
                        {state.name} {state.deleted ? "(Eliminato)" : null}
                    </option>
                ))
            }
        </>
    }

    return <>

        <form className="pt-4 flex flex-col space-y-2" onSubmit={handleSubmit(processForm)}>
            <h6 className="font-semibold uppercase">Informazioni del sito</h6>
            <div className="w-full md:w-1/3 flex flex-col space-y-2">
                <label className="form-label">Nome del sito</label>
                <input
                    type="text"
                    {...register("siteTitle")}
                    className={errors.siteTitle ? "text-input-invalid" : "text-input"}
                />
                <div className="invalid-feedback">{errors.siteTitle?.message}</div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col space-y-2">
                <label className="form-label">Motto del sito</label>
                <input
                    type="text"
                    {...register("siteSubtitle")}
                    className={errors.siteSubtitle ? "text-input-invalid" : "text-input"}
                />
                <div className="invalid-feedback">{errors.siteSubtitle?.message}</div>
            </div>
            <h6 className="font-semibold uppercase">Impostazioni ordini</h6>
            <div className="w-full md:w-1/3 flex flex-col space-y-2">
                <label className="form-label">Stato quando l&apos;ordine viene creato</label>
                <select
                    {...register("orderStateCreatedId")}
                    className={errors.orderStateCreatedId ? "text-input-invalid" : "text-input"}
                >
                    {orderStatesOptions()}
                </select>
                <div className="invalid-feedback">{errors.orderStateCreatedId?.message}</div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col space-y-2">
                <label className="form-label">Stato quando l&apos;ordine viene pagato</label>
                <select
                    {...register("orderStatePaidId")}
                    className={errors.orderStatePaidId ? "input-select-invalid" : "input-select"}
                >
                    {orderStatesOptions()}

                </select>
                <div className="invalid-feedback">{errors.orderStatePaidId?.message}</div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col space-y-2">
                <label className="form-label">Stato quando l&apos;ordine viene eliminato</label>
                <select
                    {...register("orderStateDeletedId")}
                    className={errors.orderStateDeletedId ? "input-select-invalid" : "input-select"}
                >
                    {orderStatesOptions()}
                </select>
                <div className="invalid-feedback">{errors.orderStateDeletedId?.message}</div>
            </div>
            <div className="w-1/3 flex flex-col space-y-2 items-start">
                <button type="submit" className="btn-success">
                    <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                    Aggiorna
                </button>
            </div>
        </form>

    </>
}
