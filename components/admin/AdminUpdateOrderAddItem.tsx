'use client';

import { addOrderItem } from "@/src/services/orderService";
import { FoodDTO, OrderDTO } from "@/src/types";
import { updateOrderDetailsAddItemValidator } from "@/src/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { Decimal } from "@prisma/client/runtime/library";

import { useForm } from "react-hook-form";


export default function AdminUpdateOrderAddItem(props: { order: OrderDTO, foods: FoodDTO[] }) {
    const { order, foods } = props;



    const { register, handleSubmit, formState: { errors } }
        = useForm<{ id: number }>({
            resolver: yupResolver<{ id: number }>(updateOrderDetailsAddItemValidator),

        });

    const onItemAddSubmit = async (data: { id: number }) => {
        const food = foods[data.id];

        await addOrderItem(order.id, food.name, parseFloat(`${food.price}`));

    }

    return <>
        <form className="w-full flex flex-row items-center space-x-2" onSubmit={handleSubmit(onItemAddSubmit)}>
            <div className="w-full lg:w-1/3">
                <select {...register("id")}
                    className={errors.id ? "w-full text-input-invalid" : "w-full text-input"}>

                    {foods.map((food: FoodDTO, index: number) => (
                        <option value={index} key={food.id}>
                            {food.name} ({food.category?.name}) - {parseFloat(`${food.price}`).toFixed(2)} €
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback">
                    {errors.id?.message}
                </div>
            </div>
            <div className="flex w-1/4 items-center">
                <button type="submit" className="btn btn-success">Aggiungi</button>
            </div>
        </form>
    </>
}
