import { Vector } from "./Vector"
import { Point } from "./Point"
import { Collider } from "./Collider"
import { Ray } from "./Ray"

export class CircleCollider extends Point implements Collider {

    radius: number;

    constructor (x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
    }

    CheckPointInside(p: Point): boolean {

        // Quick check first
        if (   p.x < this.x - this.radius || p.x > this.x + this.radius
            || p.y < this.y - this.radius || p.y > this.y + this.radius)
            return false;

        // Now the actual check.
        return this.radius >= this.SubtractPoint(p).Magnitude();
    }

    CheckRayCollision(r: Ray): boolean {

        if (r.IsInvalidRay()) {
            console.warn("Invalid ray used in circle collision check");
            return false;
        }

        /*
         * Rotate the entire world so that the ray lies in the positive
         * horizontal direction
         */
        var angle = Vector.RIGHT.AngleTo(r.direction);

        var positionCopy = new Point(this.x, this.y);
        positionCopy = positionCopy.RotateAbout(-1 * angle, r.position);

        // The new ray is now an implied direction of RIGHT.

        return  positionCopy.y + this.radius > r.position.y && 
                positionCopy.y - this.radius < r.position.y;

    }


}