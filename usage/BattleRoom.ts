import { Room } from "../src";

export class BattleRoom extends Room<any> {

  onInit (options) {
    this.setState({ messages: [] });
  }

  onJoin (client, options) {
    console.log("client has joined!");
    console.log("client.id:", client.id);
    console.log("client.sessionId:", client.sessionId);
    console.log("with options", options);
    this.state.messages.push(`${ client.id } joined.`);
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
      var move : number = data.move;

      var left   = (move & 1) != 0;
      var up     = (move & 2) != 0;
      var right  = (move & 4) != 0;
      var down   = (move & 8) != 0;

      console.log(client.id, " left: ", left, " up: ", up, " right: ", right,
          " down: ", down);
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