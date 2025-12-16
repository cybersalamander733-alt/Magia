const socket = io();

const loginDiv = document.getElementById("login");
const gameDiv = document.getElementById("game");
const usernameInput = document.getElementById("username");
const joinBtn = document.getElementById("joinBtn");
const playersList = document.getElementById("playersList");
const voteInput = document.getElementById("voteInput");
const voteBtn = document.getElementById("voteBtn");
const roleDisplay = document.getElementById("role");

let myRole = "";

joinBtn.addEventListener("click", () => {
  const username = usernameInput.value;
  if(username) {
    socket.emit("join", username);
    loginDiv.style.display = "none";
    gameDiv.style.display = "block";
  }
});

socket.on("updatePlayers", (players) => {
  playersList.innerHTML = "";
  players.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.name;
    if(p.id === socket.id) {
      myRole = p.role;
      roleDisplay.textContent = "Sizning rolingiz: " + myRole;
    }
    playersList.appendChild(li);
  });
});

voteBtn.addEventListener("click", () => {
  const target = voteInput.value;
  if(target) socket.emit("vote", target);
});

socket.on("voteUpdate", (target) => {
  const chat = document.getElementById("chat");
  const p = document.createElement("p");
  p.textContent = `Ovoz: ${target}`;
  chat.appendChild(p);
});

socket.on("full", (msg) => {
  alert(msg);
});
