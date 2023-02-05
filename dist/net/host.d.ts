export interface Hosts {
    center: string;
    uqDebug: string;
    uqs: {
        db: string;
    }[];
    res: string;
}
export declare function buildHosts(center: string, isDevelopment: boolean): Promise<Hosts>;
