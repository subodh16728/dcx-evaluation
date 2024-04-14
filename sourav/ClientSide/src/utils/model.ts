export interface Product {
  _id?:string;
  name: string;
  description: string;
  price: number;
  category: string;
  features: Array<Feature>;
}

export interface Feature {
  title: string;
  value: string;
}

export interface UserDetails {
  _id: string;
  email: string;
  password: string;
  name: string;
  gender: string;
  wishlist: string[];
}

export interface ApiState {
  isLoading: boolean;
  data: UserDetails | null;
  isError: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
    name:string;
    email:string;
    gender:string;
    password:string;
    confirmpassword:string;
}

export interface DataResponse {
  message: string;
  error: string;
  success: string;
  token: string;
  id: string;
  name: string;
}

export interface OfferData {
    OfferTitle:string;
    OfferDescription:string;
    Discount:string;
    StartDate:string;
    EndDate:string;
    CouponCode:string;
    Availability:string;
    RedemptionMethod:string;
}
