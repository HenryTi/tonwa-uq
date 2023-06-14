import { UqMan } from './uqMan';
import { Net, UqData } from '../net';
import { UqConfig } from '../tool';
export declare class UQsMan {
    private readonly net;
    private readonly uqsSchema;
    private collection;
    uqMans: UqMan[];
    constructor(net: Net, uqsSchema: {
        [uq: string]: any;
    });
    buildUqs(uqDataArr: UqData[], version: string, uqConfigs: UqConfig[], isBuildingUQ: boolean): void;
    uq(uqName: string): UqMan;
    getUqUserRoles(uqLower: string): Promise<string[]>;
    init(uqsData: UqData[]): void;
    buildUqEntities(): void;
    getUqMans(): UqMan[];
    setTuidImportsLocal(): string[];
    private setInner;
}
