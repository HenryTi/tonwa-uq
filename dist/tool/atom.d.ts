import { Atom, WritableAtom } from 'jotai';
export declare function getAtomValue<T>(atom: Atom<T>): T;
export declare function setAtomValue<T>(atom: WritableAtom<T, any, any>, value: T): void;
