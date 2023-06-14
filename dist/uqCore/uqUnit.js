import { atom } from "jotai";
import { getAtomValue, setAtomValue } from "../tool/atom";
export var EnumSysRole;
(function (EnumSysRole) {
    EnumSysRole[EnumSysRole["admin"] = 1] = "admin";
    EnumSysRole[EnumSysRole["owner"] = 2] = "owner";
})(EnumSysRole || (EnumSysRole = {}));
export class UqUnit {
    uqMan;
    mySitesColl;
    userUnit0; // the root uq unit = 0;
    mySites;
    userUnit; // current unit;
    constructor(uqMan) {
        this.uqMan = uqMan;
    }
    async login() {
        await this.loadMyRoles();
    }
    loginUnit(userUnit) {
        this.userUnit = userUnit; // 每次只允许一个unit展示
    }
    logoutUnit() {
        this.userUnit = undefined; // this.userUnit0;
    }
    hasRole(role) {
        if (this.userUnit === undefined)
            return false;
        let { rolesAtom, isAdmin } = this.userUnit;
        if (isAdmin === true)
            return true;
        if (rolesAtom === undefined)
            return false;
        let roles = getAtomValue(rolesAtom);
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
        this.mySitesColl = undefined;
        await this.loadMyRoles();
    }
    async setSite(site) {
        let act = this.uqMan.entities['$setsite'];
        await act.submit({ site });
        await this.reloadMyRoles();
    }
    async loadMyRoles() {
        if (this.mySitesColl !== undefined)
            return;
        this.mySites = [];
        this.mySitesColl = {};
        let query = this.uqMan.entities['$role_my'];
        let results = await query.query({});
        let { sites, roles, permits } = results;
        const getMySite = (site) => {
            let mySite = this.mySitesColl[site];
            if (mySite === undefined) {
                mySite = {
                    unit: site,
                    rolesAtom: atom([]),
                    permits: {},
                };
                this.mySitesColl[site] = mySite;
                if (site !== 0) {
                    this.mySites.push(mySite);
                }
                else {
                    this.userUnit0 = mySite;
                }
            }
            return mySite;
        };
        let userUnitDef;
        for (let siteRow of sites) {
            let { id, site, admin, entity, assigned, def } = siteRow;
            let mySite = getMySite(site);
            mySite.id = id;
            mySite.unitId = site;
            mySite.isAdmin = ((admin & 1) === 1);
            mySite.isOwner = ((admin & 2) === 2);
            mySite.entity = entity;
            mySite.assigned = assigned;
            if (userUnitDef === undefined && mySite !== this.userUnit0) {
                userUnitDef = mySite;
            }
            if (def === 1) {
                userUnitDef = mySite;
            }
        }
        this.userUnit = userUnitDef;
        if (userUnitDef !== undefined) {
            let i = this.mySites.findIndex(v => v === userUnitDef);
            if (i >= 0) {
                this.mySites.splice(i, 1);
                this.mySites.unshift(userUnitDef);
            }
        }
        for (let roleRow of roles) {
            let { site, role } = roleRow;
            let mySite = getMySite(site);
            let { rolesAtom } = mySite;
            let roles = getAtomValue(rolesAtom);
            if (roles === undefined) {
                roles = [];
            }
            roles.push(role);
            setAtomValue(rolesAtom, roles);
            mySite.permits[role] = true;
        }
        for (let permitRow of permits) {
            let { site, permit } = permitRow;
            let mySite = getMySite(site);
            mySite.permits[permit] = true;
        }
    }
    async loadUnitUsers() {
        let owners = [];
        let admins = [];
        let coll = {};
        let query = this.uqMan.entities['$role_site_users'];
        let result = await query.query({ site: this.userUnit.unitId });
        if (result === undefined)
            return;
        let { users: userRows, roles: roleRows } = result;
        let users = [];
        for (let userRow of userRows) {
            let userUnit = { ...userRow, rolesAtom: atom([]), permits: {} };
            let { id, admin } = userRow;
            coll[id] = userUnit;
            let isAdmin = userUnit.isAdmin = ((admin & 1) === 1);
            let isOwner = userUnit.isOwner = ((admin & 2) === 2);
            if (isOwner === true)
                owners.push(userUnit);
            else if (isAdmin === true)
                admins.push(userUnit);
            else
                users.push(userUnit);
        }
        let rolesColl = {};
        let usersOfRole = {};
        for (let roleRow of roleRows) {
            let { user, role } = roleRow;
            let userUnit = coll[user];
            if (userUnit !== undefined) {
                let { rolesAtom } = userUnit;
                let roleArr = getAtomValue(rolesAtom);
                if (roleArr === undefined)
                    roleArr = [];
                roleArr.push(role);
                setAtomValue(rolesAtom, roleArr);
            }
            let roleUsers = rolesColl[role];
            if (roleUsers === undefined) {
                rolesColl[role] = roleUsers = [];
                usersOfRole[role] = roleUsers;
            }
            roleUsers.push(userUnit);
        }
        return { owners, admins, users, usersOfRole };
    }
    async addAdmin(user, admin, assigned) {
        let act = this.uqMan.entities['$role_site_add_admin'];
        await act.submit({
            site: this.userUnit.unitId,
            user,
            admin,
            assigned,
        });
        return await this.uqMan.syncUser(user);
    }
    async addUser(user, assigned) {
        let act = this.uqMan.entities['$role_site_add_user'];
        await act.submit({
            site: this.userUnit.unitId,
            user,
            assigned,
        });
        return await this.uqMan.syncUser(user);
    }
    async setUserRole(user, role, on) {
        let action = on === true ? 'add' : 'del';
        let act = this.uqMan.entities['$role_site_user_role'];
        await act.submit({
            site: this.userUnit.unitId,
            user,
            action,
            role
        });
    }
    async clearUserRole(user) {
        let action = 'clear';
        let act = this.uqMan.entities['$role_site_user_role'];
        await act.submit({
            site: this.userUnit.unitId,
            user,
            action,
            undefined,
        });
    }
    async quitOwner() {
        let act = this.uqMan.entities['$role_site_quit_owner'];
        await act.submit({
            site: this.userUnit.unitId,
        });
    }
    async delAdmin(user, admin) {
        let act = this.uqMan.entities['$role_site_del_admin'];
        await act.submit({
            site: this.userUnit.unitId,
            user,
            admin,
        });
    }
}
//# sourceMappingURL=uqUnit.js.map