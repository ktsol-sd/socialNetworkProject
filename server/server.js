import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type"],
  },
});

//db
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB Error => ", err));

//middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

// autoload routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

//socket io
// io.on("connect", (socket) => {
//   // console.log("socket io ", socket.id);
//   socket.on("send-message", (message) => {
//     socket.broadcast.emit("receive-message", message);
//   });
// });

io.on("connect", (socket) => {
  // console.log("socket io ", socket.id);
  socket.on("new-post", (newPost) => {
    // console.log("socket io post", newPost);
    socket.broadcast.emit("new-post", newPost);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const port = process.env.PORT || 8000;

http.listen(port, () =>
  console.log(`Server running sucessfully on port ${port}`)
);
