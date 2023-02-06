export var EnumSysRole;
(function (EnumSysRole) {
    EnumSysRole[EnumSysRole["admin"] = 1] = "admin";
    EnumSysRole[EnumSysRole["owner"] = 2] = "owner";
})(EnumSysRole || (EnumSysRole = {}));
export class UqUnit {
    uqMan;
    myUnitsColl;
    userUnit0; // the root uq unit = 0;
    myUnits;
    userUnit; // current unit;
    constructor(uqMan) {
        this.uqMan = uqMan;
    }
    loginUnit(userUnit) {
        this.userUnit = userUnit; // 每次只允许一个unit展示
    }
    logoutUnit() {
        this.userUnit = this.userUnit0;
    }
    hasRole(role) {
        if (this.userUnit === undefined)
            return false;
        let { roles, isAdmin } = this.userUnit;
        if (isAdmin === true)
            return true;
        if (roles === undefined)
            return false;
        if (Array.isArray(role) === true) {
            let arr = role;
            for (let item of arr) {
                let ret = roles.indexOf(item) >= 0;
                if (ret === true)
                    return true;
            }
            return false;
        }
        else {
            return roles.indexOf(role) >= 0;
        }
    }
    async Poked() {
        let query = this.uqMan.entities['$poked'];
        let ret = await query.query({});
        let arr = ret.ret;
        if (arr.length === 0)
            return false;
        let row = arr[0];
        return row["poke"] === 1;
    }
    async reloadMyRoles() {
        this.myUnitsColl = undefined;
        await this.loadMyRoles();
    }
    async loadMyRoles() {
        if (this.myUnitsColl !== undefined)
            return;
        this.myUnits = [];
        this.myUnitsColl = {};
        let query = this.uqMan.entities['$role_my'];
        let { admins, roles, unitProps } = await query.query({});
        const getMyUnit = (unit) => {
            let myUnit = this.myUnitsColl[unit];
            if (myUnit === undefined) {
                myUnit = {
                    unit,
                };
                this.myUnitsColl[unit] = myUnit;
                this.myUnits.push(myUnit);
            }
            return myUnit;
        };
        for (let adminRow of admins) {
            let { id, unit, admin, entity, assigned } = adminRow;
            let myUnit = getMyUnit(unit);
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
        for (let roleRow of roles) {
            let { unit, role } = roleRow;
            let myUnit = getMyUnit(unit);
            let roles = myUnit.roles;
            if (roles === undefined) {
                myUnit.roles = roles = [];
            }
            roles.push(role);
        }
        for (let propsRow of unitProps) {
            let { unit, props } = propsRow;
            let myUnit = getMyUnit(unit);
            let ID = this.uqMan.getID(myUnit.entity);
            myUnit.unit = ID.valueFromString(props);
        }
    }
    async loadUnitUsers() {
        let owners = [];
        let admins = [];
        let coll = {};
        let query = this.uqMan.entities['$role_unit_users'];
        let { users: userRows, roles: roleRows } = await query.query({ unit: this.userUnit.unit });
        let users = [];
        for (let userRow of userRows) {
            let { user, admin } = userRow;
            coll[user] = userRow;
            let isAdmin = userRow.isAdmin = ((admin & 1) === 1);
            let isOwner = userRow.isOwner = ((admin & 2) === 2);
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
        let rolesColl = {};
        let usersOfRole = {};
        for (let roleRow of roleRows) {
            let { user, role } = roleRow;
            let userUnit = coll[user];
            if (userUnit !== undefined) {
                let { roles: roleArr } = userUnit;
                if (roleArr === undefined) {
                    userUnit.roles = roleArr = [];
                }
                roleArr.push(role);
            }
            let roleUsers = rolesColl[role];
            if (roleUsers === undefined) {
                rolesColl[role] = roleUsers = [];
                usersOfRole[role] = roleUsers;
            }
            roleUsers.push(userUnit);
        }
        return { /*meOwner, meAdmin, */ owners, admins, users, usersOfRole };
    }
    async addAdmin(user, admin, assigned) {
        let act = this.uqMan.entities['$role_unit_add_admin'];
        await act.submit({
            unit: this.userUnit.unitId,
            user,
            admin,
            assigned,
        });
        return await this.uqMan.syncUser(user);
    }
    async addUser(user, assigned) {
        let act = this.uqMan.entities['$role_unit_add_user'];
        await act.submit({
            unit: this.userUnit.unitId,
            user,
            assigned,
        });
        return await this.uqMan.syncUser(user);
    }
    async setUserRole(user, action, role) {
        let act = this.uqMan.entities['$role_unit_user_role'];
        await act.submit({
            unit: this.userUnit.unitId,
            user,
            action,
            role
        });
    }
    async quitOwner() {
        let act = this.uqMan.entities['$role_unit_quit_owner'];
        await act.submit({
            unit: this.userUnit.unitId,
        });
    }
    async delAdmin(user, admin) {
        let act = this.uqMan.entities['$role_unit_del_admin'];
        await act.submit({
            unit: this.userUnit.unitId,
            user,
            admin,
        });
    }
}
//# sourceMappingURL=uqUnit.js.map