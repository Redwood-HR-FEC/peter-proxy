"use strict";
const express = require("express");
const app = express();
const axios = require("axios").default;
const compression = require("compression");

// const cors = require("cors");
// app.use(cors());
app.use(express.json());
app.use(compression());

const PORT = process.env.PORT || 3000;
const httpProxy = require("http-proxy");
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
app.use("/:id", express.static(`${__dirname}/../public`));

const apiProxy = httpProxy.createProxyServer({});
const qnaService = "http://54.184.20.122:3001";
const productDetails = "http://34.212.75.246:3002";
const revService = "http://44.228.132.116:3003";
// ServerThree = "http://localhost:3003";

app.all("/description-service/*", (req, resp) => {
  console.log("Proxy to Description server");
  apiProxy.web(req, resp, { target: productDetails });
});
app.all("/getsingleproduct/*", function (req, res) {
  console.log("redirecting to details");
  apiProxy.web(req, res, { target: productDetails });
});

app.all("/qna-service/*", (req, resp) => {
  console.log("Proxy to Q and A server");
  apiProxy.web(req, resp, { target: qnaService });
});
app.all("/questions/*", (req, resp) => {
  console.log("Proxy to Q and A server API");
  apiProxy.web(req, resp, { target: qnaService });
});

app.all("/rev-service/*", (req, resp) => {
  console.log("Proxy to Review server");
  apiProxy.web(req, resp, { target: revService });
});

app.all("/review-api/*", (req, resp) => {
  console.log("Proxy to Review server API");
  apiProxy.web(req, resp, { target: revService });
});
// app.all("/one", function (req, res) {
//   console.log("redirecting to Server1");
//   apiProxy.web(req, res, { target: serverOne });
// });

// app.all("/app2/*", function (req, res) {
//   console.log("redirecting to Server3");
//   apiProxy.web(req, res, { target: ServerThree });
// });
// app.get("/", (req, res) => {
//   res.send("hello");
// });

// app.get("/description", (req, res) => {
//   req.
// })

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
