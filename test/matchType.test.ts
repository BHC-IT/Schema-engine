import { expect } from 'chai';
import { matchType } from '../src/tools/matchType';


describe('test matchType', function() {
	it('matchType({}, Object) should return true', function() {
		expect(matchType({}, Object)).to.equal(true);
	});
	it('matchType(0, Number) should return true', function() {
		expect(matchType(0, Number)).to.equal(true);
	});
	it('matchType(["test"], Array) should return true', function() {
		expect(matchType(["test"], Array)).to.equal(true);
	});
	it('matchType("test", String) should return true', function() {
		expect(matchType("test", String)).to.equal(true);
	});

	it('custom class basic', function() {
		class CTest {};

		const ctest = new CTest();
		expect(matchType(ctest, CTest)).to.equal(true);
	});

	it('custom class basic', function() {
		class CTest {};

		const ctest = new CTest();
		expect(matchType(ctest, Number)).to.equal(false);
	});

	it('custom class basic', function() {
		class CTest {};

		expect(matchType(0, CTest)).to.equal(false);
	});


	it('custom class advanced', function() {
		class CTest {};

		class CCTest extends CTest {};
		class XXTest extends CTest {};

		const ctest = new CCTest();
		expect(matchType(ctest, CTest)).to.equal(true);
		expect(matchType(ctest, CCTest)).to.equal(true);
		expect(matchType(ctest, XXTest)).to.equal(false);
	});

	it('function', function() {
		expect(matchType(()=>{}, Function)).to.equal(true);
	});
});

describe('test matchType on array', function() {
	it('array types', function() {
		expect(matchType([0, 2, 4, 6], [Number])).to.equal(true);
	});

	it('array types', function() {
		expect(matchType([0, '2', 4, 6], [Number])).to.equal(false);
	});

	it('array types', function() {
		expect(matchType([0, 2, 4, 6], [Number, String])).to.equal(false);
	});

	it('array types', function() {
		expect(matchType([0, '2', 4, 6], [Number, String])).to.equal(false);
	});

	it('array types', function() {
		expect(matchType([0, '2'], [Number, String])).to.equal(true);
	});
});
