import { Vector } from "./Vector"
import { Point } from "./Point"
import { Collider } from "./Collider"
import { BoxCollider } from "./BoxCollider"
import { Ray } from "./Ray"

export class CircleCollider extends Point implements Collider {

    radius: number;

    constructor (x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
    }

    GetArea(): number {
        return Math.PI * this.radius * this.radius;
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

    CheckCircleCollision(c: CircleCollider): boolean {

        var dist = this.SubtractPoint(c).Magnitude();

        return dist <= this.radius + c.radius;

    }

    CheckBoxCollision(b: BoxCollider): boolean {

        var halfHeight = b.height/2;
        var halfWidth = b.width/2;

        // The box encloses the circle centre.

        var x_enclosed = b.x - halfWidth < this.x && b.x + halfWidth > this.x;
        var y_enclosed = b.y - halfHeight < this.y && b.y + halfHeight > this.y;

        if (x_enclosed && y_enclosed)
            return true;

        var left_enclosed =     b.x - halfWidth > this.x - this.radius &&
                                b.x - halfWidth < this.x + this.radius;
        var right_enclosed =    b.x + halfWidth > this.x - this.radius &&
                                b.x + halfWidth < this.x + this.radius;

        var top_enclosed =      b.y - halfHeight > this.y - this.radius &&
                                b.y - halfHeight < this.y + this.radius;
        var bottom_enclosed =   b.y + halfHeight > this.y - this.radius &&
                                b.y + halfHeight < this.y + this.radius;

        if ((y_enclosed || top_enclosed || bottom_enclosed) && 
            (x_enclosed || left_enclosed || right_enclosed))
            return true;

        return false;

    }

}