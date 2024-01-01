'use client'

import { submitPersonalInfo } from "@/src/actions";
import { PersonalInfoFields } from "@/src/types";
import { personalInfoValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


export default function PersonalInfoForm({ user }: any) {


    const { register, formState: { errors, isValid } } = useForm<PersonalInfoFields>({
        resolver: yupResolver(personalInfoValidator),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            firstname: user!.firstname,
            lastname: user!.lastname
        }
    });

    return <>
        <div className="w-full">
            <p className="text-2xl antialiased font-bold">Informazioni personali</p>
        </div>
        <form className="w-full md:p-0 md:w-1/2 lg:w-1/3 flex flex-col" action={submitPersonalInfo} method='post'>
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
                    <span>Aggiorna informazioni</span>
                </button>
            </div>
        </form>
    </>
}
