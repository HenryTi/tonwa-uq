import { UqQuery } from './query';
import { QueryQueryCaller } from './caller';
export declare class UqBook<P, R> extends UqQuery<P, R> {
    get typeName(): string;
    protected queryApiName: string;
    protected queryCaller(params: any): QueryQueryCaller;
}
export declare class Book extends UqBook<any, any> {
}
export declare class BookQueryCaller extends QueryQueryCaller {
    get path(): string;
}
