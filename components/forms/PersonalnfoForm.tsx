'use client'

import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import { personalInfoAction } from "@/src/actions/account";
import { PersonalInfoFields } from "@/src/types";
import { personalInfoValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnyObjectSchema } from "yup";

export default function PersonalInfoForm({ user }: any) {


    const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm<PersonalInfoFields>({
        resolver: yupResolver<PersonalInfoFields>(personalInfoValidator),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            firstname: user!.firstname,
            lastname: user!.lastname
        }
    });
    const [isPending, setIsPending] = useState(false);


    const processForm = async (data: PersonalInfoFields) => {
        setIsPending(true);
        await personalInfoAction(data);
        setIsPending(false);
    }

    return <>
        <div className="w-full">
            <p className="text-2xl antialiased font-bold">Informazioni personali</p>
        </div>
        <form className="w-full md:p-0 md:w-1/2 lg:w-1/3 flex flex-col" onSubmit={handleSubmit(processForm)} method='post'>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Nome</label>
                <input
                    type="text"
                    {...register("firstname")}
                    className={errors.firstname ? "text-input-invalid" : "text-input"}
                />
                <div className="invalid-feedback">{errors.firstname?.message}</div>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Cognome</label>
                <input
                    type="text"
                    {...register("lastname")}
                    className={errors.lastname ? "text-input-invalid" : "text-input"}
                />
                <div className="invalid-feedback">{errors.lastname?.message}</div>
            </div>
            <div className="flex flex-row space-x-2">
                <button disabled={!isValid} type="submit" className="btn-primary">
                    <ButtonCircularProgress isPending={isPending} />
                    <span>Aggiorna informazioni</span>
                </button>
            </div>
        </form>
    </>
}
