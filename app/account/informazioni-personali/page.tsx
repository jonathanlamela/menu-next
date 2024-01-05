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
import { getServerSession } from "next-auth";
import authOptions from "@/src/authOptions";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import BreadcrumbDivider from "@/components/BreadcrumbDivider";
import BreadcrumbText from "@/components/BreadcrumbText";
import { MessageType, PersonalInfoFields } from "@/src/types";
import { personalInfoValidator } from "@/src/validators";
import PersonalInfoForm from "@/components/forms/PersonalnfoForm";
import { pushMessage } from "@/src/services/messageService";
import { getUserByEmail, updatePersonalInfo } from "@/src/services/accountService";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: any) {
    return {
        title: "Informazioni personali",
    }
}


async function performAction(object: PersonalInfoFields) {
    'use server';
    var validationResult = await personalInfoValidator.isValid(object);

    const data = await getServerSession(authOptions);

    if (validationResult) {
        await updatePersonalInfo(data?.user!.email!, {
            firstname: object.firstname,
            lastname: object.lastname,
        });

        pushMessage({
            text: "Informazioni aggiornate con successo",
            type: MessageType.SUCCESS,
        });


    } else {
        pushMessage({
            text:
                "Si è verificato un errore durante l'aggiornamento delle informazioni",
            type: MessageType.ERROR,
        });

        return {
            result: "error"
        }

    }

    redirect('/account/informazioni-personali');
}


export default async function Index({ searchParams }: any) {

    const data = await getServerSession(authOptions);

    const user = await getUserByEmail(data!.user!.email!);

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
                    <BreadcrumbText>Informazioni personali</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>
            <div className="pl-8 pr-8 pt-8 flex flex-col space-y-4 pb-8">
                <Messages></Messages>
                <PersonalInfoForm user={user} action={performAction}></PersonalInfoForm>
            </div>
        </main>
    );
}

