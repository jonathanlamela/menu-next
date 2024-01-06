'use client';
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import { verifyAccountAction } from "@/src/actions/account";
import { VerifyAccountFields } from "@/src/types";
import { verifyAccountValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function VerificaAccountForm() {

    const { register, formState: { errors, isValid }, handleSubmit } = useForm<VerifyAccountFields>({
        resolver: yupResolver<VerifyAccountFields>(verifyAccountValidator),
        mode: "onChange",
        reValidateMode: "onChange"
    });

    const [isPending, setIsPending] = useState(false);


    const processForm = async (data: VerifyAccountFields) => {
        setIsPending(true);
        await verifyAccountAction(data);
        setIsPending(false);
    }

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
                    <span>Richiedi email verifica</span>
                </button>
            </div>
        </form>

    </>
}
