'use client'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import { loginValidator } from "@/src/validators";
import { LoginFields } from "@/src/types";

export default function LoginForm({ backUrl, formSubmit }: any) {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFields>({
        resolver: yupResolver(loginValidator)
    });

    return <>
        <form className="w-full p-16 md:p-0 md:w-1/2 lg:w-1/3 flex flex-col space-y-2" action={formSubmit}>
            {backUrl ? <input type="hidden" {...register("backUrl")} name="backUrl" value={backUrl} /> : null}
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
            <div className="flex flex-col space-y-0.5">
                <Link href="/account/reset-password" className="hover:text-red-900">
                    Ho dimenticato la password
                </Link>
                <Link href="/account/verifica-account" className="hover:text-red-900">
                    Il mio account non è attivo
                </Link>
            </div>
            <div className="flex flex-row space-x-2">
                <button disabled={!isValid} type="submit" className="btn-primary">
                    Accedi
                </button>
                <Link href="/account/signin" className="btn-secondary-outlined">
                    Crea account
                </Link>
            </div>
        </form>

    </>
}
