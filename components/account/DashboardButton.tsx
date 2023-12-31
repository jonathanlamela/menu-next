import Link from "next/link";


export type DashboardButtonProps = {
    link: string;
    title: string;
    icon: any;
}

export default function DashboardButton({ link, title, icon }: DashboardButtonProps) {
    return <>
        <div className='w-full md:w-1/2 lg:w-1/6 bg-slate-50 lg:max-w-xs hover:bg-slate-500  hover:text-white border-b-red-900  border-b-8 text-red-900'>
            <Link className="flex flex-col space-y-8 p-8 justify-center items-center"
                href={link}>
                <div className="w-full flex justify-center items-center">
                    {icon}
                </div>
                <p className="text-center">{title}</p>
            </Link>
        </div>

    </>
}
