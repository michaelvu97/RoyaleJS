import { Room } from "../src";
import { Player } from "./Player";
import { InputMovement } from "./InputMovement"

interface PlayerHash {
  [playerId: number]: Player;
}

export class BattleRoom extends Room<any> {

  playerList: PlayerHash = {};

  onInit (options) {
    this.setState({ messages: [] });
  }

  onJoin (client, options) {
    console.log("client has joined!");
    console.log("client.id:", client.id);
    console.log("client.sessionId:", client.sessionId);
    console.log("with options", options);
    this.state.messages.push(`${ client.id } joined.`);
    if (this.playerList.hasOwnProperty(client.id)) {
      // Error, client already joined
    } else {
      this.playerList[client.id] = new Player(client.id);
    }

  }

  onLeave (client) {
    this.state.messages.push(`${ client.id } left.`);
  }

  onMessage (client, data) {
    this.state.messages.push(data.message);

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
      var p = new Player(0, 0, 0); // Test
      p.UpdateMovementInput(inputData);
      
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

}