// run `node index.js` in the terminal
const app = require("express")();
const http = require("http").Server(app);
const path = require("path");

const io = require("socket.io")(http);

app.get("/", function (req, res) {
  const options = {
    root: path.join(__dirname),
  };

  const fileName = "index.html";

  res.sendFile(fileName, options);
});

// const users = 0;

const cnsp = io.of("custom-namespace");

cnsp.on("connection", function (socket) {
  console.log("A user connected");

  cnsp.emit("customEvent", "Tester event called");

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

io.on("connection", function (socket) {
  console.log("A user connected");

  io.emit("testEvent", "Tester event called");

  // users++;
  // io.sockets.emit("broadcast", {
  //   message: users + " users connected",
  // });

  // socket.emit("newuserconnect", { message: "Hii" });

  // socket.broadcast.emit("newuserconnect", {
  //   message: users + "Users connected",
  // });

  // setTimeout(function () {
  //   // socket.send("Sent message from server side by prereserved events");

  //   socket.emit("myCustomEvent", {
  //     description: "A custom message from server side",
  //   });
  // }, 3000);

  // socket.on("myCustomEventFromClient", function (data) {
  //   console.log(data);
  // });

  socket.on("disconnect", function () {
    console.log("A user disconnected");

    // users--;
    // io.sockets.emit("broadcast", {
    //   message: users + " users connected",
    // });

    // socket.broadcast.emit("newuserconnect", {
    //   message: users + "Users connected",
    // });
  });
});

http.listen(3000, function () {
  console.log("Server ready on 3000");
});
