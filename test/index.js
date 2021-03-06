var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {Host, Client} from '../src/index';

describe('ifrau', () => {

	beforeEach(() => {
		global.window = {
			addEventListener: sinon.stub()
		};
		global.document = {
			createElement: sinon.stub().returns({style:{}}),
			getElementById: sinon.stub().returns({
				appendChild: sinon.spy()
			})
		};
	});

	it('should export Host', () => {
		var host = new Host('id', 'src');
		expect(host).to.be.defined;
	});

	it('should export Client', () => {
		var client = new Client();
		expect(client).to.be.defined;
	});

});
