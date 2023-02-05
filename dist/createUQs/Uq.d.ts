import { UqMan } from "../uqCore";
export declare class Uq {
    private $_uqMan;
    private $_uqSql;
    constructor(uqMan: UqMan);
    $_createProxy(): {
        [name: string]: import("../uqCore").Entity;
    };
    private $_createUqSqlProxy;
    private errUndefinedEntity;
}
