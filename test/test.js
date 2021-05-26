const Client = require("socket.io-client");
const assert = require("chai").assert;
const server = require("../bin/www");

describe("my awesome project", () => {
  let clientSocket;

  before((done) => {
    const port = server.address().port;

    clientSocket = new Client(`http://localhost:${port}`);
    clientSocket.on("connect", done);

  });

  after(() => {
    clientSocket.close();
    server.close();
  });

  it("user:login correct", (done) => {
    clientSocket.emit("user:login", "john", "doe", (err, res) => {
      if (!err) done();
    });
  });
});