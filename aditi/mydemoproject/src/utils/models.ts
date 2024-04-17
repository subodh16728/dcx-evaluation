export interface Products {
  _id: any;
  name: string;
  description: string;
  price: string;
  category: string;
  features: Array<Feature>;
}

export interface Feature {
  title: string;
  value: string;
  [prop: string]: string;
}

export interface Props {
  data: { title: string; value: string | number };
  index: number;
  onDelete: (index: number) => void;
  onChange: (index: number, name: string, value: string) => void;
}

export interface MyData {

  [prop:string] : string|string[]
  // createdAt:string 
  // email:string
  // password:string
  // updatedAt:string
  // username:string
  // wishlist:Array<string>
  // __v:string
  // _id:string
}

export interface InitialState {
  isLoading: boolean;
  data: MyData;
  isError: boolean;
}

export interface Offer{
  tittle: string;
  description: string;
  discount: number;
  startDate: string;
  endDate: string;
}

export interface ErrorContainer {
   [props:string] : string|null;
}
