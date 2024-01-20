import { prisma } from "@/src/lib/prisma";
import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import AccountResetPassword from "@/src/templates/emails/accountResetPassword";
import AccountActivationCode from "@/src/templates/emails/accountActivationCode";
import CustomerOrderCreatedEmail from "@/src/templates/emails/customerOrderCreated";

var transport: any = null;

const initService = () => {
  const {
    MAIL_HOST,
    MAIL_PORT,
    MAIL_SECURE,
    MAIL_USERNAME,
    MAIL_PASSWORD,
  } = process.env;
  transport = createTransport({
    host: MAIL_HOST as string,
    port: parseInt(MAIL_PORT!),
    secure: MAIL_SECURE == "True",
    requireTLS: true,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
  });


};

const sendActivateAccountCode = async (email: string, link: string) => {

  initService();

  const htmlMail = render(<AccountActivationCode link={link} />);

  await transport.sendMail({
    subject: process.env.MAIL_FROM_NAME + " - " + "Attiva il tuo account",
    to: email,
    templateData: {
      link: link,
    },
    html: htmlMail,
  });
};

const sendResetPassword = async (email: string, link: string) => {

  initService()

  const htmlMail = render(<AccountResetPassword link={link} />);

  await transport.sendMail({
    subject: process.env.MAIL_FROM_NAME + " - " + "Reset della password",
    to: email,
    templateData: {
      link: link,
    },
    html: htmlMail,
  });

};

const sendCustomerOrderCreatedEmail = async (orderId: number) => {

  initService();

  var order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      user: true,
      carrier: true,
      orderState: true,
      details: true,
    },
  });

  if (order) {
    const htmlMail = render(<CustomerOrderCreatedEmail carrier={order?.carrier!} rows={order?.details!} total={order?.total.toNumber()!} />);

    await transport.sendMail({
      subject: process.env.MAIL_FROM_NAME + " - " + "Ordine creato",
      to: order?.user.email,
      html: htmlMail,
    });
  }


};

const mailService = {
  sendActivateAccountCode,
  sendResetPassword,
  sendCustomerOrderCreatedEmail,
};

export default mailService;
