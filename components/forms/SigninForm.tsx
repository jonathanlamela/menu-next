'use client';
import { MessageType, SigninFields } from "@/src/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinValidator } from "@/src/validators";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import { isPending } from "@reduxjs/toolkit";
import { useState } from "react";

export default function FormSignin({ action }: any) {

    const { register, formState: { errors, isValid }, handleSubmit } = useForm<SigninFields>({
        resolver: yupResolver(signinValidator),
        mode: "onChange",
        reValidateMode: "onChange"
    });

    const [isPending, setIsPending] = useState(false);


    const processForm = async (data: SigninFields) => {
        setIsPending(true);
        await action(data);
        setIsPending(false);
    }

    return <>
        <form onSubmit={handleSubmit(processForm)} className="w-full p-8 md:p-0 md:w-1/2 lg:w-1/3 flex flex-col space-y-2" >
            <div className="flex flex-col space-y-2">
                <label className="form-label">Nome</label>
                <input type="text"
                    {...register("firstname")}
                    className={errors.firstname ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.firstname?.message}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Cognome</label>
                <input type="text"
                    {...register("lastname")}
                    className={errors.lastname ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.lastname?.message}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Email</label>
                <input type="text"
                    {...register("email")}
                    className={errors.email ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.email?.message}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Password</label>
                <input type="password"
                    {...register("password")}
                    className={errors.password ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.password?.message}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Conferma password</label>
                <input type="password"
                    {...register("passwordConfirmation")}
                    className={errors.passwordConfirmation ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.passwordConfirmation?.message}
                </div>
            </div>
            <div className="flex flex-row space-x-2">
                <button type="submit" disabled={!isValid} className="btn-primary space-x-2">
                    <ButtonCircularProgress isPending={isPending} />
                    <span>Crea account</span>
                </button>
            </div>
        </form>

    </>
}
