import { Caller } from './caller';
import { Net } from './Net';
export declare class HttpChannel {
    language: string;
    culture: string;
    private timeout;
    protected net: Net;
    protected hostUrl: string;
    protected authToken: string;
    constructor(net: Net, hostUrl: string, authToken: string);
    used(): void;
    xcall(urlPrefix: string, caller: Caller<any>): Promise<void>;
    private innerFetchResult;
    get(url: string, params?: any, headers?: any): Promise<any>;
    post(url: string, params: any, headers?: any): Promise<any>;
    put(url: string, params: any, headers?: any): Promise<any>;
    delete(url: string, params: any, headers?: any): Promise<any>;
    fetch(url: string, options: any, resolve: (value?: any) => any, reject: (reason?: any) => void): Promise<void>;
    protected innerFetch(url: string, options: any): Promise<any>;
    callFetch(url: string, method: string, body: any): Promise<any>;
    private buildOptions;
    protected buildHeaders(paramHeaders: {
        [name: string]: string;
    }): {
        [name: string]: string;
    };
}
