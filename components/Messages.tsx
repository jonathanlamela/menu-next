'use server'
import { ClearMessage } from "@/components/ClearMessage";
import { Message, MessageType } from "@/src/types";
import { clear } from "console";
import { cookies } from "next/headers";


export async function getMessage(): Promise<Message | null> {
    const cookiesList = cookies();

    if (cookiesList.has("message")) {
        let buff = Buffer.from(cookiesList.get("message")!.value, "base64");
        let string_decoded = buff.toString("utf8");


        return JSON.parse(string_decoded);
    } else {
        return null;
    }
}



export default async function Messages() {
    const message = await getMessage();

    if (message != null) {

        const { type, text } = message;

        switch (type) {
            case MessageType.SUCCESS:
                return <>
                    <ClearMessage></ClearMessage>
                    <div className="pb-4">
                        <div className="bg-lime-700/25 border-l-lime-700 border-l-8 p-4 text-green-900">
                            <span>{text}</span>
                        </div>
                    </div>
                </>

            case MessageType.ERROR:
                return <>
                    <ClearMessage></ClearMessage>

                    <div className="pb-4">
                        <div className="bg-red-700/25 border-l-red-700 border-l-8 p-4 text-red-900">
                            <span>{text}</span>
                        </div>
                    </div>
                </>
            case MessageType.INFO:
                return <>
                    <ClearMessage></ClearMessage>

                    <div className="pb-4">
                        <div className="bg-gray-400/25 border-l-gray-700 border-l-8 p-4 text-gray-900">
                            <span>{text}</span>
                        </div>
                    </div>
                </>
        }
    } else {
        return <></>
    }

}
