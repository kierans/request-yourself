"use strict";

const { assertThat, is, defined } = require("hamjest");

describe("index", function() {
	const frameworks = [
		"express"
	]

	frameworks.forEach((framework) => {
		describe(framework, function() {
			it("should export middleware", function() {
				const exports = require("../src/index");

				assertThat(exports[framework], is(defined()));
				assertThat(exports[framework].addSelfToRequest, is(defined()));
			});
		});
	});
});
