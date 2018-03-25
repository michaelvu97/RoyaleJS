import { Point } from "./Point"
import { Collider } from "./Collider"
import { CircleCollider } from "./CircleCollider"

export class BoxCollider extends Point implements Collider {
    
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height:number) {
        super(x, y);
        this.width = width;
        this.height = height;
    }

    GetArea(): number {
        return this.width * this.height;
    }

    CheckPointInside(p: Point): boolean {

        var halfHeight = this.height / 2;
        var halfWidth = this.width / 2;

        return  p.x > this.x - halfWidth && p.x < this.x + halfWidth &&
                p.y > this.y - halfHeight && p.y < this.y + halfHeight;
    }

    CheckRayCollision(r: Ray): boolean {
        return false; // TODO
    }

    CheckCircleCollision(c: CircleCollider): boolean {
        return c.CheckBoxCollision(this);
    }

}