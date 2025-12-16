const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let players = []; // Foydalanuvchilar
let roles = ["Mafia","Mafia","Sherif","Doctor","Citizen","Citizen","Citizen","Citizen","Citizen","Citizen"];

io.on("connection", (socket) => {
  console.log("Yangi o‘yinchi ulandi:", socket.id);

  socket.on("join", (username) => {
    if(players.length < 10) {
      const role = roles.pop();
      players.push({id: socket.id, name: username, role});
      io.emit("updatePlayers", players);
    } else {
      socket.emit("full", "O‘yin to‘liq!");
    }
  });

  socket.on("vote", (targetName) => {
    io.emit("voteUpdate", targetName);
  });

  socket.on("disconnect", () => {
    players = players.filter(p => p.id !== socket.id);
    io.emit("updatePlayers", players);
  });
});

http.listen(process.env.PORT || 3000, () => console.log("Server ishga tushdi"));
