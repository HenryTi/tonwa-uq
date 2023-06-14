import { Net } from "../net";
import { UqConfig } from "../tool";
import { UQsMan } from "./uqsMan";
export declare function createUQsMan(net: Net, appVersion: string, uqConfigs: UqConfig[], uqsSchema: {
    [uq: string]: any;
}): Promise<UQsMan>;
