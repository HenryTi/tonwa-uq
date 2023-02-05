import { User } from '../tool';
import { CenterApiBase } from './uqApi';
export declare class CenterApi extends CenterApiBase {
    userAppUnits(app: number): Promise<any[]>;
    userFromKey(userName: string): Promise<User>;
    userFromId(userId: number): Promise<any>;
    userFromName(userName: string): Promise<User>;
    usersFromEmail(email: string): Promise<any>;
    userFromMobile(mobile: string): Promise<User>;
}
