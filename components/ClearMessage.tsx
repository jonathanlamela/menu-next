'use client';
import { useEffect } from "react";
import axiosIstance from "@/src/lib/axiosIstance";


export function ClearMessage() {

    useEffect(() => {



        const requestClear = async () => {
            await axiosIstance.get("/api/message/clear");
        }

        requestClear()
    }, [])
    return <></>
}
