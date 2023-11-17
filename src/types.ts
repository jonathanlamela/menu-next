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

export type CategoryFields = {
  name: string;
  imageFile: FileList;
  image: string;
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

export type CreateCategoryFields = CategoryFields;
export type UpdateCategoryFields = CategoryFields & {
  id: number;
};

export type ChangePasswordFields = {
  email: string;
  current_password: string;
  password: string;
  password_confirmation: string;
};

export type LoginFields = {
  email: string;
  password: string;
  backUrl: string;
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

export interface OrderStateFields {
  id: number;
  name: string;
  css_badge_class?: string;
}

export type CreateFoodFields = {
  name: string;
  ingredients: string;
  price: number;
  category_id: number;
};

export type UpdateFoodFields = CreateFoodFields & {
  id: number;
};

export type Category = {
  id: number;
  name: string;
  image: string;
};

export type DeliveryInfoFields = {
  delivery_time: string;
  delivery_address: string;
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
  delivery_type: DeliveryType;
  delivery_address: string;
  delivery_time: string;
  note: string;
};

export type MessagesState = {
  message?: Message | null;
};

export type Settings = {
  siteTitle?: string;
  siteSubtitle?: string;
  shippingCosts?: number;
  orderCreatedStateId?: number;
  orderPaidStateId?: number;
};

export type CurrentUser = {
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  role: string;
};

export interface OrderState {
  id: number;
  name: string;
  css_badge_class: string | undefined;
}

export type CreateOrderStateFields = {
  name: string;
  css_badge_class: string | undefined;
};

export type UpdateOrderStateFields = CreateOrderStateFields & {
  id: number;
};

export interface OrderDetail {
  orderId: number;
  id: number;
  name: string | null;
  quantity: number;
  unit_price: number;
}

export interface OrderDetailRow {
  orderId: number;
  id: number;
  name: string | null;
  quantity: number;
  unit_price: number;
}

export interface GetOrderDetailResponse {
  id: number;
  order_state: OrderState | null;
  is_paid: boolean;
  is_shipping: boolean;
  delivery_address: string | null;
  delivery_time: string | null;
  note: string | null;
  shipping_costs: number;
  order_details: OrderDetail[] | null;
  total: number;
}

export type OrderCardItem = {
  id: number;
  total: number;
  order_state: OrderState;
};

export type Paginated = {
  paginated: boolean;
  perPage: number;
  page: number;
};

export type Sorted = {
  orderBy: string;
  ascend: boolean;
};
