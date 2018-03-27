import * as http from "http";
import * as express from "express";
import * as bodyParser from "body-parser";

import { Server } from "../src/Server";
import { BattleRoom } from "./BattleRoom";

const port = 8080;
const endpoint = "localhost";

const app = express();
app.use(bodyParser.json());

// Create HTTP & WebSocket servers
const server = http.createServer(app);
const gameServer = new Server({ server: server });

// Register BattleRoom as "battle"
gameServer.register("battle", BattleRoom).
  // demonstrating public events.
  on("create", (room) => console.log("room created!", room.roomId)).
  on("join", (room, client) => console.log("client", client.id, "joined", room.roomId)).
  on("leave", (room, client) => console.log("client", client.id, "left", room.roomId)).
  on("dispose", (room) => console.log("room disposed!", room.roomId));

app.use(express.static(__dirname));


app.get("/", (req, res) => {
  console.log("something!", process.pid);
  console.log("GET /")
  res.send("Hey!");
});

gameServer.onShutdown(() => {
  console.log("CUSTOM SHUTDOWN ROUTINE: STARTED");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("CUSTOM SHUTDOWN ROUTINE: FINISHED");
      resolve();
    }, 1000);
  })
});

gameServer.listen(port);

console.log(`Listening on http://${ endpoint }:${ port }`)


