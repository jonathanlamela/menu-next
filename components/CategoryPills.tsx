import CategoryPill from "@/components/CategoryPill";
import { getCategoriesForPills } from "@/src/services/categoryService";



export default async function CategoryPills() {
    const categories = await getCategoriesForPills()

    return <>
        <ul className="w-full md:flex flew-row md:space-x-2 items-center justify-center">
            {categories?.map((cat: any) => <CategoryPill item={cat} key={cat.id}></CategoryPill>)}
        </ul>
    </>
}
