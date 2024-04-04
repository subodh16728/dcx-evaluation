
export interface Feature {
    title: string;
    value: string
}

export interface Product {
    name: string;
    category: string;
    price: string;
    description: string;
    features: Array<Feature>; // Product.features Array<Feature> = event.taret.value (string)
}

export interface ErrorContainer {
    [props: string]: string;
}

// export interface FeatureDataContainer{
//     [props: string]: string;
// } 

export type FeatureProp = {
    data: Feature;
    index: number;
    onChange: Function;
    onDelete: Function;
}

export interface HandleChangeFeature{
    index: number;
    name: string;
    value: string;
}
