'use client';
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import { ResetPasswordFields } from "@/src/types";
import { resetPasswordValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function ResetPasswordRequireForm({ action }: any) {

    const { register, formState: { errors, isValid }, handleSubmit } = useForm<ResetPasswordFields>({
        resolver: yupResolver(resetPasswordValidator),
        mode: "onChange",
        reValidateMode: "onChange"
    });

    const processForm = async (data: ResetPasswordFields) => {
        setIsPending(true);
        await action(data);
        setIsPending(false);
    }

    const [isPending, setIsPending] = useState(false);



    return <>
        <form className="w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-2" onSubmit={handleSubmit(processForm)}>
            <div className="flex flex-col space-y-2">
                <label className="form-label">Email</label>
                <input type="text"
                    {...register("email")}
                    className={errors.email ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.email?.message}
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
