import { EntityMap } from "colyseus";
import { Player } from "./Player";

export class BattleState {
    players: EntityMap<Player> = {};

}