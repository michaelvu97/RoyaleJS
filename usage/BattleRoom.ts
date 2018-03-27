import { Room } from "../src";
import { Player } from "./Player";
import { InputMovement } from "./InputMovement"
import { BattleState } from "./BattleState"

interface PlayerHash {
  [playerId: number]: Player;
}

export class BattleRoom extends Room<BattleState> {

  onInit (options) {
    // this.setState({ playerList: {} });
    this.setState({});
    this.setSimulationInterval(() => {this.update(this)});
    this.state.players = {};
  }

  onJoin (client, options) {
    console.log("client has joined!");
    console.log("client.id:", client.id);
    console.log("client.sessionId:", client.sessionId);
    console.log("with options", options);
    if (this.state.players.hasOwnProperty(client.id)) {
      // Error, client already joined
    } else {
      this.state.players[client.id] = new Player(client.id);
    }

  }

  onLeave (client) {
    return new Promise((resolve, reject) => {
      console.log("onLeave promise");
      resolve();
    })
  }

  onMessage (client, data) {

    if (data.message === "leave") {
      this.disconnect();
    }

    // Unpack the movement data.
    if (data.hasOwnProperty("move")) {
      var moveInputOneHot : number = data.move;

      var inputData: InputMovement = {
        left:  (moveInputOneHot & 1) != 0,
        up:    (moveInputOneHot & 2) != 0,
        right: (moveInputOneHot & 4) != 0,
        down:  (moveInputOneHot & 8) != 0
      }

      // Update the player movement
      this.state.players[client.id].UpdateMovementInput(inputData);
      
    }  

  }

  onDispose () {
    console.log("Disposing BattleRoom...");

    // perform async tasks to disconnect all players
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("async task finished, let's dispose the room now!")
        reject();
      }, 2000);
    });
  }

  update(room: BattleRoom) {

    for (var playerId in room.state.players) {
      room.state.players[playerId].Move();
    }

  }
}