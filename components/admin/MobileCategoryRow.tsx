import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminEditButton from "@/components/admin/AdminEditButton";
import { Category } from "@/src/types";


export default function MobileCategoryRow(props: { category: Category }) {
    const { category } = props;
    return <>
        <div className="flex lg:hidden w-full flex-col p-8 space-y-4">
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Id</div>
                <div className="w-3/4">{category.name}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Nome</div>
                <div className="w-3/4">{category.name}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Azioni</div>
                <div className="w-3/4 flex flex-row">
                    <AdminEditButton link={`/amministrazione/catalogo/categorie/modifica/${category.id}`}></AdminEditButton>
                    <AdminDeleteButton link={`/amministrazione/catalogo/categorie/elimina/${category.id}`}></AdminDeleteButton>
                </div>
            </div>
        </div>
    </>
}
