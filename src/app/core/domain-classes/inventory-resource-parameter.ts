import { ResourceParameter } from "./resource-parameter";

export class InventoryResourceParameter extends ResourceParameter {
    id?: string;
    productId?: string;
    stock?: number;
    productName?: string;
    IsAdmin?:boolean
    search?:string
    team?:string
    type?:string
    category?:string
    subCategory?:string
    status?:string
    subStatus?:string
    priority?:string
    toDate?:string
    fromDate?:string
    teamId?:string
}
