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
  });

  it("should work", (done) => {
    clientSocket.on("hello", (arg) => {
      assert.equal(arg, "world");
      done();
    });

    clientSocket.emit("hello", "world");
  });

  it("should work (with ack)", (done) => {
    clientSocket.emit("hi", (arg) => {
      assert.equal(arg, "hola");
      done();
    });
  });
});