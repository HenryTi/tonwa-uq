import { Entity } from './entity';
import { ActionCaller } from './caller';
export declare class UqAction<P, R> extends Entity {
    get typeName(): string;
    submit(data: P, $$user?: number, waiting?: boolean): Promise<any>;
    submitReturns(data: P, $$user?: number): Promise<R>;
    submitConvert(data: P, $$user?: number): Promise<any>;
}
export declare class Action extends UqAction<any, any> {
}
export declare class ActionSubmitCaller extends ActionCaller {
    get path(): string;
    buildParams(): any;
}
