const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");
const server = https.createServer(
  {
    key: fs.readFileSync("/home/ubuntu/sslKey/privkey.pem"),
    cert: fs.readFileSync("/home/ubuntu/sslKey/cert.pem"),
    ca: fs.readFileSync("/home/ubuntu/sslKey/chain.pem"),
    requestCert: false,
    rejectUnauthorized: false,
  },
  app
);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/peerjs", peerServer);

const path = require("path");
var favicon = require("serve-favicon");
app.use(favicon(path.join(__dirname, "public/assets", "checkmate_logo.ico")));

app.get("/", (req, rsp) => {
  rsp.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});

server.listen(process.env.PORT || 3030);
