
import AccountManage from "@/components/AccountManage";
import CartButton from "@/components/CartButton";

import Header from "@/components/Header";
import HeaderMenu from "@/components/HeaderMenu";
import HomeButton from "@/components/HomeButton";
import Topbar from "@/components/Topbar";
import TopbarLeft from "@/components/TopbarLeft";
import TopbarRight from "@/components/TopbarRight";

import BreadcrumbLink from "@/components/BreadcrumbLink";
import Messages from "@/components/Messages";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import BreadcrumbDivider from "@/components/BreadcrumbDivider";
import BreadcrumbText from "@/components/BreadcrumbText";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import { getServerSession } from "next-auth";
import authOptions from "@/src/authOptions";
import { pushMessage } from "@/src/services/messageService";
import { ChangePasswordFields, MessageType } from "@/src/types";
import { changePasswordValidator } from "@/src/validators";
import { updatePassword } from "@/src/services/accountService";

export async function generateMetadata({ params }: any) {
    return {
        title: "Cambia password",
    }
}

async function performAction(dataObj: ChangePasswordFields) {
    'use server';
    const data = await getServerSession(authOptions);

    var validationResult = await changePasswordValidator.isValid(dataObj);

    if (validationResult && data?.user) {
        var result = await updatePassword(
            dataObj.current_password,
            dataObj.password,
            data?.user?.email!
        );

        if (result) {
            pushMessage({
                text: "Password cambiata con successo",
                type: MessageType.SUCCESS,
            });

            return {
                result: "success",
            };
        } else {
            pushMessage({
                text:
                    "Impossibile eseguire l'operazione, la password attuale potrebbe essere errata",
                type: MessageType.ERROR,
            });

            return {
                result: "failed",
            };
        }
    } else {
        return {
            result: "failed",
        };
    }
}

export default async function Index() {

    return (
        <main className="flex flex-col flex-grow">
            <Topbar>
                <TopbarLeft>
                    <HomeButton></HomeButton>
                </TopbarLeft>
                <TopbarRight>
                    <CartButton></CartButton>
                    <AccountManage></AccountManage>
                </TopbarRight>
            </Topbar>

            <Header></Header>
            <HeaderMenu>
                <BreadcrumbContainer>
                    <BreadcrumbLink href="/account">
                        Profilo
                    </BreadcrumbLink>
                    <BreadcrumbDivider></BreadcrumbDivider>
                    <BreadcrumbText>Cambia password</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>
            <div className="pl-8 pr-8 pt-8 flex flex-col space-y-4 pb-8">
                <Messages></Messages>
                <ChangePasswordForm action={performAction}></ChangePasswordForm>
            </div>
        </main>
    );
}

