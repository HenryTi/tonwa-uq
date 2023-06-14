import { getDefaultStore } from 'jotai';
const jotaiStore = getDefaultStore();
export function getAtomValue(atom) {
    return jotaiStore.get(atom);
}
export function setAtomValue(atom, value) {
    jotaiStore.set(atom, value);
}
//# sourceMappingURL=atom.js.map