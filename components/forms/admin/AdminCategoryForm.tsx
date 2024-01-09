'use client';
import { CategoryDTO, CategoryFields } from "@/src/types";
import { categoryValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import updateCategory, { createCategory } from "@/src/services/categoryService";

export default function AdminCategoryForm(props: { category?: CategoryDTO }) {

    const [isPending, setIsPending] = useState(false);


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

    const processForm = async (object: CategoryFields) => {
        setIsPending(true);
        var data = new FormData();

        data.set("name", object.name);
        if (object.imageFile && object.imageFile?.length > 0) {
            data.set("imageFile", object.imageFile[0]);
        }

        if (props.category) {
            data.append("id", `${props.category.id}`);
            await updateCategory(data);

        } else {
            await createCategory(data);
        }
        setIsPending(false);
    }

    return <>

        <form className="flex-col space-y-2" onSubmit={handleSubmit(processForm)}>
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
                <button disabled={!isValid} type="submit" className="btn-success space-x-2">
                    <ButtonCircularProgress isPending={isPending} />
                    {props.category ? "Modifica" : "Crea"}
                </button>
            </div>
        </form>

    </>
}
