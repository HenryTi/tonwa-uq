export class UqSys {
    entities = {};
    constructor(entities) {
        this.entities = entities;
    }
    async Poked() {
        let query = this.entities['$poked'];
        let ret = await query.query({});
        let arr = ret.ret;
        if (arr.length === 0)
            return false;
        let row = arr[0];
        return row["poke"] === 1;
    }
    async RoleMe() {
        let unitRoles = {};
        let query = this.entities['$role_my'];
        let { admins, roles } = await query.query({});
        function getUnitRole(unit, entity) {
            let unitRole = unitRoles[unit];
            if (unitRole === undefined) {
                unitRoles[unit] = unitRole = {
                    unit,
                    entity,
                    isOwner: false,
                    isAdmin: false,
                    roles: [],
                };
            }
            return unitRole;
        }
        for (let row of admins) {
            let { unit, admin, entity } = row;
            let unitRole = getUnitRole(unit, entity);
            unitRole.isOwner = (admin & 1) === 1;
            unitRole.isAdmin = (admin & 2) === 2;
        }
        for (let row of roles) {
            let { unit, role, entity } = row;
            let unitRole = getUnitRole(unit, entity);
            unitRole.roles.push(role);
        }
        let sys;
        let units = [];
        for (let i in unitRoles) {
            let v = unitRoles[i];
            if (Number(i) === 0) {
                sys = v;
            }
            else {
                units.push(v);
            }
        }
        return { sys, units };
    }
}
//# sourceMappingURL=uqSys.js.map