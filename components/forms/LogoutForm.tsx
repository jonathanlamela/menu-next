'use client';
import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";


export default function LogoutForm() {
    const performLogout = () => {
        pushMessage({
            text: "Sei stato disconnesso con successo",
            type: MessageType.INFO
        });
        signOut({
            callbackUrl: "/auth/login"
        });
    }

    return <>
        <button className="text-white flex flex-row p-2 items-center hover:bg-slate-800 justify-center space-x-2"
            onClick={performLogout}
        >
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
            <span>Esci</span>
        </button>

    </>
}
