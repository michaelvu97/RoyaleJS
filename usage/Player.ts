import { Point } from "./Point"
import { CircleCollider } from "./CircleCollider"
import { InputMovement } from "./InputMovement"
import { Vector } from "./Vector"
import { nonenumerable as nosync } from "nonenumerable";

export class Player extends CircleCollider {

    static readonly MAX_SPEED : number = 1.0;
    static readonly ACCELERATION_COEFF:number = 0.2;
    static readonly PLAYER_RADIUS : number = 1.0;

    @nosync
    clientId: number;

    @nosync
    private _movementData :InputMovement;

    @nosync
    velocity: Vector;
    @nosync
    acceleration: Vector;


    constructor(clientId: number, x:number = 0, y:number = 0) {
        super(x, y, Player.PLAYER_RADIUS);
        this.clientId = clientId;
        this._movementData = {
            up: false,
            down: false,
            right: false,
            left: false
        }

        this.acceleration = Vector.ZERO;
        this.velocity = Vector.ZERO;
    }

    UpdateMovementInput(data: InputMovement) {

        this._movementData = {
            up:     data.up,
            down:   data.down,
            right:  data.right,
            left:   data.left
        }

        /*
         * Since there's only 8 directions the player can move, the directions
         * have been pre-computed in the interest of runtime efficiency.
         */

        if (data.up && !data.down) {
            if (data.left && !data.right) {
                this.acceleration = Vector.UPLEFT;
            } else if (data.right && !data.left) {
                this.acceleration = Vector.UPRIGHT;
            } else {
                this.acceleration = Vector.UP;
            }
        } else if (data.down && !data.up) {
            if (data.left && !data.right) {
                this.acceleration = Vector.DOWNLEFT;
            } else if (data.right && !data.left) {
                this.acceleration = Vector.DOWNRIGHT;
            } else {
                this.acceleration = Vector.DOWN;
            }
        } else if (data.left && !data.right) {
            this.acceleration = Vector.LEFT;
        } else if (data.right && !data.left) {
            this.acceleration = Vector.RIGHT;
        } else {
            this.acceleration = Vector.ZERO;
        }

        this.acceleration = this.acceleration.Scale(Player.ACCELERATION_COEFF);

    }

    /*
     * Called once per tick.
     */
    Move() {
        
        this.velocity = this.velocity.AddVec(this.acceleration)
                .MagLimit(Player.MAX_SPEED);

        // TODO put collision checking in here.
        this.translate(this.velocity);

    }

    Serialize() {
        return {
            x: this.x,
            y: this.y
        };
    }

}
