"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = exports.UqHistory = void 0;
var query_1 = require("./query");
var UqHistory = /** @class */ (function (_super) {
    __extends(UqHistory, _super);
    function UqHistory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryApiName = 'history';
        return _this;
    }
    Object.defineProperty(UqHistory.prototype, "typeName", {
        get: function () { return 'history'; },
        enumerable: false,
        configurable: true
    });
    return UqHistory;
}(query_1.UqQuery));
exports.UqHistory = UqHistory;
var History = /** @class */ (function (_super) {
    __extends(History, _super);
    function History() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return History;
}(UqHistory));
exports.History = History;
//# sourceMappingURL=history.js.map