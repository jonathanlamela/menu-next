import AddToCartButton from "@/components/AddToCartButton";

export default function FoodItem({ item }: any) {
    return <>
        <div className="flex flex-row">
            <div className="w-3/4">
                <div className="flex flex-col">
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
    </>
}
