'use client';

import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import { changePasswordAction } from "@/src/services/accountService";
import { ChangePasswordFields } from "@/src/types";
import { changePasswordValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function ChangePasswordForm({ email }: any) {

    const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm<ChangePasswordFields>({
        resolver: yupResolver<ChangePasswordFields>(changePasswordValidator),
        reValidateMode: "onChange",
        mode: "onChange"
    });

    const [isPending, setIsPending] = useState(false);


    const processForm: SubmitHandler<ChangePasswordFields> = async data => {
        setIsPending(true);
        const response: { result: string | undefined } = await changePasswordAction(data);

        if (response.result == "success") {
            reset();
        }

        setIsPending(false);
    }

    return <>
        <div className="w-full pb-4">
            <p className="text-2xl antialiased font-bold">Cambia password</p>
        </div>
        <form className="w-full md:p-0 md:w-1/2 lg:w-1/3 flex flex-col space-y-2" method="POST" onSubmit={handleSubmit(processForm)}>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Password attuale</label>
                <input type="password"
                    {...register("currentPassword")}
                    autoComplete="current-password"
                    className={"p-2 border border-gray-100" + (errors.currentPassword ? "border-red-600" : "")} />
                <div className="invalid-feedback">
                    {errors.currentPassword?.message}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Nuova password</label>
                <input type="password"
                    autoComplete="new-password"
                    {...register("password")}
                    className={"p-2 border border-gray-100" + (errors.password ? "border-red-600" : "")} />
                <div className="invalid-feedback">
                    {errors.password?.message}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Conferma password</label>
                <input type="password"
                    autoComplete="new-password"
                    {...register("passwordConfirmation")}
                    className={"p-2 border border-gray-100" + (errors.passwordConfirmation ? "border-red-600" : "")} />
                <div className="invalid-feedback">
                    {errors.passwordConfirmation?.message}
                </div>
            </div>

            <div className="flex flex-row space-x-2">
                <button disabled={!isValid} type="submit" className="btn-primary">
                    <ButtonCircularProgress isPending={isPending} />
                    <span>Cambia password</span>
                </button>
            </div>
        </form>
    </>
}


