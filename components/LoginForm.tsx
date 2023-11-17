'use client'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import { loginValidator } from "@/src/validators";
import { LoginFields } from "@/src/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm({ callbackUrl, csrfToken }: any) {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFields>({
        resolver: yupResolver(loginValidator)
    });

    const router = useRouter();

    const formSubmit = async (data: { email: string, password: string }) => {
        const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
            callbackUrl,
        });

        if (res?.error) {
            router.refresh();
        }

        if (res?.ok) {
            router.push(res!.url!);
        }

    }

    return <>
        <form onSubmit={handleSubmit(formSubmit)} className="w-full p-16 md:p-0 md:w-1/2 lg:w-1/3 flex flex-col space-y-2" >

            {callbackUrl ? <input type="hidden" {...register("backUrl")} name="callbackUrl" value={callbackUrl} /> : null}
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
