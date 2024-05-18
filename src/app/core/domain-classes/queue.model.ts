export interface Queue {
    id?: string;
    name?: string;
    isEnabled?: boolean;
    data?:any
}


export class QueueMember{
    id?: string;
    name?: string;
    isEnabled?: boolean;
    parentId?:string;
    userId?:string;
    queueId?:string;
}