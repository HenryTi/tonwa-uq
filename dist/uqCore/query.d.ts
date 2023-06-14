import { Entity } from './entity';
import { QueryQueryCaller, QueryPageCaller } from './caller';
export type QueryPageApi = (name: string, pageStart: any, pageSize: number, params: any) => Promise<string>;
export declare class UqQuery<P, R> extends Entity {
    get typeName(): string;
    isPaged: boolean;
    order: 'asc' | 'desc';
    setSchema(schema: any): void;
    protected pageCaller(params: any, $$user?: number, showWaiting?: boolean): QueryPageCaller;
    page(params: P, pageStart: any, pageSize: number, $$user?: number, showWaiting?: boolean): Promise<R>;
    protected queryCaller(params: P, $$user?: number, showWaiting?: boolean): QueryQueryCaller;
    query(params: P, $$user?: number, showWaiting?: boolean): Promise<R>;
    table(params: P, $$user?: number, showWaiting?: boolean): Promise<any[]>;
    obj(params: P, $$user?: number, showWaiting?: boolean): Promise<any>;
    scalar(params: P, $$user?: number, showWaiting?: boolean): Promise<any>;
}
export declare class Query extends UqQuery<any, any> {
}
