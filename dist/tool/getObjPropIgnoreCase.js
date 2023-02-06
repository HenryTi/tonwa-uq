export function getObjPropIgnoreCase(obj, prop) {
    if (!obj)
        return;
    if (!prop)
        return;
    let keys = Object.keys(obj);
    prop = prop.toLowerCase();
    for (let key of keys) {
        if (key.toLowerCase() === prop)
            return obj[key];
    }
    return;
}
//# sourceMappingURL=getObjPropIgnoreCase.js.map