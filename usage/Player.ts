import { Point } from "./Point"

export class Player extends Point {

    static readonly MAX_SPEED : number = 1.0;

    clientId: number;

    position: Point;

    constructor(clientId: number) {
        this.clientId = clientId;
    }

    Move() {

    }

}