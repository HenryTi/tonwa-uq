import { Net } from "./Net";
export declare function setSubAppWindow(win: any): void;
export declare function postWsToTop(msg: any): void;
export declare abstract class WsBase {
    protected net: Net;
    constructor(net: Net);
    receive(msg: any): Promise<void>;
}
export declare class WsBridge extends WsBase {
    wsBaseId: string;
}
export declare class WSChannel extends WsBase {
    wsBaseId: string;
    static centerToken: string;
    private wsHost;
    private token;
    private ws;
    constructor(net: Net, wsHost: string, token: string);
    static setCenterToken(token?: string): void;
    connect(): Promise<void>;
    close(): void;
    private wsMessage;
    sendWs(msg: any): void;
}
