

export interface Product{
    name: string;
    description: string;
    price: number | string;
    category: string;
    features: Array<Feature>;
    _id?:string;
}
export interface Offers1{
    Title: string;
    Description: string;
    Discount: number | string;
    StartDate: string;
    EndDate: string;
    Availability:string;
    RedemptionMethod:string;
}

export interface Feature{
    title:string;
    value:string;
    [props:string]:string;
}


export interface Props{
    data : {title:string , value:string|number};
    index : number;
    onDelete: (index:number) => void;
    onChange: (index:number,name:string,value:string) => void;
  }
export interface MyState {
    api: any;
    shared: boolean
    submitted: boolean
  }
export interface Main1{
    UserId:string
}
export interface Decode{
    email:string,
    
}
export interface ErrorsF{
    name:string,
    email:string,
    password:string,
    confirmpassword:string
}
export interface UserDetails {
    _id: string;
    email: string;
    password: string;
    name: string;
    
  }
export interface ApiState {
    isLoading: boolean;
    data: UserDetails | null;
    isError: boolean;
  }

  export interface DefaultProductStructure {
    [props: number | string]: object | any;
}
