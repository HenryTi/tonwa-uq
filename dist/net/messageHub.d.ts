import { Net } from "./Net";
export declare class MessageHub {
    net: Net;
    constructor(net: Net);
    private handlerSeed;
    private anyHandlers;
    private msgHandlers;
    registerReceiveHandler(handler: (msg: any) => Promise<void>): number;
    registerReceiveHandler(type: string, handler: (msg: any) => Promise<void>): number;
    unregisterReceiveHandler(handlerId: number): void;
    dispatch(msg: any): Promise<void>;
}
