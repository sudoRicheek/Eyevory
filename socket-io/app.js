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
  .get("http://localhost:8000/api/influx_data/get_available_servers")
  .then((res) => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data);
    socket.emit("hosts", res.data);
  })
  .catch((error) => {
    console.error(error);
  });

  axios
    .get("http://localhost:8000/api/influx_data/get_usage_cpu")
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res.data);
      socket.emit("cpu_data", res.data);
    })
    .catch((error) => {
      console.error(error);
    });
  
  axios
    .get("http://localhost:8000/api/influx_data/get_usage_mem")
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res.data);
      socket.emit("mem_data", res.data);
    })
    .catch((error) => {
      console.error(error);
    });
      
  axios
  .get("http://localhost:8000/api/influx_data/get_processes")
  .then((res) => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data);
    socket.emit("processes_data", res.data);
  })
  .catch((error) => {
    console.error(error);
  });

  axios
  .get("http://localhost:8000/api/influx_data/get_alerts")
  .then((res) => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data);
    socket.emit("alerts", res.data);
  })
  .catch((error) => {
    console.error(error);
  });

  

  setTimeout(sendData, 10000, socket);
}
