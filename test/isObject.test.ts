import { expect } from 'chai';
import { isObject } from '../src/tools/isObject';

describe('test isObject', function() {
	it('isObject({}) should return true', function() {
		expect(isObject({})).to.equal(true);
	});
	it('isObject(0) should return false', function() {
		expect(isObject(0)).to.equal(false);
	});
	it('isObject(["test"]) should return false', function() {
		expect(isObject(["test"])).to.equal(true);
	});
});

