export async function refetchApi(channel, url, options, resolve, reject) {
    await channel.fetch(url, options, resolve, reject);
}
export class ApiBase {
    net;
    path;
    constructor(net, path) {
        this.net = net;
        this.path = path || '';
    }
    customHeader() {
        return undefined;
    }
    async xcall(caller) {
        let channel = await this.getHttpChannel();
        return await channel.xcall(this.path, caller);
    }
    async call(url, method, body) {
        let channel = await this.getHttpChannel();
        return await channel.callFetch(url, method, body);
    }
    async get(path, params = undefined) {
        let channel = await this.getHttpChannel();
        return await channel.get(this.path + path, params, this.customHeader());
    }
    async post(path, params) {
        let channel = await this.getHttpChannel();
        return await channel.post(this.path + path, params, this.customHeader());
    }
    async put(path, params) {
        let channel = await this.getHttpChannel();
        return await channel.put(this.path + path, params, this.customHeader());
    }
    async delete(path, params) {
        let channel = await this.getHttpChannel();
        return await channel.delete(this.path + path, params, this.customHeader());
    }
}
//# sourceMappingURL=apiBase.js.map