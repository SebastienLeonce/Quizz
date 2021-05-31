const Client = require("socket.io-client");
const assert = require("chai").assert;
const server = require("../bin/www");

describe("Quizz Project", () => {
  let clientSocket;
  let clientSessionID;

  beforeEach((done) => {
    const port = server.address().port;

    clientSocket = new Client(`http://localhost:${port}`, { autoConnect: false });
    done();
  });

  after(() => {
    clientSocket.close();
    server.close();
  });

  it("connect with username and password", (done) => {
    clientSocket.on("session", ({sessionID}) => {
      clientSessionID = sessionID;
      clientSocket.close();
      done();
    });

    clientSocket.auth = {};
    clientSocket.auth.username = "john";
    clientSocket.auth.password = "doe";

    clientSocket.connect();
  }).timeout(5000);

  it("check same sessionID", (done) => {
    clientSocket.on("session", ({sessionID}) => {
      assert.equal(clientSessionID, sessionID, "sessionID should be equal")
      clientSocket.close();
      done();
    });

    clientSocket.auth = {};
    clientSocket.auth.username = "john";
    clientSocket.auth.password = "doe";

    clientSocket.connect();
  }).timeout(5000);

  it("connect with sessionID", (done) => {
    clientSocket.on("session", () => {
      clientSocket.close();
      done();
    });
    clientSocket.auth = { sessionID: clientSessionID };
    clientSocket.connect();
  }).timeout(5000);

  it("connect without password", (done) => {
    clientSocket.on("connect_error", (err) => {
      assert.equal(err.message, "invalid password");
      clientSocket.close();
      done();
    });

    clientSocket.auth = {};
    clientSocket.auth.username = "john";

    clientSocket.connect();
  }).timeout(5000);

  it("connect without username", (done) => {
    clientSocket.on("connect_error", (err) => {
      assert.equal(err.message, "invalid username");
      clientSocket.close();
      done();
    });

    clientSocket.auth = {};
    clientSocket.auth.password = "john";

    clientSocket.connect();
  }).timeout(5000);

  it("connect with wrong password", (done) => {
    clientSocket.on("connect_error", (err) => {
      assert.equal(err.message, "invalid user");
      clientSocket.close();
      done();
    });

    clientSocket.auth = {};
    clientSocket.auth.username = "john";
    clientSocket.auth.password = "eod";

    clientSocket.connect();
  }).timeout(5000);
});