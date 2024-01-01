import DashboardButton from "@/components/account/DashboardButton";
import { BookOpenIcon, LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";


export default function DashboardDefault() {
    return <>
        <div className="w-full">
            <h4 className='text-2xl antialiased font-sans'>Il mio profilo</h4>
        </div>
        <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
            <DashboardButton title='Informazioni personali' link="/account/informazioni-personali" icon={<UserCircleIcon className="w-6 h-6" />} />
            <DashboardButton title='Cambia password' link="/account/cambia-password" icon={<LockClosedIcon className="w-6 h-6" />
            } />
            <DashboardButton title='I mei ordini' link="/account/i-miei-ordini" icon={<BookOpenIcon className="w-6 h-6" />
            } />
        </div>

    </>
}
