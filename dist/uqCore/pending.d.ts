import { UqQuery } from './query';
export declare class UqPending<P, R> extends UqQuery<P, R> {
    get typeName(): string;
    protected queryApiName: string;
}
export declare class Pending extends UqPending<any, any> {
}
