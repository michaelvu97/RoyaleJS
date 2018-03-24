import { Vector } from "./Vector";

export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }    

    ToWorldVector(): Vector {
        return new Vector(this.x, this.y);
    }

    AddVec(b: Vector): Point {
        return new Point(this.x + b.x, this.y + b.y);
    }

    SubtractVec(b: Vector): Point {
        return new Point(this.x - b.x, this.y - b.y);
    }

}