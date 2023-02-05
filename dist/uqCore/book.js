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
exports.BookQueryCaller = exports.Book = exports.UqBook = void 0;
var query_1 = require("./query");
var caller_1 = require("./caller");
var UqBook = /** @class */ (function (_super) {
    __extends(UqBook, _super);
    function UqBook() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryApiName = 'book';
        return _this;
    }
    Object.defineProperty(UqBook.prototype, "typeName", {
        get: function () { return 'book'; },
        enumerable: false,
        configurable: true
    });
    UqBook.prototype.queryCaller = function (params) {
        return new BookQueryCaller(this, params);
    };
    return UqBook;
}(query_1.UqQuery));
exports.UqBook = UqBook;
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Book;
}(UqBook));
exports.Book = Book;
var BookQueryCaller = /** @class */ (function (_super) {
    __extends(BookQueryCaller, _super);
    function BookQueryCaller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BookQueryCaller.prototype, "path", {
        get: function () { return "book/".concat(this.entity.name); },
        enumerable: false,
        configurable: true
    });
    return BookQueryCaller;
}(caller_1.QueryQueryCaller));
exports.BookQueryCaller = BookQueryCaller;
//# sourceMappingURL=book.js.map