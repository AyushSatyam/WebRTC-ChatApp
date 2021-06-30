const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("The server is running");
});
io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callend");
  });
  socket.on("calluser", ({ userTocall, signalData, from, name }) => {
    io.to(userTocall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    io.to(data.io).emit("callaccepted", data.signal);
  });
});
server.listen(PORT, () => {
  console.log(`The server listening on port ${PORT}`);
});
