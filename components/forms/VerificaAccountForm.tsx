'use client';
import { submitVerificaAccount } from "@/app/actions";
import { VerifyAccountFields } from "@/src/types";
import { verifyAccountValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


export default function VerificaAccountForm() {

    const { register, formState: { errors, isValid } } = useForm<VerifyAccountFields>({
        resolver: yupResolver(verifyAccountValidator),
        mode: "onChange",
        reValidateMode: "onChange"
    });

    return <>
        <form className="w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-2" action={submitVerificaAccount}>

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
                    <span>Richiedi email verifica</span>
                </button>
            </div>
        </form>

    </>
}
