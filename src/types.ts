import { Decimal } from "@prisma/client/runtime/library";

export type CartItem = {
  id: number;
  name?: string;
  price?: number;
};

export type CartRow = {
  item: CartItem;
  quantity: number;
};

export enum MessageType {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type Message = {
  text: string;
  type: MessageType;
};

export type ChangePasswordFields = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

export type PersonalInfoFields = {
  firstname: string;
  lastname: string;
};

export type ResetPasswordFields = {
  email: string;
};

export type ResetPasswordTokenFields = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type LoginFields = {
  email: string;
  password: string;
  callbackUrl?: string | undefined;
};

export type SigninFields = {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstname: string;
  lastname: string;
};

export type VerifyAccountFields = {
  email: string;
};

export type SearchFields = {
  search: string;
};

// DTO
export type CategoryDTO = {
  id?: number | null | undefined;
  name: string;
  imageUrl?: string | null | undefined;
  slug?: string | null | undefined;
  deleted?: boolean | null | undefined;
  imageFile?: FileList | null | undefined;
};

export type FoodDTO = {
  id?: number | null | undefined;
  ingredients?: string | null | undefined;
  deleted?: boolean | null | undefined;
  category?: CategoryDTO | null | undefined;
  name: string;
  price: number | Decimal;
  categoryId?: number | null | undefined;
};

export type OrderStateDTO = {
  id?: number | null | undefined;
  name: string;
  cssBadgeClass?: string | null | undefined;
  deleted?: boolean | null | undefined;
};

export type CarrierDTO = {
  id?: number | null | undefined;
  name: string;
  costs: number | Decimal;
  deleted?: boolean | null | undefined;
};

export type SettingDTO = {
  siteTitle: string;
  siteSubtitle?: string | null | undefined;
  orderStateCreatedId?: number | null | undefined;
  orderStateCreated?: OrderStateDTO | null | undefined;
  orderStatePaidId?: number | undefined | null;
  orderStatePaid?: OrderStateDTO | null | undefined;
  orderStateDeletedId?: number | undefined | null;
  orderStateDeleted?: OrderStateDTO | null | undefined;
};

//Form types

export type DeliveryInfoFields = {
  deliveryTime: string;
  deliveryAddress: string;
};

export type RiepilogoOrdineFields = {
  note: string;
};

export enum DeliveryType {
  ASPORTO = "ASPORTO",
  DOMICILIO = "DOMICILIO",
}

export type DeliveryTypeFields = {
  delivery_type: DeliveryType;
};

export type CartState = {
  items: { [name: string]: CartRow };
  total: number;
  deliveryAddress: string;
  deliveryTime: string;
  carrierId?: number;
  note: string;
};

export type CurrentUser = {
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  role: string;
};

export type Paginated = {
  paginated: boolean;
  perPage: number;
  page: number;
};

export type Sorted = {
  orderBy: string;
  ascending: boolean;
};

export type CrudType = {
  search?: string;
  deleted: boolean;
} & Paginated &
  Sorted;

export type CrudResults<T> = {
  items: T[];
  count: number;
};
