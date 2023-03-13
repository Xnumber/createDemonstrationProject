/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const path = require("path");
const express = require("express");
const app = express();
const port = 6001;
const liveReloadServer = livereload.createServer();
const history = require("connect-history-api-fallback");

liveReloadServer.watch(path.join(__dirname, "dist"));

app.use(history());
app.use(connectLivereload());
app.use(express.static("dist"));

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

// https://stackoverflow.com/questions/45622125/how-can-i-add-live-reload-to-my-nodejs-server