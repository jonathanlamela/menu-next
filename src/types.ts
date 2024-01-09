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

export interface OrderStateFields {
  id: number;
  name: string;
  cssBadgeClass?: string;
}

//Forms type
export type FoodFields = {
  name: string;
  ingredients?: string | null;
  price: number | Decimal;
  categoryId?: number | null | undefined;
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
  categoryId: number | null;
};

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

export type MessagesState = {
  message?: Message | null;
};

export type Settings = {
  siteTitle?: string;
  siteSubtitle?: string;
  orderCreatedStateId?: number;
  orderPaidStateId?: number;
  orderDeletedStateId?: number;
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
  cssBadgeClass: string | undefined;
}

export type CreateOrderStateFields = {
  name: string;
  cssBadgeClass: string | undefined;
};

export type UpdateOrderStateFields = CreateOrderStateFields & {
  id: number;
};

export interface OrderDetail {
  orderId: number;
  id: number;
  name: string | null;
  quantity: number;
  unitPrice: number;
}

export interface OrderDetailRow {
  orderId: number;
  id: number;
  name: string | null;
  quantity: number;
  unitPrice: number;
}

export interface GetOrderDetailResponse {
  id: number;
  orderState: OrderState | null;
  isPaid: boolean;
  deliveryAddress: string | null;
  deliveryTime: string | null;
  note: string | null;
  shippingCosts: number;
  orderDetails: OrderDetail[] | null;
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
  ascending: boolean;
};

export type CrudType = {
  search?: string;
  deleted: boolean;
} & Paginated &
  Sorted;
