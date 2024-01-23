import axiosIstance from "@/src/lib/axiosIstance";
import { CategoryDTO, OrderStateDTO } from "@/src/types";

import * as yup from "yup";

export const categoryValidator = yup.object({
  id: yup.number().nullable(),
  name: yup.string().required("Il campo nome è obbligatorio"),
  imageUrl: yup.string().nullable(),
  slug: yup.string().nullable(),
  deleted: yup.boolean().nullable(),
  imageFile: yup.mixed<FileList>().nullable().test(
    "fileSize",
    "File troppo grande (max 1 mega)",
    (value: any) => {
      if (value == undefined || value.length === 0) {
        return true;
      }
      return value.length && value[0].size <= 1000 * 1000;
    },
  )
    .test(
      "fileFormat",
      "Formato non accettato",
      (value: any) => {
        if (value == undefined || value.length === 0) {
          return true;
        }
        return value[0] &&
          ["image/jpg", "image/jpeg", "image/png"].includes(
            value[0].type,
          );
      },
    ),
}).required();

export const changePasswordValidator = yup.object({
  currentPassword: yup.string().required("La password attuale è obbligatoria"),
  password: yup.string().matches(
    RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
    "La password deve essere lunga almeno 8 caratteri e contenere: 1 numero, 1 carattere speciale e una lettera maiuscola",
  ).required("Il campo password è obbligatorio"),
  passwordConfirmation: yup.string().required(
    "Il campo conferma password è obbligatorio",
  ).oneOf([yup.ref("password")], "Le due password devono corrispondere"),
}).required();

export const foodValidator = yup.object({
  id: yup.number().nullable(),
  name: yup.string().required("Il campo nome è obbligatorio"),
  price: yup.number().typeError("Inserisci un numero valido").required(
    "Il campo prezzo è obbligatorio",
  ).min(
    0.01,
    "Il prezzo deve essere maggiore di 0",
  ),
  ingredients: yup.string().nullable(),
  categoryId: yup.number().nullable().required("La categoria è obbligatoria"),
  category: yup.mixed<CategoryDTO>().nullable(),
  deleted: yup.boolean().nullable(),
}).required();

export const carrierValidator = yup.object({
  id: yup.number().nullable(),
  name: yup.string().required("Il campo nome è obbligatorio"),
  costs: yup.number().typeError("Inserisci un numero valido").required(
    "Il campo prezzo è obbligatorio",
  ).min(
    0.00,
    "Il prezzo maggiore o uguale a 0",
  ),
  deleted: yup.boolean().nullable(),
}).required();

export const orderStateValidator = yup.object({
  id: yup.number().nullable(),
  name: yup.string().required("Il campo nome è obbligatorio"),
  cssBadgeClass: yup.string().nullable(),
  deleted: yup.boolean().nullable(),
}).required();



export const deliveryInfoValidator = yup.object({
  deliveryAddress: yup.string().nullable(),
  deliveryTime: yup.string().required("L'orario è obbligatorio"),
}).required();


export const loginValidator = yup.object({
  email: yup.string().email("Inserisci un indirizzo email valido").required(
    "Questo campo è obbligatorio",
  ),
  password: yup.string().required("Il campo password è obbligatorio"),
  callbackUrl: yup.string()
}).required();

export const personalInfoValidator = yup.object({
  firstname: yup.string().required("Il campo nome è obbligatorio"),
  lastname: yup.string().required("Il campo cognome è obbligatorio"),
}).required();

export const resetPasswordTokenValidator = yup.object({
  token: yup.string().required(
    "Questo campo è obbligatorio",
  ),
  password: yup.string().matches(
    RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
    "La password deve essere lunga almeno 8 caratteri e contenere: 1 numero, 1 carattere speciale e una lettera maiuscola",
  ).required("Il campo password è obbligatorio"),
  confirmPassword: yup.string().required(
    "Il campo conferma password è obbligatorio",
  ).oneOf([yup.ref("password")], "Le due password devono corrispondere"),
}).required();

export const resetPasswordValidator = yup.object({
  email: yup.string().email("Inserisci un indirizzo email valido").required(
    "Questo campo è obbligatorio",
  ),
}).required();

export const settingValidator = yup.object({
  id: yup.number().nullable(),
  siteTitle: yup.string().required("Il campo nome del sito è obbligatorio"),
  siteSubtitle: yup.string().nullable(),
  orderStateCreatedId: yup.number().required("Seleziona uno stato valido"),
  orderStatePaidId: yup.number().required("Seleziona uno stato valido"),
  orderStateDeletedId: yup.number().required("Seleziona uno stato valido"),
  orderStateCreated: yup.mixed<OrderStateDTO>().nullable(),
  orderStatePaid: yup.mixed<OrderStateDTO>().nullable(),
  orderStateDeleted: yup.mixed<OrderStateDTO>().nullable()
});

const verifyEmail = async (value: string, values: yup.TestContext<any>) => {
  if (value.length > 0) {

    var response = await axiosIstance.get("/api/account/verifyEmailBusy", {
      params: {
        email: value
      }
    });

    const { result } = response.data;

    if (result == true) {
      values.createError({ path: "email" });
    }

    return !result;
  } else {
    return false;
  }
};

export const signinValidator = yup.object({
  firstname: yup.string().required("Il campo nome è obbligatorio"),
  lastname: yup.string().required("Il campo cognome è obbligatorio"),
  email: yup.string().email("Inserisci un indirizzo email valido").required(
    "Questo campo è obbligatorio",
  ).test("is-busy", "Email in uso", async function (value, values) {
    const responseTest = await verifyEmail(value!, values);
    return responseTest as boolean;
  }),
  password: yup.string().matches(
    RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
    "La password deve essere lunga almeno 8 caratteri e contenere: 1 numero, 1 carattere speciale e una lettera maiuscola",
  ).required("Il campo password è obbligatorio"),
  passwordConfirmation: yup.string().required(
    "Il campo conferma password è obbligatorio",
  ).oneOf([yup.ref("password")], "Le due password devono corrispondere"),
}).required();



export const verifyAccountValidator = yup.object({
  email: yup.string().email("Inserisci un indirizzo email valido").required(
    "Questo campo è obbligatorio",
  ),
}).required();



export const updateOrderStatusValidator = yup.object({
  orderState: yup.number().required(),
}).required();


export const updateOrderDetailsAddItemValidator = yup.object({
  id: yup.number().required(),
}).required();

export const pickDeliveryMethodValidator = yup.object({
  carrierId: yup.number().required("Seleziona un metodo di consegna"),
}).required();
