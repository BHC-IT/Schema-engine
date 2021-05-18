import { matchType } from '../tools/matchType';
import { rawSchema } from '../types/rawSchema';

export class Schema<T extends object> {
	private readonly _schema : rawSchema;
	private readonly _keys : string[];

	constructor(obj : rawSchema) {
		this._schema = obj;
		this._keys = Object.keys(this._schema);
	}

	public match = (obj : {[index: string]: any}) : boolean =>
		this._keys.reduce(((p : boolean, k : string) => {
			if ((obj[k] === null || obj[k] === undefined) && !this._schema[k].required)
				return true;

			if (!matchType(obj[k], this._schema[k].type))
				return false;

			return p && true;

		}), true);

	public filter = (obj : {[index: string]: any}) : T => {
		const unfound_words : string[] = [];
		const invalid_default : string[] = [];
		const invalid_type : string[] = [];
		const filtered_obj : {[index: string]: any} = {};

		this._keys.forEach((e) => {
			if (obj[e] === undefined && this._schema[e].required !== false && this._schema[e].default === undefined) {

				unfound_words.push(e);

			} else if (obj[e] === undefined && this._schema[e].default !== undefined) {

				let value : any;
				if (typeof this._schema[e].default === "function")
					value = this._schema[e].default();
				else
					value = this._schema[e].default;
				if (!matchType(value, this._schema[e].type))
					invalid_default.push(e);
				else
					filtered_obj[e] = value;

			} else if (obj[e] !== undefined) {
				if (!matchType(obj[e], this._schema[e].type))
					invalid_type.push(e);
				else
					filtered_obj[e] = obj[e];
			}
		});

		if (unfound_words.length)
			throw new TypeError(`required key are empty : ${unfound_words}`);

		if (invalid_default.length)
			throw new TypeError(`key have an invalid default typing : ${invalid_default}`);

		if (invalid_type.length)
			throw new TypeError(`key have an invalid typing : ${invalid_type}`);

		return filtered_obj as T;
	}

	// public filter = (obj : {[index: string]: any}) : boolean =>
}