'use client';
import { CategoryDTO, FoodDTO } from "@/src/types";
import { foodValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import updateFood, { createFood } from "@/src/services/foodService";

export default function AdminFoodForm(props: { food?: FoodDTO, categories: CategoryDTO[] }) {

    const [isPending, setIsPending] = useState(false);

    const { register, formState: { errors, isValid, }, handleSubmit } = useForm<FoodDTO>({
        resolver: yupResolver<FoodDTO>(foodValidator),
        mode: "onChange",
        defaultValues: {
            name: props.food?.name ?? '',
            categoryId: props.food?.categoryId,
            ingredients: props.food?.ingredients,
            price: props.food?.price
        }
    });

    const processForm = async (object: FoodDTO) => {
        setIsPending(true);
        var data = new FormData();

        data.append("name", object.name);

        if (object.ingredients) {
            data.append("ingredients", object.ingredients);
        }

        data.append("price", `${object.price}`);
        data.append("categoryId", `${object.categoryId}`);

        if (props.food) {
            data.append("id", `${props.food.id}`);
            await updateFood(data);

        } else {
            await createFood(data);
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
                <label className="form-label">Ingredienti</label>
                <textarea className="text-input" {...register("ingredients")}></textarea>
            </div>
            <div className="w-1/3 flex flex-col space-y-2">
                <label className="form-label">Prezzo</label>
                <input type="text"
                    {...register("price")}
                    className={errors.price ? "text-input-invalid" : "text-input"} />
                <div className="invalid-feedback">
                    {errors.price?.message}
                </div>
            </div>
            <div className="w-1/3 flex flex-col space-y-2">
                <label className="form-label">Categoria</label>
                <select {...register("categoryId")}
                    className={errors.categoryId ? "text-input-invalid" : "text-input"}>
                    {props.categories.map((cat: any) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                <div className="invalid-feedback">
                    {errors.categoryId?.message}
                </div>
            </div>

            <div className="w-1/3 flex flex-col space-y-2 items-start">
                <button disabled={!isValid} type="submit" className="btn-success space-x-2">
                    <ButtonCircularProgress isPending={isPending} />
                    {props.food ? "Modifica" : "Crea"}
                </button>
            </div>
        </form>

    </>
}
