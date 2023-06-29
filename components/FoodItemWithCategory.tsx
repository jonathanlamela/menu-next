import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";


export default function FoodItemWithCategory({ item }: any) {
    return <>
        <div className="flex flex-col space-y-2">
            <div className="w-full">
                <div className="p-1 w-20 text-center bg-slate-600 text-white">
                    <Link href={"/categoria/" + item.category.slug}><span
                        className="badge bg-secondary">{item.category.name}</span></Link>
                </div>
            </div>
            <div className="w-full flex flex-row">
                <div className="w-3/4">
                    <div className="flex flex-col ">
                        <div>{item.name}</div>
                        <div className="font-extralight text-sm">{item.ingredients}</div>
                    </div>
                </div>
                <div className="w-1/4">
                    <div className="flex justify-end items-center space-x-2">
                        <span className="font-light antialiased">{parseFloat(item.price).toFixed(2)} €</span>
                        <AddToCartButton item={item}></AddToCartButton>
                    </div>
                </div>
            </div>
        </div>

    </>
}
