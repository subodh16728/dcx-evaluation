export interface Product {
    _id: string;
    name: string,
    description: string,
    category: string,
    price: null | number,
    features: Array<Feature>,
    bookmarked: boolean
}

export interface Feature {
    title: string,
    value: string,
    [key: string]: string
    
}

export interface FeatureForms {
    data: string,
    title:string,
    index:number,
    value: string,
    onChange: Function, 
    removeFeature: Function
}

export interface userData {
    username: string,
    email: string,
    password: string,
    confirmpassword: string
}

export interface Offer {
  _id: string,
  offername: string,
  offercode: string,
  startdate: string,
  enddate: string,
}

export interface Props{
    data : {title:string , value:string|number};
    index : number;
    onDelete: (index:number) => void;
    onChange: (index:number,name:string,value:string) => void;
  }