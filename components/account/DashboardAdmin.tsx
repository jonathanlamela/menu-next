import DashboardButton from "@/components/account/DashboardButton";
import authOptions from "@/src/authOptions";
import { getServerSession } from "next-auth";
import { AdjustmentsHorizontalIcon, TruckIcon, ArrowsRightLeftIcon, CurrencyDollarIcon, BeakerIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';


export default async function DashboardAdmin() {

    const session = await getServerSession(authOptions);
    const user = session?.user!;

    if (user.role === "admin") {
        return <>
            <div className="w-full">
                <h4 className='text-2xl antialiased font-sans'>Catalogo</h4>
            </div>
            <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                <DashboardButton title='Categorie' link="/amministrazione/catalogo/categorie" icon={
                    <ArchiveBoxIcon className="w-6 h-6" />
                } />
                <DashboardButton title='Cibi' link="/amministrazione/catalogo/cibi" icon={
                    <BeakerIcon className="w-6 h-6" />
                } />
            </div>
            <div className="w-full">
                <h4 className='text-2xl antialiased font-sans'>Vendite</h4>
            </div>
            <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                <DashboardButton title='Ordini' link="/amministrazione/vendite/ordini" icon={
                    <CurrencyDollarIcon className="w-6 h-6" />
                } />
                <DashboardButton title='Stati ordine' link="/amministrazione/vendite/stati-ordine" icon={
                    <ArrowsRightLeftIcon className="w-6 h-6" />
                } />
                <DashboardButton title='Corrieri' link="/amministrazione/vendite/corrieri" icon={
                    <TruckIcon className="w-6 h-6" />
                } />
            </div>
            <div className="w-full">
                <h4 className='text-2xl antialiased font-sans'>Negozio</h4>
            </div>
            <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                <DashboardButton title='Impostazioni' link="/amministrazione/impostazioni" icon={
                    <AdjustmentsHorizontalIcon className="h-6 w-6"></AdjustmentsHorizontalIcon>
                } />
            </div>
        </>

    } else {
        return null;
    }

}
