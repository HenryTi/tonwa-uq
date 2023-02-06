export class Caller {
    _params;
    constructor(params, $$user = undefined, waiting) {
        this._params = params;
        this.$$user = $$user;
        this.waiting = waiting;
    }
    $$user;
    get params() { return this._params; }
    buildParams() { return this.params; }
    method = 'POST';
    get headers() { return undefined; }
    waiting;
}
//# sourceMappingURL=caller.js.map