import { CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE, validMethods } from './methods';

describe('validMethods', () => {
	it('should return expected values', () => {
		expect(CONNECT).toEqual('CONNECT');
		expect(DELETE).toEqual('DELETE');
		expect(GET).toEqual('GET');
		expect(HEAD).toEqual('HEAD');
		expect(OPTIONS).toEqual('OPTIONS');
		expect(PATCH).toEqual('PATCH');
		expect(POST).toEqual('POST');
		expect(PUT).toEqual('PUT');
		expect(TRACE).toEqual('TRACE');
	});
	it('should return expected values for valid methods', () => {
		expect(validMethods).toEqual(['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE']);
	});
});
