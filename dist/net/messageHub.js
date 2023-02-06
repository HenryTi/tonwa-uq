export class MessageHub {
    net;
    constructor(net) {
        this.net = net;
    }
    handlerSeed = 1;
    anyHandlers = {};
    msgHandlers = {};
    registerReceiveHandler(...args) {
        let seed = this.handlerSeed++;
        let args0 = args[0];
        let handler;
        switch (typeof args0) {
            case 'string':
                handler = args[1];
                this.msgHandlers[seed] = { type: args0, handler };
                break;
            case 'function':
                this.anyHandlers[seed] = args0;
                break;
        }
        return seed;
    }
    unregisterReceiveHandler(handlerId) {
        delete this.anyHandlers[handlerId];
        delete this.msgHandlers[handlerId];
    }
    async dispatch(msg) {
        let { $type } = msg;
        for (let i in this.anyHandlers) {
            await this.anyHandlers[i](msg);
        }
        for (let i in this.msgHandlers) {
            let { type, handler } = this.msgHandlers[i];
            if (type !== $type)
                continue;
            await handler(msg);
        }
    }
}
//# sourceMappingURL=messageHub.js.map