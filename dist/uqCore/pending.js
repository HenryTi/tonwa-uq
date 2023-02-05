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
exports.Pending = exports.UqPending = void 0;
var query_1 = require("./query");
var UqPending = /** @class */ (function (_super) {
    __extends(UqPending, _super);
    function UqPending() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryApiName = 'pending';
        return _this;
    }
    Object.defineProperty(UqPending.prototype, "typeName", {
        get: function () { return 'pending'; },
        enumerable: false,
        configurable: true
    });
    return UqPending;
}(query_1.UqQuery));
exports.UqPending = UqPending;
var Pending = /** @class */ (function (_super) {
    __extends(Pending, _super);
    function Pending() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Pending;
}(UqPending));
exports.Pending = Pending;
//# sourceMappingURL=pending.js.map