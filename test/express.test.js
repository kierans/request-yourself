"use strict";

const { assertThat, is } = require("hamjest");
const { addSelfToRequest } = require("../src/express");

describe("request middleware", function() {
	/** @var {RequestHandler} */
	let middleware;

	let req;

	beforeEach(function() {
		req = {
			headers: {
				"x-forwarded-host": "forwardedfor:1234",
				host: "localhost:1234"
			},
			protocol: "foo"
		}

		middleware = addSelfToRequest()
	});

	it("should return value of x-forwarded-host header", function() {
		middleware(req, null, () => {});

		assertThat(req.host, is("forwardedfor:1234"));
	});

	it("should return value of request host header", function() {
		delete req.headers["x-forwarded-host"];

		middleware(req, null, () => {});

		assertThat(req.host, is("localhost:1234"));
	});

	it("should define self property", function() {
		middleware(req, null, () => {});

		assertThat(req.self, is("foo://forwardedfor:1234"));
	});

	it("should call 'next'", function() {
		let wasCalled = false;

		middleware(req, null, () => {
			wasCalled = true;
		});

		assertThat("Next not called", wasCalled, is(true));
	});
});
