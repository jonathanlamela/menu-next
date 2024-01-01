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
import { getUserByEmail } from "@/src/services/accountService";
import { PersonalInfoFields } from "@/src/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalInfoValidator } from "@/src/validators";
import { useForm } from "react-hook-form";
import PersonalInfoForm from "@/components/forms/PersonalnfoForm";

export async function generateMetadata({ params }: any) {
    return {
        title: "Informazioni personali",
    }
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
                <PersonalInfoForm user={user}></PersonalInfoForm>
            </div>
        </main>
    );
}

