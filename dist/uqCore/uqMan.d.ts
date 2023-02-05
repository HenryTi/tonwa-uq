import { UqApi, UqData } from '../net';
import { Tuid, TuidDiv, TuidBox } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { Map } from './map';
import { Pending } from './pending';
import { LocalCache, LocalMap, UqConfig } from '../tool';
import { UqEnum } from './enum';
import { Entity } from './entity';
import { ID, IX, IDX } from './ID';
import { Net } from '../net';
export declare type FieldType = 'id' | 'tinyint' | 'smallint' | 'int' | 'bigint' | 'dec' | 'float' | 'double' | 'char' | 'text' | 'datetime' | 'date' | 'time' | 'timestamp' | 'enum';
export declare function fieldDefaultValue(type: FieldType): 0 | "" | "2000-1-1" | "0:00";
export interface Field {
    name: string;
    type: FieldType;
    tuid?: string;
    arr?: string;
    null?: boolean;
    size?: number;
    owner?: string;
    _tuid?: TuidBox;
}
export interface ArrFields {
    name: string;
    fields: Field[];
    id?: string;
    order?: string;
}
export interface FieldMap {
    [name: string]: Field;
}
export interface SchemaFrom {
    owner: string;
    uq: string;
}
export interface TuidModify {
    max: number;
    seconds: number;
}
interface ParamPage {
    start: number;
    size: number;
}
export interface ParamActIX<T> {
    IX: IX;
    ID?: ID;
    IXs?: {
        IX: IX;
        ix: number;
    }[];
    values: {
        ix: number | T;
        xi: number | T;
    }[];
}
export interface ParamActIXSort {
    IX: IX;
    ix: number;
    id: number;
    after: number;
}
export interface ParamActID {
    ID: ID;
    value: object;
    IX?: IX[];
    ix?: (number | object)[];
}
export interface ParamActDetail<M, D> {
    main: {
        ID: ID;
        value: M;
    };
    detail: {
        ID: ID;
        values: D[];
    };
}
export interface RetActDetail {
    main: number;
    detail: number[];
}
export interface ParamActDetail2<M, D, D2> extends ParamActDetail<M, D> {
    detail2: {
        ID: ID;
        values: D2[];
    };
}
export interface RetActDetail2 extends RetActDetail {
    detail2: number[];
}
export interface ParamActDetail3<M, D, D2, D3> extends ParamActDetail2<M, D, D2> {
    detail3: {
        ID: ID;
        values: D3[];
    };
}
export interface RetActDetail3 extends RetActDetail2 {
    detail3: number[];
}
export interface ParamQueryID {
    ID?: ID;
    IX?: (IX | string)[];
    IDX?: (ID | IDX)[];
    id?: number | number[];
    key?: {
        [key: string]: string | number;
    };
    ix?: number;
    idx?: number | number[];
    keyx?: {
        [key: string]: string | number;
    };
    page?: ParamPage;
    order?: 'desc' | 'asc';
}
export interface ParamIDNO {
    ID: ID;
    stamp?: undefined;
}
export interface ParamIDDetailGet {
    id: number;
    main: ID;
    detail: ID;
    detail2?: ID;
    detail3?: ID;
}
export interface ParamID {
    IDX: (ID | IDX) | (ID | IDX)[];
    id: number | number[];
    order?: 'asc' | 'desc';
    page?: ParamPage;
}
export interface ParamKeyID {
    ID: ID;
    IDX?: (ID | IDX)[];
    IX?: IX[];
    key: {
        [key: string]: string | number;
    };
    ix?: number;
    page?: ParamPage;
}
export interface ParamIX {
    IX: IX;
    IX1?: IX;
    ix: number | number[];
    IDX?: (ID | IDX)[];
    page?: ParamPage;
    order?: 'asc' | 'desc';
}
export interface ParamIXValues {
    IX: IX;
    ix?: number;
    page?: ParamPage;
    order?: 'asc' | 'desc';
}
export interface ParamKeyIX {
    ID: ID;
    key: {
        [key: string]: string | number;
    };
    IX: IX;
    IDX?: (ID | IDX)[];
    page?: ParamPage;
}
export interface ParamIDLog {
    IDX: (ID | IDX);
    field: string;
    id: number;
    log: 'each' | 'day' | 'week' | 'month' | 'year';
    timeZone?: number;
    far?: number;
    near?: number;
    page: ParamPage;
}
export interface ParamIDSum {
    IDX: IDX;
    field: string[];
    id: number | number[];
    far?: number;
    near?: number;
}
export interface ParamIDxID {
    ID: ID;
    IX: IX;
    ID2: ID;
    page?: ParamPage;
}
export interface IDXValue {
    value: number;
    time?: number | Date;
    setAdd: '=' | '+';
}
export interface ParamIDinIX {
    ID: ID;
    id: number;
    IX: IX;
    page?: ParamPage;
}
export interface ParamIDTree {
    ID: ID;
    parent: number;
    key: string | number;
    level?: number;
    page?: ParamPage;
}
export interface Uq {
    $: Uq;
    $name: string;
    Role: {
        [key: string]: string[];
    };
    idObj<T = any>(id: number): Promise<T>;
    IDValue<T>(type: string, value: string): T;
    Acts(param: any): Promise<any>;
    ActIX<T>(param: ParamActIX<T>): Promise<number[]>;
    ActIXSort(param: ParamActIXSort): Promise<void>;
    ActIDProp(ID: ID, id: number, name: string, value: any): Promise<void>;
    ActID(param: ParamActID): Promise<number>;
    QueryID<T>(param: ParamQueryID): Promise<T[]>;
    IDNO(param: ParamIDNO): Promise<string>;
    IDEntity(typeId: number): ID;
    ID<T = any>(param: ParamID): Promise<T[]>;
    IXr<T>(param: ParamIX): Promise<T[]>;
    KeyID<T>(param: ParamKeyID): Promise<T[]>;
    IX<T = any>(param: ParamIX): Promise<T[]>;
    IXValues(param: ParamIXValues): Promise<{
        type: string;
        value: string;
    }[]>;
    KeyIX<T>(param: ParamKeyIX): Promise<T[]>;
    IDxID<T, T2>(param: ParamIDxID): Promise<[T[], T2[]]>;
    IDinIX<T>(param: ParamIDinIX): Promise<T & {
        $in: boolean;
    }[]>;
    IDTv(ids: number[]): Promise<any[]>;
    IDTree<T>(param: ParamIDTree): Promise<T[]>;
    IDLog<T>(param: ParamIDLog): Promise<T[]>;
    IDSum<T>(param: ParamIDSum): Promise<T[]>;
    IDDetailGet<M, D>(param: ParamIDDetailGet): Promise<[M[], D[]]>;
    IDDetailGet<M, D, D2>(param: ParamIDDetailGet): Promise<[M[], D[], D2[]]>;
    IDDetailGet<M, D, D2, D3>(param: ParamIDDetailGet): Promise<[M[], D[], D2[], D3[]]>;
    ActDetail<M, D>(param: ParamActDetail<M, D>): Promise<RetActDetail>;
    ActDetail<M, D, D2>(param: ParamActDetail2<M, D, D2>): Promise<RetActDetail2>;
    ActDetail<M, D, D2, D3>(param: ParamActDetail3<M, D, D2, D3>): Promise<RetActDetail3>;
    AdminGetList(): Promise<any[]>;
    AdminSetMe(): Promise<void>;
    AdminSet(user: number, role: number, assigned: string): Promise<void>;
    AdminIsMe(): Promise<boolean>;
}
export declare class UqMan {
    readonly entities: {
        [name: string]: Entity;
    };
    readonly entityTypes: {
        [id: number]: Entity;
    };
    private readonly enums;
    private readonly actions;
    private readonly queries;
    readonly ids: {
        [name: string]: ID;
    };
    private readonly idxs;
    private readonly ixs;
    private readonly sheets;
    private readonly books;
    private readonly maps;
    private readonly histories;
    private readonly pendings;
    private readonly tuidsCache;
    private readonly localEntities;
    readonly localMap: LocalMap;
    readonly localModifyMax: LocalCache;
    readonly tuids: {
        [name: string]: Tuid;
    };
    readonly newVersion: boolean;
    readonly uqOwner: string;
    readonly uqName: string;
    readonly uqSchema: any;
    readonly name: string;
    readonly id: number;
    readonly net: Net;
    readonly uqApi: UqApi;
    proxy: any;
    $proxy: any;
    uqVersion: number;
    config: UqConfig;
    constructor(net: Net, uqData: UqData, uqSchema: any);
    getID(name: string): ID;
    getIDX(name: string): IDX;
    getIX(name: string): IX;
    private roles;
    getRoles(): Promise<string[]>;
    tuid(name: string): Tuid;
    tuidDiv(name: string, div: string): TuidDiv;
    action(name: string): Action;
    sheet(name: string): Sheet;
    query(name: string): Query;
    book(name: string): Book;
    map(name: string): Map;
    history(name: string): History;
    pending(name: string): Pending;
    sheetFromTypeId(typeId: number): Sheet;
    Role: {
        [key: string]: string[];
    };
    readonly tuidArr: Tuid[];
    readonly actionArr: Action[];
    readonly queryArr: Query[];
    readonly idArr: ID[];
    readonly idxArr: IDX[];
    readonly ixArr: IX[];
    readonly enumArr: UqEnum[];
    readonly sheetArr: Sheet[];
    readonly bookArr: Book[];
    readonly mapArr: Map[];
    readonly historyArr: History[];
    readonly pendingArr: Pending[];
    loadEntities(): Promise<string>;
    buildEntities(entities: any): void;
    private buildRole;
    private buildTuids;
    private buildIds;
    loadEntitySchema(entityName: string): Promise<any>;
    loadAllSchemas(): Promise<void>;
    getTuid(name: string): Tuid;
    private buildAccess;
    cacheTuids(defer: number): void;
    private setEntity;
    newEnum(name: string, id: number): UqEnum;
    newAction(name: string, id: number): Action;
    private newTuid;
    newQuery(name: string, id: number): Query;
    private newBook;
    private newMap;
    private newHistory;
    private newPending;
    private newSheet;
    private newID;
    private newIDX;
    private newIX;
    private fromType;
    private fromObj;
    private buildSheet;
    buildFieldTuid(fields: Field[], mainFields?: Field[]): void;
    buildArrFieldsTuid(arrFields: ArrFields[], mainFields: Field[]): void;
    pullModify(modifyMax: number): void;
    getUqKey(): string;
    getUqKeyWithConfig(): string;
    hasEntity(name: string): boolean;
    createProxy(): any;
    private errUndefinedEntity;
    private apiPost;
    private apiActs;
    private buildValue;
    protected Acts: (param: any) => Promise<any>;
    protected AdminGetList: () => Promise<any[]>;
    protected AdminSetMe: () => Promise<void>;
    protected AdminSet: (user: number, role: number, assigned: string) => Promise<void>;
    protected AdminIsMe: () => Promise<boolean>;
    protected IDValue: (type: string, value: string) => object;
    protected $Acts: (param: any) => Promise<any>;
    private apiActIX;
    protected ActIX: (param: ParamActIX<any>) => Promise<number[]>;
    protected $ActIX: (param: ParamActIX<any>) => Promise<string>;
    private apiActIxSort;
    protected ActIXSort: (param: ParamActIXSort) => Promise<void>;
    protected $ActIXSort: (param: ParamActIXSort) => Promise<string>;
    protected ActIDProp: (ID: ID, id: number, name: string, value: any) => Promise<void>;
    protected ActID: (param: ParamActID) => Promise<number>;
    protected $ActID: (param: ParamActID) => Promise<string>;
    private apiActID;
    private apiActDetail;
    protected ActDetail: (param: ParamActDetail<any, any>) => Promise<any>;
    protected $ActDetail: (param: ParamActDetail<any, any>) => Promise<any>;
    private apiQueryID;
    protected QueryID: (param: ParamQueryID) => Promise<any[]>;
    protected $QueryID: (param: ParamQueryID) => Promise<any[]>;
    private apiIDTv;
    syncUser(user: number): Promise<any>;
    IDTv: (ids: number[]) => Promise<any[]>;
    protected $IDTv: (ids: number[]) => Promise<any>;
    private apiIDNO;
    protected IDNO: (param: ParamIDNO) => Promise<string>;
    protected IDEntity: (typeId: number) => ID;
    protected $IDNO: (param: ParamIDNO) => Promise<string>;
    private apiIDDetailGet;
    IDDetailGet: (param: ParamIDDetailGet) => Promise<any>;
    protected $IDDetailGet: (param: ParamIDDetailGet) => Promise<any>;
    private IDXToString;
    private apiID;
    private cache;
    private cachePromise;
    protected idObj: (id: number) => Promise<object>;
    protected ID: (param: ParamID) => Promise<any[]>;
    protected $ID: (param: ParamID) => Promise<string>;
    private apiKeyID;
    protected KeyID: (param: ParamKeyID) => Promise<any[]>;
    protected $KeyID: (param: ParamKeyID) => Promise<string>;
    private apiIX;
    protected IX: (param: ParamIX) => Promise<any[]>;
    protected $IX: (param: ParamIX) => Promise<string>;
    private apiIXValues;
    protected IXValues: (param: ParamIXValues) => Promise<any[]>;
    private apiIXr;
    protected IXr: (param: ParamIX) => Promise<any[]>;
    protected $IXr: (param: ParamIX) => Promise<any[]>;
    private apiKeyIX;
    protected KeyIX: (param: ParamKeyIX) => Promise<any[]>;
    protected $KeyIX: (param: ParamKeyIX) => Promise<any[]>;
    private apiIDLog;
    protected IDLog: (param: ParamIDLog) => Promise<any[]>;
    protected $IDLog: (param: ParamIDLog) => Promise<string>;
    private apiIDSum;
    protected IDSum: (param: ParamIDSum) => Promise<any[]>;
    protected $IDSum: (param: ParamIDSum) => Promise<string>;
    private apiIDinIX;
    protected IDinIX: (param: ParamIDinIX) => Promise<any | {
        $in: boolean;
    }[]>;
    protected $IDinIX: (param: ParamIDinIX) => Promise<string>;
    private apiIDxID;
    protected IDxID: (param: ParamIDxID) => Promise<any[]>;
    protected $IDxID: (param: ParamIDxID) => Promise<string>;
    private apiIDTree;
    protected IDTree: (param: ParamIDTree) => Promise<any[]>;
    protected $IDTree: (param: ParamIDTree) => Promise<string>;
}
export {};
