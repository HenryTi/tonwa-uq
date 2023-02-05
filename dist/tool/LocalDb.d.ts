export declare abstract class LocalDb {
    abstract getItem(key: string): string;
    abstract setItem(key: string, value: string): void;
    abstract removeItem(key: string): void;
    createLocalMap(name: string): LocalMap;
}
export declare class LocalMapDb extends LocalDb {
    private readonly map;
    constructor();
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
export declare class LocalCache {
    private readonly local;
    readonly key: string | number;
    constructor(local: Local, key: string | number);
    get(): any;
    set(value: any): void;
    remove(local?: Local): void;
    child(key: string | number): LocalCache;
    arr(key: string | number): LocalArr;
    map(key: string | number): LocalMap;
}
declare abstract class Local {
    private readonly caches;
    private readonly locals;
    protected readonly localDb: LocalDb;
    protected readonly name: string;
    constructor(localDb: LocalDb, name: string);
    protected abstract keyForGet(key: string | number): string;
    protected abstract keyForSet(key: string | number): string;
    protected abstract keyForRemove(key: string | number): string;
    abstract removeAll(): void;
    getItem(key: string | number): string;
    setItem(key: string | number, value: string): void;
    removeItem(key: string | number): void;
    arr(key: string | number): LocalArr;
    map(key: string | number): LocalMap;
    removeLocal(local: Local): void;
    child(key: string | number): LocalCache;
}
export declare class LocalArr extends Local {
    private readonly index;
    constructor(localDb: LocalDb, name: string);
    private saveIndex;
    protected keyForGet(key: number): string;
    protected keyForSet(key: number): string;
    protected keyForRemove(key: number): string;
    removeAll(): void;
    item(index: number): LocalCache;
}
export declare class LocalMap extends Local {
    private readonly index;
    private max;
    constructor(localDb: LocalDb, name: string);
    private saveIndex;
    protected keyForGet(key: number): string;
    protected keyForSet(key: number): string;
    protected keyForRemove(key: string | number): string;
    removeAll(): void;
    item(key: string): LocalCache;
}
export {};
