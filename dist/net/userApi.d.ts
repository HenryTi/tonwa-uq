import { CenterApiBase } from "./uqApi";
import { User } from '../tool';
export interface RegisterParameter {
    nick: string;
    user: string;
    pwd: string;
    country: number;
    mobile: number;
    mobileCountry: number;
    email: string;
    verify: string;
}
export declare class UserApi extends CenterApiBase {
    login(params: {
        user: string;
        pwd: string;
        guest: number;
    }): Promise<any>;
    register(params: RegisterParameter): Promise<any>;
    changePassword(param: {
        orgPassword: string;
        newPassword: string;
    }): Promise<any>;
    sendVerify(account: string, type: 'mobile' | 'email', oem: string): Promise<any>;
    checkVerify(account: string, verify: string): Promise<any>;
    isExists(account: string): Promise<any>;
    resetPassword(account: string, password: string, verify: string, type: 'mobile' | 'email'): Promise<any[]>;
    userSetProp(prop: string, value: any): Promise<void>;
    me(): Promise<any>;
    user(id: number): Promise<any>;
    fromKey(key: string): Promise<{
        id: number;
        name: string;
        nick: string;
        icon: string;
    }>;
    guest(): Promise<any>;
    userQuit(): Promise<void>;
    userAppUnits(app: number): Promise<any[]>;
    userFromKey(userName: string): Promise<User>;
    userFromId(userId: number): Promise<any>;
    userFromName(userName: string): Promise<User>;
    usersFromEmail(email: string): Promise<any>;
    userFromMobile(mobile: string): Promise<User>;
}
