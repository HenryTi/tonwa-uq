"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCase = exports.capitalCase = void 0;
function capitalCase(s) {
    var parts = s.split(/[-._]/);
    return parts.map(function (v) { return firstCharUppercase(v); }).join('_');
}
exports.capitalCase = capitalCase;
function camelCase(s) {
    var parts = s.split(/[-._]/);
    var len = parts.length;
    parts[0] = firstCharLowercase(parts[0]);
    for (var i = 1; i < len; i++) {
        parts[1] = firstCharUppercase(parts[1]);
    }
    return parts.join('_');
}
exports.camelCase = camelCase;
var aCode = 'a'.charCodeAt(0);
var zCode = 'z'.charCodeAt(0);
function firstCharUppercase(s) {
    if (!s)
        return '';
    var c = s.charCodeAt(0);
    if (c >= aCode && c <= zCode) {
        return String.fromCharCode(c - 0x20) + s.substr(1);
    }
    return s;
}
var ACode = 'A'.charCodeAt(0);
var ZCode = 'Z'.charCodeAt(0);
function firstCharLowercase(s) {
    if (!s)
        return '';
    var c = s.charCodeAt(0);
    if (c >= ACode && c <= ZCode) {
        return String.fromCharCode(c + 0x20) + s.substr(1);
    }
    return s;
}
//# sourceMappingURL=caseString.js.map