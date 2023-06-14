import { Entity } from "./entity";
export interface UnitRole {
    unit: number;
    entity: string;
    isOwner: boolean;
    isAdmin: boolean;
    roles: string[];
}
export interface MyRole {
    sys: UnitRole;
    units: UnitRole[];
}
export declare class UqSys {
    private readonly entities;
    constructor(entities: {
        [name: string]: Entity;
    });
    Poked(): Promise<boolean>;
    RoleMe(): Promise<MyRole>;
}
