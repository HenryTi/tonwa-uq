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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApi = void 0;
var uqApi_1 = require("./uqApi");
var tool_1 = require("../tool");
;
var UserApi = /** @class */ (function (_super) {
    __extends(UserApi, _super);
    function UserApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserApi.prototype.login = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, token, user, nick, icon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('user/login', params)];
                    case 1:
                        ret = _a.sent();
                        switch (typeof ret) {
                            default: return [2 /*return*/];
                            case 'string': return [2 /*return*/, (0, tool_1.decodeUserToken)(ret)];
                            case 'object':
                                token = ret.token;
                                user = (0, tool_1.decodeUserToken)(token);
                                nick = ret.nick, icon = ret.icon;
                                if (nick)
                                    user.nick = nick;
                                if (icon)
                                    user.icon = icon;
                                return [2 /*return*/, user];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApi.prototype.register = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('user/register', params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.changePassword = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tie/change-password', param)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.sendVerify = function (account, type, oem) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('user/set-verify', { account: account, type: type, oem: oem })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.checkVerify = function (account, verify) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('user/check-verify', { account: account, verify: verify })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.isExists = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('user/is-exists', { account: account })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.resetPassword = function (account, password, verify, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('user/reset-password', { account: account, password: password, verify: verify, type: type })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.userSetProp = function (prop, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tie/user-set-prop', { prop: prop, value: value })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApi.prototype.me = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/me')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.user = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/user', { id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.fromKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/user-from-key', { key: key })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.guest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, guest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('guest/', {})];
                    case 1:
                        ret = _a.sent();
                        switch (typeof ret) {
                            default: return [2 /*return*/];
                            case 'string': return [2 /*return*/, (0, tool_1.decodeGuestToken)(ret)];
                            case 'object':
                                guest = (0, tool_1.decodeGuestToken)(ret.token);
                                return [2 /*return*/, guest];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApi.prototype.userQuit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/user-ask-quit', {})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApi.prototype.userAppUnits = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/user-app-units', { app: app })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.userFromKey = function (userName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/user-from-key', { key: userName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.userFromId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('user/user-name-nick-icon-from-id', { userId: userId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.userFromName = function (userName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/user-from-key', { key: userName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.usersFromEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/users-from-email', { email: email })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.userFromMobile = function (mobile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/users-from-mobile', { mobile: mobile })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserApi;
}(uqApi_1.CenterApiBase));
exports.UserApi = UserApi;
//# sourceMappingURL=userApi.js.map