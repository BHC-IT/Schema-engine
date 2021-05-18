import { isObject } from './isObject';

export const checkArrayOrTupleType = (variable : any[], types: Function[]) : boolean => {
	if (types.length === 1)
		return variable.reduce((p : boolean, c : any, i : number) => p && matchType(c, types[0]), true);

	if (types.length !== variable.length)
		return false

	return types.reduce((p : boolean, c : Function, i : number) => p && matchType(variable[i], c), true);
}

export const matchType = <T extends any>(variable : T, type : Function | Function[]) : boolean => {

	if (typeof type === "object" && isObject(variable) && variable instanceof Array) {
		return checkArrayOrTupleType(variable, type);
	}

	else if (typeof type === "object")
		return false;

	if (isObject(variable))
		return variable instanceof type

	try {
		return typeof variable === typeof type();
	} catch (e) {
		return false;
	}
};
