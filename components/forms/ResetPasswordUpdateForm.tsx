'use client';
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import { resetPasswordTokenAction } from "@/src/services/accountService";
import { ResetPasswordTokenFields } from "@/src/types";
import { resetPasswordTokenValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function ResetPasswordUpdateForm() {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const { register, formState: { errors, isValid }, handleSubmit } = useForm<ResetPasswordTokenFields>({
        resolver: yupResolver<ResetPasswordTokenFields>(resetPasswordTokenValidator),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            token: token!,
        },
    });

    const processForm = async (data: ResetPasswordTokenFields) => {
        setIsPending(true);
        await resetPasswordTokenAction(data);
        setIsPending(false);
    }

    const [isPending, setIsPending] = useState(false);


    return <>
        <form className="w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-2" onSubmit={handleSubmit(processForm)}>
            <input type="hidden"
                {...register("token")}
            />
            <div className="flex flex-col space-y-2">
                <p className='font-semibold text-lg antialiased'>Inserisci la nuova password</p>
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
                    {...register("confirmPassword")}
                    className={errors.confirmPassword ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                </div>
            </div>
            <div className="flex flex-row space-x-2">
                <button disabled={!isValid} type="submit" className="btn-primary">
                    <ButtonCircularProgress isPending={isPending} />
                    <span>Reset password</span>
                </button>
            </div>
        </form>

    </>
}
