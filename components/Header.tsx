import { getSettings } from "@/src/services/settingService";
import Link from "next/link";


export default async function Header() {

    const settings = await getSettings();

    return <>
        <div className="bg-red-900 p-8">
            <Link href={"/"} className="text-white text-center">
                <p className="text-4xl font-sans" style={{ fontFamily: "Smooch" }}>{settings?.siteTitle}</p>
                <p className="font-sans">{settings?.siteSubtitle}</p>
            </Link>
        </div>
    </>
}
