import { Net } from "../net";
import { UqConfig } from "../tool";
import { UQsMan } from "../uqCore";
export declare function createUQsMan(net: Net, appVersion: string, uqConfigs: UqConfig[], uqsSchema: {
    [uq: string]: any;
}): Promise<UQsMan>;
