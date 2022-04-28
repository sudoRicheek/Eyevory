const express = require("express");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser);
let x = true;

const server = app.listen(3000, () => {
  console.log("Started in 3000");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.sockets.on("connection", (socket) => {
  console.log(`new connection id: ${socket.id}`);
  sendData(socket);
});

function sendData(socket) {
  axios
    .get("https://localhost:8000/api/influx_data/get_usage_cpu")
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
    //   console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });

  if (x) {
    socket.emit(
      "data1",
      Array.from({ length: 3 }, () => Math.floor(Math.random() * 590) + 10)
    );
    x = !x;
  } else {
    socket.emit(
      "data2",
      Array.from({ length: 3 }, () => Math.floor(Math.random() * 590) + 10)
    );
    x = !x;
  }
  console.log(`data is ${x}`);
  setTimeout(() => {
    sendData(socket);
  }, 1000);
}
