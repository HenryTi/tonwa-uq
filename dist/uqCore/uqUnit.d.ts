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
    roles: string[];
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
    private myUnitsColl;
    private userUnit0;
    myUnits: UserUnit[];
    userUnit: UserUnit;
    constructor(uqMan: UqMan);
    loginUnit(userUnit: UserUnit): void;
    logoutUnit(): void;
    hasRole(role: string[] | string): boolean;
    Poked(): Promise<boolean>;
    reloadMyRoles(): Promise<void>;
    loadMyRoles(): Promise<void>;
    loadUnitUsers(): Promise<UnitRoles>;
    addAdmin(user: number, admin: EnumSysRole, assigned: string): Promise<any>;
    addUser(user: number, assigned: string): Promise<any>;
    setUserRole(user: number, action: 'add' | 'del' | 'clear', role: string): Promise<void>;
    quitOwner(): Promise<void>;
    delAdmin(user: number, admin: EnumSysRole): Promise<void>;
}
