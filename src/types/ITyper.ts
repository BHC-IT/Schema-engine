export type Type = Function | {new(): any};

export interface ITyper {
	type: Type | Type[],
	required?: boolean,
	default?: any,
}
