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
exports.LocalMap = exports.LocalArr = exports.LocalCache = exports.LocalMapDb = exports.LocalDb = void 0;
var LocalDb = /** @class */ (function () {
    function LocalDb() {
    }
    LocalDb.prototype.createLocalMap = function (name) {
        return new LocalMap(this, name);
    };
    return LocalDb;
}());
exports.LocalDb = LocalDb;
var LocalMapDb = /** @class */ (function (_super) {
    __extends(LocalMapDb, _super);
    function LocalMapDb() {
        var _this = _super.call(this) || this;
        _this.map = new Map();
        return _this;
    }
    LocalMapDb.prototype.getItem = function (key) {
        return this.map.get(key);
    };
    LocalMapDb.prototype.setItem = function (key, value) {
        this.map.set(key, value);
    };
    LocalMapDb.prototype.removeItem = function (key) {
        this.map.delete(key);
    };
    return LocalMapDb;
}(LocalDb));
exports.LocalMapDb = LocalMapDb;
// const __ls = new _LocalStorage(); // new Ls;
var LocalCache = /** @class */ (function () {
    function LocalCache(local, key) {
        this.local = local;
        this.key = key;
    }
    LocalCache.prototype.get = function () {
        try {
            // 下面缓冲的内容不能有，可能会被修改，造成circular引用
            //if (this.value !== undefined) return this.value;
            var text = this.local.getItem(this.key);
            if (text === null)
                return;
            if (text === undefined)
                return undefined;
            //return this.value = 
            return JSON.parse(text);
        }
        catch (err) {
            this.local.removeItem(this.key);
            return;
        }
    };
    LocalCache.prototype.set = function (value) {
        var t = JSON.stringify(value, function (key, value) {
            if (key !== '_tuid')
                return value;
        });
        this.local.setItem(this.key, t);
    };
    LocalCache.prototype.remove = function (local) {
        if (local === undefined) {
            this.local.removeItem(this.key);
        }
        else {
            this.local.removeLocal(local);
        }
    };
    LocalCache.prototype.child = function (key) {
        return this.local.child(key);
    };
    LocalCache.prototype.arr = function (key) {
        return this.local.arr(key);
    };
    LocalCache.prototype.map = function (key) {
        return this.local.map(key);
    };
    return LocalCache;
}());
exports.LocalCache = LocalCache;
var Local = /** @class */ (function () {
    function Local(localDb, name) {
        this.localDb = localDb;
        this.name = name;
        this.caches = {};
        this.locals = {};
    }
    Local.prototype.getItem = function (key) {
        var k = this.keyForGet(key);
        if (k === undefined)
            return;
        return this.localDb.getItem(k);
    };
    Local.prototype.setItem = function (key, value) {
        var k = this.keyForSet(key);
        this.localDb.setItem(k, value);
    };
    Local.prototype.removeItem = function (key) {
        var k = this.keyForSet(key);
        if (k === undefined)
            return;
        localStorage.removeItem(k);
    };
    Local.prototype.arr = function (key) {
        var sk = String(key);
        var arr = this.locals[sk];
        if (arr === undefined) {
            var k = this.keyForSet(key);
            this.locals[sk] = arr = new LocalArr(this.localDb, k);
        }
        return arr;
    };
    Local.prototype.map = function (key) {
        var sk = String(key);
        var map = this.locals[sk];
        if (map === undefined) {
            var k = this.keyForSet(key);
            this.locals[sk] = map = new LocalMap(this.localDb, k);
        }
        return map;
    };
    Local.prototype.removeLocal = function (local) {
        var sk = local.name;
        var k = this.keyForRemove(sk);
        if (k === undefined)
            return;
        var arr = this.locals[sk];
        if (arr === undefined)
            arr = new LocalArr(this.localDb, k);
        else
            this.locals[sk] = undefined;
        arr.removeAll();
    };
    Local.prototype.child = function (key) {
        var ks = String(key);
        var ret = this.caches[ks];
        if (ret !== undefined)
            return ret;
        return this.caches[ks] = ret = new LocalCache(this, key);
    };
    return Local;
}());
var maxArrSize = 500;
var LocalArr = /** @class */ (function (_super) {
    __extends(LocalArr, _super);
    function LocalArr(localDb, name) {
        var _this = _super.call(this, localDb, name) || this;
        var index = _this.localDb.getItem(_this.name);
        if (index) {
            _this.index = index.split('\n').map(function (v) { return Number(v); });
        }
        else {
            _this.index = [];
        }
        return _this;
    }
    LocalArr.prototype.saveIndex = function () {
        this.localDb.setItem(this.name, this.index.join('\n'));
    };
    LocalArr.prototype.keyForGet = function (key) {
        var i = this.index.indexOf(key);
        if (i < 0)
            return undefined;
        return "".concat(this.name, ".").concat(key);
    };
    LocalArr.prototype.keyForSet = function (key) {
        var i = this.index.indexOf(key);
        if (i < 0) {
            this.index.unshift(key);
            if (this.index.length > maxArrSize)
                this.index.pop();
        }
        else {
            this.index.splice(i, 1);
            this.index.unshift(key);
        }
        this.saveIndex();
        return "".concat(this.name, ".").concat(key);
    };
    LocalArr.prototype.keyForRemove = function (key) {
        var i = this.index.indexOf(key);
        if (i < 0)
            return;
        this.index.splice(i, 1);
        this.saveIndex();
        return "".concat(this.name, ".").concat(key);
    };
    LocalArr.prototype.removeAll = function () {
        for (var _i = 0, _a = this.index; _i < _a.length; _i++) {
            var i = _a[_i];
            this.localDb.removeItem("".concat(this.name, ".").concat(i));
        }
        this.localDb.removeItem(this.name);
        this.index.splice(0);
    };
    LocalArr.prototype.item = function (index) {
        return this.child(index);
    };
    return LocalArr;
}(Local));
exports.LocalArr = LocalArr;
var LocalMap = /** @class */ (function (_super) {
    __extends(LocalMap, _super);
    function LocalMap(localDb, name) {
        var _this = _super.call(this, localDb, name) || this;
        _this.max = 0;
        _this.index = {};
        var index = _this.localDb.getItem(_this.name);
        if (index) {
            var ls = index.split('\n');
            ls.forEach(function (l) {
                var p = l.indexOf('\t');
                if (p < 0)
                    return;
                var key = l.substr(0, p);
                var i = Number(l.substr(p + 1));
                if (isNaN(i) === true)
                    return;
                _this.index[key] = i;
                if (i > _this.max)
                    _this.max = i;
            });
        }
        return _this;
    }
    LocalMap.prototype.saveIndex = function () {
        var ls = [];
        for (var k in this.index) {
            var v = this.index[k];
            if (v === undefined)
                continue;
            ls.push("".concat(k, "\t").concat(v));
        }
        this.localDb.setItem(this.name, ls.join('\n'));
    };
    LocalMap.prototype.keyForGet = function (key) {
        var i = this.index[key];
        if (i === undefined)
            return undefined;
        return "".concat(this.name, ".").concat(i);
    };
    LocalMap.prototype.keyForSet = function (key) {
        var i = this.index[key];
        if (i === undefined) {
            ++this.max;
            i = this.max;
            this.index[key] = i;
            this.saveIndex();
        }
        return "".concat(this.name, ".").concat(i);
    };
    LocalMap.prototype.keyForRemove = function (key) {
        var i = this.index[key];
        if (i === undefined)
            return;
        this.index[key] = undefined;
        this.saveIndex();
        return "".concat(this.name, ".").concat(i);
    };
    LocalMap.prototype.removeAll = function () {
        for (var i in this.index) {
            this.localDb.removeItem("".concat(this.name, ".").concat(this.index[i]));
            this.index[i] = undefined;
        }
        this.localDb.removeItem(this.name);
        this.max = 0;
    };
    LocalMap.prototype.item = function (key) {
        return this.child(key);
    };
    return LocalMap;
}(Local));
exports.LocalMap = LocalMap;
//# sourceMappingURL=LocalDb.js.map