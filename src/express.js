"use strict";

function addSelfToRequest() {
	return function (req, res, next) {
		/*
		 * `req.host` has been deprecated as Express wants to align `req.host` to node's URL.host in the next major release.
		 * Currently `req.host` proxies `req.hostname` in Express v4
		 *
		 * While req.hostname does consider the `x-forwarded-host`, for the case where the request has not been proxied,
		 * req.hostname does not return the port (which correctly aligns with node's URL).
		 *
		 * Consequently we manually check for `x-forwarded-host` and if not present use the Host request header (which does
		 * include the port).
		 *
		 * @see https://expressjs.com/en/api.html#req.hostname
		 */
		Object.defineProperty(req, "host", {
			configurable: true,
			enumerable: true,
			get() {
				const proxyHost = this.headers["x-forwarded-host"];

				return proxyHost ? proxyHost : this.headers.host;
			}
		});

		Object.defineProperty(req, "self", {
			configurable: true,
			enumerable: true,
			get() {
				return `${this.protocol}://${this.host}`;
			}
		})

		return next();
	}
}

module.exports = {
	addSelfToRequest
}
