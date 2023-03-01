const dgram = require("dgram");

// create a UDP socket
const socket = dgram.createSocket("udp4");

// listen for messages on a specific port and address
const port = 3002;
const address = "127.0.0.1";
socket.bind(port, address);

// handle incoming messages
socket.on("message", (message, remote) => {
  console.log(
    `Received message from ${remote.address}:${remote.port}: ${message}`
  );
});

// handle errors
socket.on("error", err => {
  console.log(`Socket error: ${err}`);
});

// handle socket close event
socket.on("close", () => {
  console.log("Socket closed.");
});

module.exports = socket;
