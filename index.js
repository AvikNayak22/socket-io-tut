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

io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

http.listen(3000, function () {
  console.log("Server ready on 3000");
});
