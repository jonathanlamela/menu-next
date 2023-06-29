import { prisma } from "@/src/lib/prisma";
import { getSettings } from "@/src/services/settingService";
import Link from "next/link";


export default async function Header() {
    const responseSettings = await getSettings();

    const settings = Object.assign(
        {},
        ...responseSettings.map((x: any) => ({ [x.name]: x.value })),
    );

    return <>
        <div className="bg-red-900 p-8">
            <Link href={"/"} className="text-white text-center">
                <p className="text-4xl font-sans" style={{ fontFamily: "Smooch" }}>{settings.site_name}</p>
                <p className="font-sans">{settings.site_subtitle}</p>
            </Link>
        </div>
    </>
}
