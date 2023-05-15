"use strict";

const { assertThat, is } = require("hamjest");
const { add } = require("../src");

describe("index", function() {
	it("should add two numbers", function() {
		assertThat(add(1, 2), is(3));
	});
});
