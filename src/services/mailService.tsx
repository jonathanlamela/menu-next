import { prisma } from "@/src/lib/prisma";
import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import AccountResetPassword from "@/src/emails/customer/accountResetPassword";
import AccountActivationCode from "@/src/emails/customer/accountActivationCode";
import CustomerOrderCreatedEmail from "@/src/emails/customer/customerOrderCreated";
import CustomerOrderPaidEmail from "@/src/emails/customer/customerOrderPaid";
import CustomerOrderStateUpdatedEmail from "@/src/emails/customer/customOrderStateUpdated";

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

export async function sendActivateAccountCodeEmail(email: string, link: string) {

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

export async function sendResetPasswordEmail(email: string, link: string) {

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

export async function sendCustomerOrderCreatedEmail(orderId: number) {

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

    var orderTotal =
      (parseFloat(`${order.carrier?.costs}`) || 0) + (parseFloat(`${order.total}`) || 0);

    const htmlMail = render(<CustomerOrderCreatedEmail carrier={order?.carrier!} rows={order?.details!} total={orderTotal} />);

    await transport.sendMail({
      subject: process.env.MAIL_FROM_NAME + " - " + "Ordine creato",
      to: order?.user.email,
      html: htmlMail,
    });
  }
};

export async function sendCustomerOrderPaidEmail(orderId: number) {

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

    var orderTotal =
      (parseFloat(`${order.carrier?.costs}`) || 0) + (parseFloat(`${order.total}`) || 0);

    const htmlMail = render(<CustomerOrderPaidEmail carrier={order?.carrier!} rows={order?.details!} total={orderTotal} />);

    await transport.sendMail({
      subject: process.env.MAIL_FROM_NAME + " - " + "Ordine pagato",
      to: order?.user.email,
      html: htmlMail,
    });
  }
};

export async function sendCustomerOrderStateUpdatedEmail(orderId: number) {

  initService();

  var order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      user: true,
      orderState: true,
      details: true,
    },
  });

  if (order) {

    const htmlMail = render(<CustomerOrderStateUpdatedEmail orderState={order.orderState!} />);

    await transport.sendMail({
      subject: process.env.MAIL_FROM_NAME + " - " + "Stato ordine aggiornato",
      to: order?.user.email,
      html: htmlMail,
    });
  }
};




