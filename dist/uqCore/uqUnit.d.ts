import { WritableAtom } from "jotai";
import { UqMan } from "./uqMan";
export interface UserUnit<T = any> {
    id: number;
    user: number;
    unitId: number;
    unit: T;
    isOwner: boolean;
    isAdmin: boolean;
    assigned: string;
    name: string;
    nick: string;
    icon: string;
    rolesAtom: WritableAtom<string[], any, any>;
    permits: {
        [permit: string]: boolean;
    };
    entity: string;
    addBy: number;
}
export interface UnitRoles {
    owners: UserUnit[];
    admins: UserUnit[];
    users: UserUnit[];
    usersOfRole: {
        [role: string]: UserUnit[];
    };
}
export declare enum EnumSysRole {
    admin = 1,
    owner = 2
}
export declare class UqUnit {
    private readonly uqMan;
    private mySitesColl;
    userUnit0: UserUnit;
    mySites: UserUnit[];
    userUnit: UserUnit;
    constructor(uqMan: UqMan);
    login(): Promise<void>;
    loginUnit(userUnit: UserUnit): void;
    logoutUnit(): void;
    hasRole(role: string[] | string): boolean;
    Poked(): Promise<boolean>;
    reloadMyRoles(): Promise<void>;
    setSite(site: number): Promise<void>;
    private loadMyRoles;
    loadUnitUsers(): Promise<UnitRoles>;
    addAdmin(user: number, admin: EnumSysRole, assigned: string): Promise<any>;
    addUser(user: number, assigned: string): Promise<any>;
    setUserRole(user: number, role: string, on: boolean): Promise<void>;
    clearUserRole(user: number): Promise<void>;
    quitOwner(): Promise<void>;
    delAdmin(user: number, admin: EnumSysRole): Promise<void>;
}
