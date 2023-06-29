export type Paginated = {
  paginated: boolean;
  perPage: number;
  page: number;
};

export type Sorted = {
  orderBy: string;
  ascend: boolean;
};

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
  id: number;
  name: string;
  image: FileList;
};

export type ChangePasswordFields = {
  email: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export type LoginFields = {
  email: string;
  password: string;
  backUrl?: string;
};

export type PersonalInfoFields = {
  firstname: string;
  lastname: string;
};

export enum TipologiaConsegna {
  ASPORTO = "ASPORTO",
  DOMICILIO = "DOMICILIO",
}

export type CartState = {
  items: { [id: number]: CartRow };
  total: number;
  tipologia_consegna: TipologiaConsegna;
  indirizzo: string;
  orario: string;
  note: string;
};

export type MessagesState = {
  message?: { tag: string; text: string } | null;
};

export enum AccountSigninStatus {
  none,
  pending,
  failed,
  success,
}

export enum AccountVerifyStatus {
  none,
  failed,
  success,
}

export enum RequestResult {
  none,
  failed,
  success,
}

export type ResetPasswordFields = {
  email: string;
  source: string;
};

export type ResetPasswordTokenFields = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type SigninFields = {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  source: string;
};

export type VerifyAccountFields = {
  email: string;
  source: string;
};

export type SettingFields = {
  site_name: string;
  site_subtitle: string;
  shipping_costs: number;
  order_created_state_id: number;
  order_paid_state_id: number;
};

export type SearchFields = {
  search: string;
};

export interface OrderStateFields {
  id: number;
  name: string;
  css_badge_class?: string;
}

export type FoodFields = {
  id: number;
  name: string;
  ingredients: string;
  price: number;
  category_id: number;
};

export type CategoryUpdateRequest = {
  name: string;
  image: File;
};

export type CategoryListRequest = {
  page: number;
  perPage: number;
  search: string;
  orderBy: string;
  ascend: boolean;
};

export type CategoryCreateRequest = {
  name: string;
  image: File;
};
