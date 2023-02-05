"use strict";
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
exports.UqUnit = exports.EnumSysRole = void 0;
var EnumSysRole;
(function (EnumSysRole) {
    EnumSysRole[EnumSysRole["admin"] = 1] = "admin";
    EnumSysRole[EnumSysRole["owner"] = 2] = "owner";
})(EnumSysRole = exports.EnumSysRole || (exports.EnumSysRole = {}));
var UqUnit = /** @class */ (function () {
    function UqUnit(uqMan) {
        this.uqMan = uqMan;
    }
    UqUnit.prototype.loginUnit = function (userUnit) {
        this.userUnit = userUnit; // 每次只允许一个unit展示
    };
    UqUnit.prototype.logoutUnit = function () {
        this.userUnit = this.userUnit0;
    };
    UqUnit.prototype.hasRole = function (role) {
        if (this.userUnit === undefined)
            return false;
        var _a = this.userUnit, roles = _a.roles, isAdmin = _a.isAdmin;
        if (isAdmin === true)
            return true;
        if (roles === undefined)
            return false;
        if (Array.isArray(role) === true) {
            var arr = role;
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var item = arr_1[_i];
                var ret = roles.indexOf(item) >= 0;
                if (ret === true)
                    return true;
            }
            return false;
        }
        else {
            return roles.indexOf(role) >= 0;
        }
    };
    UqUnit.prototype.Poked = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, ret, arr, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.uqMan.entities['$poked'];
                        return [4 /*yield*/, query.query({})];
                    case 1:
                        ret = _a.sent();
                        arr = ret.ret;
                        if (arr.length === 0)
                            return [2 /*return*/, false];
                        row = arr[0];
                        return [2 /*return*/, row["poke"] === 1];
                }
            });
        });
    };
    UqUnit.prototype.reloadMyRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.myUnitsColl = undefined;
                        return [4 /*yield*/, this.loadMyRoles()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UqUnit.prototype.loadMyRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, admins, roles, unitProps, getMyUnit, _i, admins_1, adminRow, id, unit, admin, entity, assigned, myUnit, _b, roles_1, roleRow, unit, role, myUnit, roles_2, _c, unitProps_1, propsRow, unit, props, myUnit, ID;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.myUnitsColl !== undefined)
                            return [2 /*return*/];
                        this.myUnits = [];
                        this.myUnitsColl = {};
                        query = this.uqMan.entities['$role_my'];
                        return [4 /*yield*/, query.query({})];
                    case 1:
                        _a = _d.sent(), admins = _a.admins, roles = _a.roles, unitProps = _a.unitProps;
                        getMyUnit = function (unit) {
                            var myUnit = _this.myUnitsColl[unit];
                            if (myUnit === undefined) {
                                myUnit = {
                                    unit: unit,
                                };
                                _this.myUnitsColl[unit] = myUnit;
                                _this.myUnits.push(myUnit);
                            }
                            return myUnit;
                        };
                        for (_i = 0, admins_1 = admins; _i < admins_1.length; _i++) {
                            adminRow = admins_1[_i];
                            id = adminRow.id, unit = adminRow.unit, admin = adminRow.admin, entity = adminRow.entity, assigned = adminRow.assigned;
                            myUnit = getMyUnit(unit);
                            myUnit.id = id;
                            myUnit.unitId = unit;
                            myUnit.isAdmin = ((admin & 1) === 1);
                            myUnit.isOwner = ((admin & 2) === 2);
                            myUnit.entity = entity;
                            myUnit.assigned = assigned;
                            if (unit === 0) {
                                this.userUnit0 = myUnit;
                                if (this.userUnit === undefined)
                                    this.userUnit = myUnit;
                            }
                        }
                        for (_b = 0, roles_1 = roles; _b < roles_1.length; _b++) {
                            roleRow = roles_1[_b];
                            unit = roleRow.unit, role = roleRow.role;
                            myUnit = getMyUnit(unit);
                            roles_2 = myUnit.roles;
                            if (roles_2 === undefined) {
                                myUnit.roles = roles_2 = [];
                            }
                            roles_2.push(role);
                        }
                        for (_c = 0, unitProps_1 = unitProps; _c < unitProps_1.length; _c++) {
                            propsRow = unitProps_1[_c];
                            unit = propsRow.unit, props = propsRow.props;
                            myUnit = getMyUnit(unit);
                            ID = this.uqMan.getID(myUnit.entity);
                            myUnit.unit = ID.valueFromString(props);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UqUnit.prototype.loadUnitUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var owners, admins, coll, query, _a, userRows, roleRows, users, _i, userRows_1, userRow, user, admin, isAdmin, isOwner, rolesColl, usersOfRole, _b, roleRows_1, roleRow, user, role, userUnit, roleArr, roleUsers;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        owners = [];
                        admins = [];
                        coll = {};
                        query = this.uqMan.entities['$role_unit_users'];
                        return [4 /*yield*/, query.query({ unit: this.userUnit.unit })];
                    case 1:
                        _a = _c.sent(), userRows = _a.users, roleRows = _a.roles;
                        users = [];
                        for (_i = 0, userRows_1 = userRows; _i < userRows_1.length; _i++) {
                            userRow = userRows_1[_i];
                            user = userRow.user, admin = userRow.admin;
                            coll[user] = userRow;
                            isAdmin = userRow.isAdmin = ((admin & 1) === 1);
                            isOwner = userRow.isOwner = ((admin & 2) === 2);
                            /*
                            if (user === me) {
                                if (isOwner === true) meOwner = true;
                                else if (isAdmin === true) meAdmin = true;
                            }
                            else {
                            */
                            if (isOwner === true)
                                owners.push(userRow);
                            else if (isAdmin === true)
                                admins.push(userRow);
                            else
                                users.push(userRow);
                            //}
                        }
                        rolesColl = {};
                        usersOfRole = {};
                        for (_b = 0, roleRows_1 = roleRows; _b < roleRows_1.length; _b++) {
                            roleRow = roleRows_1[_b];
                            user = roleRow.user, role = roleRow.role;
                            userUnit = coll[user];
                            if (userUnit !== undefined) {
                                roleArr = userUnit.roles;
                                if (roleArr === undefined) {
                                    userUnit.roles = roleArr = [];
                                }
                                roleArr.push(role);
                            }
                            roleUsers = rolesColl[role];
                            if (roleUsers === undefined) {
                                rolesColl[role] = roleUsers = [];
                                usersOfRole[role] = roleUsers;
                            }
                            roleUsers.push(userUnit);
                        }
                        return [2 /*return*/, { /*meOwner, meAdmin, */ owners: owners, admins: admins, users: users, usersOfRole: usersOfRole }];
                }
            });
        });
    };
    UqUnit.prototype.addAdmin = function (user, admin, assigned) {
        return __awaiter(this, void 0, void 0, function () {
            var act;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        act = this.uqMan.entities['$role_unit_add_admin'];
                        return [4 /*yield*/, act.submit({
                                unit: this.userUnit.unitId,
                                user: user,
                                admin: admin,
                                assigned: assigned,
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.uqMan.syncUser(user)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqUnit.prototype.addUser = function (user, assigned) {
        return __awaiter(this, void 0, void 0, function () {
            var act;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        act = this.uqMan.entities['$role_unit_add_user'];
                        return [4 /*yield*/, act.submit({
                                unit: this.userUnit.unitId,
                                user: user,
                                assigned: assigned,
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.uqMan.syncUser(user)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqUnit.prototype.setUserRole = function (user, action, role) {
        return __awaiter(this, void 0, void 0, function () {
            var act;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        act = this.uqMan.entities['$role_unit_user_role'];
                        return [4 /*yield*/, act.submit({
                                unit: this.userUnit.unitId,
                                user: user,
                                action: action,
                                role: role
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UqUnit.prototype.quitOwner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var act;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        act = this.uqMan.entities['$role_unit_quit_owner'];
                        return [4 /*yield*/, act.submit({
                                unit: this.userUnit.unitId,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UqUnit.prototype.delAdmin = function (user, admin) {
        return __awaiter(this, void 0, void 0, function () {
            var act;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        act = this.uqMan.entities['$role_unit_del_admin'];
                        return [4 /*yield*/, act.submit({
                                unit: this.userUnit.unitId,
                                user: user,
                                admin: admin,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UqUnit;
}());
exports.UqUnit = UqUnit;
//# sourceMappingURL=uqUnit.js.map