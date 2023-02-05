import { UqQuery } from './query';
export declare class UqHistory<P, R> extends UqQuery<P, R> {
    get typeName(): string;
    protected queryApiName: string;
}
export declare class History extends UqHistory<any, any> {
}
