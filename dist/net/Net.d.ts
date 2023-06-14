import { UqTokenApi } from "./uqApi";
import { UserApi } from "./userApi";
import { HttpChannel } from './httpChannel';
import { LocalDb } from "../tool";
export interface PromiseValue<T> {
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}
export interface NetProps {
    center: string;
    unit: number;
    testing: boolean;
    isDevelopment: boolean;
    localDb: LocalDb;
    createObservableMap(): Map<number, any>;
}
export declare class Net {
    private centerUrl;
    private uqDebug;
    private resDebug;
    private debugUqs;
    private testing;
    private uqChannels;
    private centerChannel;
    private readonly isDevelopment;
    private centerToken;
    private readonly props;
    private _loginedUserId;
    private readonly localDb;
    readonly userApi: UserApi;
    readonly uqTokenApi: UqTokenApi;
    constructor(props: NetProps);
    init(): Promise<void>;
    get fetchTimeout(): 30000 | 50000;
    get loginedUserId(): number;
    createLocalMap(mapKey: string): import("../tool").LocalMap;
    getLocalDbItem(itemKey: string): string;
    setLocalDbItem(itemKey: string, value: string): void;
    getResUrl(res: string): string;
    createObservableMap: () => Map<number, any>;
    logoutApis(): void;
    setCenterToken(userId: number, token: string): void;
    clearCenterToken(): void;
    getCenterChannel(): HttpChannel;
    buildUqUrl(db: string, url: string, urlTest: string): string;
    getHttpChannel(uq: string): Promise<HttpChannel>;
    private initUqToken;
}
