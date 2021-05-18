import { expect } from 'chai';
import { Schema } from '../src/class/Schema';

describe('test Schema match', function() {
	it('Schema simple', function() {
		const schema = new Schema({
			test: {type : String},
		});

		const test = {
			test: 'test',
		};

		expect(schema.match(test)).to.equal(true);
	});

	it('Schema simple false', function() {
		const schema = new Schema({
			test: {type : String},
		});

		const test = {
			test: 0,
		};

		expect(schema.match(test)).to.equal(false);
	});

	it('Schema complex true', function() {
		class CTest {};

		const schema = new Schema({
			test: {type : CTest},
		});

		const test = {
			test: new CTest(),
		};

		expect(schema.match(test)).to.equal(true);
	});


	it('Schema complex', function() {
		class CTest {};
		class CCTest {};
		class XXTest {};

		const schema = new Schema({
			test1: {type : CTest},
			test2: {type : CCTest},
			test3: {type : XXTest},
		});

		const test1 = {
			test1: new CTest(),
			test2: new CCTest(),
			test3: new XXTest(),
		};

		const test2 = {
			test1: new CTest(),
			test2: new XXTest(),
			test3: new XXTest(),
		};

		const test3 = {
			test1: new CTest(),
			test2: new CCTest(),
			test3: new CCTest(),
		};

		const test4 = {
			test1: new CCTest(),
			test2: new CCTest(),
			test3: new XXTest(),
		};

		expect(schema.match(test1)).to.equal(true);
		expect(schema.match(test2)).to.equal(false);
		expect(schema.match(test3)).to.equal(false);
		expect(schema.match(test4)).to.equal(false);
	});

	it('test empty not required value', function() {
		const schema = new Schema({
			test: {type : Number},
			empty: {type : Number},
		});

		const test = {
			test: 0,
		};
		expect(schema.match(test)).to.equal(true);
	});

	it('test empty required value', function() {
		const schema = new Schema({
			test: {type : Number},
			empty: {type : Number, required: true},
		});

		const test = {
			test: 0,
		};
		expect(schema.match(test)).to.equal(false);
	});
});

describe('test Schema complexe match', function() {

	class CTest {};

	const schema = new Schema({
		test: {type : [CTest]},
	});

	it('Schema complex class array 1', function() {

		const test = {
			test: [new CTest()],
		};




		expect(schema.match(test)).to.equal(true);
	});

	it('Schema complex class array 2', function() {

		const test = {
			test: new CTest(),
		};

		expect(schema.match(test)).to.equal(false);
	});

	it('Schema complex class array 3', function() {
		const test = {
			test: [new CTest(), 0],
		};

		expect(schema.match(test)).to.equal(false);
	});

	it('Schema complex class array 4', function() {
		const test = {
			test: [0],
		};

		expect(schema.match(test)).to.equal(false);
	});
});


describe('test Schema filter', function() {


	it('Schema filter 1', function() {

		const schema = new Schema({
			test: {type : Number},
			test2: {type : String},
		});

		const test = {
			test: 0,
			test2: '0',
			test3: 0,
		};




		expect(schema.filter(test)).to.eql({test: 0, test2: '0'});
	});

	it('Schema filter 2', function() {

		const schema = new Schema({
			test: {type : Number},
			test2: {type : String},
		});

		const test = {
			test: 0,
			test3: 0,
		};

		expect(() => schema.filter(test)).to.throw(TypeError, "required key are empty : test2");
	});

	it('Schema filter 3', function() {

		const schema = new Schema({
			test: {type : Number},
			test2: {type : String, required: false},
		});

		const test = {
			test: 0,
			test3: 0,
		};

		expect(schema.filter(test)).to.eql({test: 0});
	});

	it('Schema filter 4', function() {

		const schema = new Schema({
			test: {type : Number},
			test2: {type : String, default: 'ok'},
		});

		const test = {
			test: 0,
			test3: 0,
		};

		expect(schema.filter(test)).to.eql({test: 0, test2: 'ok'});
	});

	it('Schema filter 4', function() {

		const schema = new Schema({
			test: {type : Number},
			test2: {type : String, default: () => 'ok'},
		});

		const test = {
			test: 0,
			test3: 0,
		};

		expect(schema.filter(test)).to.eql({test: 0, test2: 'ok'});
	});

	it('Schema filter 5', function() {

		const schema = new Schema({
			test: {type : Number},
			test2: {type : String, default: 0},
		});

		const test = {
			test: 0,
			test3: 0,
		};

		expect(() => schema.filter(test)).to.throw(TypeError, "key have an invalid default typing : test2");
	});

	it('Schema filter 6', function() {

		const schema = new Schema({
			test: {type : Number},
			test2: {type : Number, default: () => 'ko'},
		});

		const test = {
			test: 0,
			test3: 0,
		};

		expect(() => schema.filter(test)).to.throw(TypeError, "key have an invalid default typing : test2");
	});

	it('Schema filter 7', function() {

		const schema = new Schema({
			test: {type : Number},
			test2: {type : String},
		});

		const test = {
			test: 0,
			test2: 0,
		};

		expect(() => schema.filter(test)).to.throw(TypeError, "key have an invalid typing : test2");
	});


	it('Schema filter with types 1', function() {

		interface ITest {
			test: number,
			test2: number,
		}

		const schema = new Schema<ITest>({
			test: {type : Number},
			test2: {type : String},
		});

		const test = {
			test: 0,
			test2: '0',
		};

		const result : ITest = schema.filter(test);

		expect(result).to.eql({test: 0, test2: '0'});
	});

	it('Schema filter with types 2', function() {

		interface ITest {
			test: number,
			test2: number,
		}

		const schema = new Schema<ITest>({
			test: {type : Number},
		});

		const test = {
			test: 0,
		};

		const result : ITest = schema.filter(test);

		expect(result).to.eql({test: 0});
	});

});

describe('test Schema createDefault', function() {


	it('Schema createDefault 1', function() {

		const schema = new Schema({
			test: {type : Number},
			test2: {type : String},
		});


		expect(schema.createDefault()).to.eql({});
	});

	it('Schema createDefault 2', function() {

		const schema = new Schema({
			test: {type : Number, default: 0},
			test2: {type : String, default: () => 'ok'},
		});


		expect(schema.createDefault()).to.eql({test: 0, test2: 'ok'});
	});


	it('Schema createDefault 3', function() {

		const schema = new Schema({
			test: {type : Number, default: 'ok'},
			test2: {type : String, default: () => 0},
		});

		expect(schema.createDefault).to.throw(TypeError, "key have an invalid default typing : test,test2");
	});

});