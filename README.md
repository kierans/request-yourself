# request-yourself

Middleware to add a property to a HTTP request with how the request was addressed

Suitable for
 - [Express][1] version 4

Often web applications need to generate a URL to point to themselves to give to client 
applications. For example, in applications that use [OAuth 2.0][2] a `redirect_uri` is 
required for the Authorisation Server to redirect the user back to the application. However, 
if an application is fronted by a gateway or load balancer the application needs to use the 
public facing address of the application, not the internal address for where the application 
sits on the network.

This middleware adds a `self` property to an HTTP request containing the scheme/protocol and 
the hostname (and port if required) of how the end client addressed the application. It 
considers any `X-Forwarded-Host` [header][3] as well the `Host` details in the request.

A request handling pipeline can then dynamically create a URL that points to the same host 
which assists the application being portable to difference hosts/environments (for example, 
dev, test and prod) without any additional configuration.

## Usage

```shell
$ npm install request-yourself
```

### Express example

```javascript
const middleware = require("request-yourself");
const express = require("express");
const app = express();
const port = 3000;

app.use(middleware.express());

app.get("/", (req, res) => {
  res.send(`Hello from ${req.self}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

[1]: https://expressjs.com/
[2]: https://oauth.net/2/
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host
