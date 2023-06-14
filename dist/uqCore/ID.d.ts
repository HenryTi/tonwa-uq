import { Entity } from "./entity";
import { Field } from "./uqMan";
declare abstract class UqIBase extends Entity {
    permitRole: string;
    setPermitRole(role: string): void;
}
export declare class UqID<M extends {
    id?: number;
}> extends UqIBase {
    get typeName(): string;
    create: boolean;
    update: boolean;
    owner: boolean;
    keys: Field[];
    NO(): Promise<string>;
    protected setKeys(): void;
    get isGlobal(): boolean;
    getIdFromObj(value: any): number;
    valueFromString(str: string): M;
    cacheTuids(defer: number): void;
    valueFromId(id: number): Promise<M>;
    loadValuesFromIds(divName: string, ids: number[]): Promise<M[]>;
    cacheTuidFieldValues(value: any): void;
    unpackTuidIds(values: string[]): any[];
    unpackJoins(resultMain: any, resultJoins: any[][]): [[string, any], [string, any[]][]];
    private unpackStr;
}
export declare class ID extends UqID<any> {
}
export declare class UqIDX<M> extends UqIBase {
    get typeName(): string;
}
export declare class IDX extends UqIDX<any> {
}
export declare class UqIX<M> extends UqIBase {
    get typeName(): string;
}
export declare class IX extends UqIX<any> {
}
export {};
