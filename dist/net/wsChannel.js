let subAppWindow; // Window;
function postWsToSubApp(msg) {
    if (subAppWindow === undefined)
        return;
    subAppWindow.postMessage({
        type: 'ws',
        msg: msg
    }, '*');
}
export function setSubAppWindow(win) {
    subAppWindow = win;
}
export function postWsToTop(msg) {
    window.top.postMessage({
        type: 'ws',
        msg: msg
    }, '*');
}
export class WsBase {
    net;
    constructor(net) {
        this.net = net;
    }
    async receive(msg) {
        this.net.messageHub.dispatch(msg);
    }
}
let wsBaseSeed = 1;
export class WsBridge extends WsBase {
    wsBaseId = 'WsBridge seed ' + wsBaseSeed++;
}
export class WSChannel extends WsBase {
    wsBaseId = 'WSChannel seed ' + wsBaseSeed++;
    static centerToken;
    wsHost;
    token;
    ws;
    constructor(net, wsHost, token) {
        super(net);
        this.wsHost = wsHost;
        this.token = token;
    }
    static setCenterToken(token) {
        WSChannel.centerToken = token;
    }
    connect() {
        //this.wsHost = wsHost;
        //this.token = token || WSChannel.centerToken;
        if (this.ws !== undefined)
            return;
        let that = this;
        return new Promise((resolve, reject) => {
            let ws = new WebSocket(this.wsHost, this.token || WSChannel.centerToken);
            console.log('connect webSocket %s', this.wsHost);
            ws.onopen = (ev) => {
                console.log('webSocket connected %s', this.wsHost);
                that.ws = ws;
                resolve();
            };
            ws.onerror = (ev) => {
                reject('webSocket can\'t open!');
            };
            ws.onmessage = async (msg) => await that.wsMessage(msg);
            ws.onclose = (ev) => {
                that.ws = undefined;
                console.log('webSocket closed!');
            };
        });
    }
    close() {
        if (this.ws !== undefined) {
            this.ws.close();
            this.ws = undefined;
        }
    }
    async wsMessage(event) {
        try {
            console.log('websocket message: %s', event.data);
            let msg = JSON.parse(event.data);
            postWsToSubApp(msg);
            await this.receive(msg);
        }
        catch (err) {
            console.log('ws msg error: ', err);
        }
    }
    sendWs(msg) {
        let netThis = this;
        this.connect().then(() => {
            netThis.ws.send(msg);
        });
    }
}
//# sourceMappingURL=wsChannel.js.map