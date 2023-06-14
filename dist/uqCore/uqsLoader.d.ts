import { UQsMan } from "./uqsMan";
import { Net } from '../net';
import { UqConfig } from "../tool";
export declare class UQsLoader {
    protected readonly net: Net;
    protected readonly uqConfigVersion: string;
    protected readonly uqConfigs: UqConfig[];
    protected readonly uqsSchema: {
        [uq: string]: any;
    };
    protected isBuildingUQ: boolean;
    uqsMan: UQsMan;
    constructor(net: Net, uqConfigVersion: string, uqConfigs: UqConfig[], uqsSchema: {
        [uq: string]: any;
    });
    build(): Promise<void>;
    loadUqs(): Promise<void>;
    private loadUqData;
    private loadLocal;
}
export declare class UQsBuildingLoader extends UQsLoader {
    build(): Promise<void>;
}
