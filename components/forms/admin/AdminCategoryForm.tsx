'use client';
import updateCategory, { createCategory } from "@/src/actions/category";
import { Category, CategoryFields } from "@/src/types";
import { categoryValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Image from "next/image";

export default function AdminCategoryForm(props: { id?: number, category?: Category }) {


    const { register, formState: { errors, isValid, isDirty }, handleSubmit } = useForm<CategoryFields>({
        resolver: yupResolver<CategoryFields>(categoryValidator),
        mode: "onChange",
        defaultValues: {
            name: props.category?.name ?? ''
        }
    });

    const currentImage = () => {

        if (props.category && props.category.imageUrl) {
            return <>
                <div className="w-1/3 flex flex-col space-y-2">
                    <label className="form-label">Immagine attuale</label>
                    <Image src={`${props.category.imageUrl}`} height={500} width={500} alt={`Immagine per categoria ${props.category.name}`}></Image>
                </div>
            </>
        }

        return <></>
    }

    return <>

        <form className="flex-col space-y-2" action={async (data: FormData) => {
            if (props.category) {
                await updateCategory(props.category.id, data);
            } else {
                await createCategory(data);
            }
        }} >
            <div className="w-1/3 flex flex-col space-y-2">
                <label className="form-label">Nome</label>
                <input type="text"
                    {...register("name")}
                    className={errors.name ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.name?.message}
                </div>
            </div>
            <div className="w-1/3 flex flex-col space-y-2">
                <label className="form-label">Immagine</label>
                <input type="file"
                    {...register("imageFile")}
                />
                <div className="invalid-feedback">
                    {errors.imageFile?.message}
                </div>
            </div>
            {currentImage()}
            <div className="w-1/3 flex flex-col space-y-2 items-start">
                <button disabled={!isValid} type="submit" className="btn-success">
                    {props.category ? "Modifica" : "Crea"}
                </button>
            </div>
        </form>

    </>
}
