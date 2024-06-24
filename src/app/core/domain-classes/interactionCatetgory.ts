export interface InteractionCategory {
    id?: string;
    name?: string;
    description?: string;
    subCategory?:SubCategory[];
    parentId?:string;
    isEnabled?:boolean;
    nIndex:any;
}


export interface SubCategory {
    id?: string;
    name?: string;
    description?: string;
    parentId?:string
    isEnabled?:boolean
}


export interface InteractionStatus {
    id?: string;
    name?: string;
    subCategory?:SubCategory[];
    parentId?:string
    isEnabled?:boolean
}
export interface InteractionType {
    id?: string;
    name?: string;
    isEnabled?:boolean;
    enabled?:boolean;
    typeFor?:string;
    subCategory?:SubCategory[];
    parentId?:string
}