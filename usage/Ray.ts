import { Point } from "./Point"
import { Vector } from "./Vector"

export class Ray {

    position: Point;
    direction: Vector; // Rays should always have normalized directions

    constructor(position: Point, direction: Vector) {
        this.position = position;
        this.direction = direction.Normalize();
    }

    IsInvalidRay (): boolean {
        return this.direction.Compare(Vector.ZERO);
    }

}