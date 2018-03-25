import { Point } from "./Point"
import { Vector } from "./Vector"
import { Collider } from "./Collider"

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

    Cast(   colliders: Array<Collider>, 
            forwardsOnly: boolean = true): Collider | null {
        colliders.forEach(collider => {
            if (collider.CheckRayCollision(this)) {
                return true;
            }
        });
        return null;
    }

}