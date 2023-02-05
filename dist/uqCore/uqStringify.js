"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uqStringify = void 0;
function uqStringify(values) {
    var s = '{';
    if (values === undefined)
        return 'undefined';
    for (var i in values) {
        var v = values[i];
        s += i + ': ';
        if (v === undefined) {
            s += 'undefined';
        }
        else if (v === null) {
            s += 'null';
        }
        else {
            switch (typeof v) {
                default:
                    s += v;
                    break;
                case 'function':
                    s += 'function';
                    break;
                case 'object':
                    s += '{obj}';
                    break;
            }
        }
        s += ', ';
    }
    return s + '}';
}
exports.uqStringify = uqStringify;
//# sourceMappingURL=uqStringify.js.map