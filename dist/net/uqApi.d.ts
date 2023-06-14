import { HttpChannel } from './httpChannel';
import { ApiBase } from './apiBase';
import { Net } from './Net';
import { UqMan } from '../uqCore';
export declare class UqApi extends ApiBase {
    private readonly uq;
    constructor(uqMan: UqMan);
    protected getHttpChannel(): Promise<HttpChannel>;
    protected customHeader(): {
        [key: string]: string;
    };
    loadEntities(): Promise<any>;
    bizSheet(id: number, act: string): Promise<void>;
    bizSheetAct(id: number, detail: string, act: string): Promise<any[]>;
    getAdmins(): Promise<any[]>;
    setMeAdmin(): Promise<void>;
    setAdmin(user: number, role: number, assigned: string): Promise<void>;
    isAdmin(): Promise<boolean>;
    getRoles(): Promise<string[]>;
    getAllRoleUsers(): Promise<{
        user: number;
        admin: number;
        roles: string;
    }[]>;
    setUserRoles(theUser: number, roles: string): Promise<void>;
    deleteUserRoles(theUser: number): Promise<void>;
    allSchemas(): Promise<any>;
    schema(name: string): Promise<any>;
    queueModify(start: number, page: number, entities: string): Promise<any>;
    syncUser(user: number): Promise<any>;
}
export declare abstract class CenterApiBase extends ApiBase {
    protected getHttpChannel(): Promise<HttpChannel>;
}
export declare class UqTokenApi extends CenterApiBase {
    private readonly localMap;
    constructor(net: Net, path: string);
    clearLocal(): void;
    uq(params: {
        unit: number;
        uqOwner: string;
        uqName: string;
    }): Promise<any>;
}
export declare class CallCenterApi extends CenterApiBase {
    directCall(url: string, method: string, body: any): Promise<any>;
}
export interface UqAppData {
    appName: string;
    appOwner: string;
    id: number;
    version: string;
    uqs: UqData[];
}
export interface UqData {
    id: number;
    uqOwner: string;
    ownerAlias: string;
    uqName: string;
    uqAlias: string;
    access: string;
    newVersion: boolean;
}
export interface UqServiceData {
    id: number;
    db: string;
    url: string;
    urlTest: string;
    token: string;
}
export declare class CenterAppApi extends CenterApiBase {
    appUqs(appOwner: string, appName: string): Promise<UqAppData>;
    uqs(uqs: {
        owner: string;
        name: string;
        version: string;
    }[]): Promise<UqData[]>;
    unitxUq(unit: number): Promise<UqServiceData>;
    changePassword(param: {
        orgPassword: string;
        newPassword: string;
    }): Promise<any>;
    userQuit(): Promise<void>;
}
