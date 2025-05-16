const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("userMessage", (data) => {
    io.emit("message", data); // { msg, id }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3005, () => {
  console.log("Server is listening on port 3005");
});
