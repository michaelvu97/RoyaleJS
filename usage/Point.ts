import { Vector } from "./Vector";

export class Point {
    x: number;
    y: number;

    static readonly ZERO = new Point(0,0);

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

    AddPoint(p: Point): Vector {
        return new Vector(this.x + p.x, this.y + p.y);
    }

    SubtractPoint(p: Point): Vector {
        return new Vector(this.x - p.x, this.y - p.y);
    }

    // Angle in radians
    RotateOrigin(angle: number): Point {
        return new Point(
            (this.x * Math.cos(angle)) - (this.y * Math.sin(angle)),
            (this.x * Math.sin(angle)) + (this.y * Math.cos(angle))
        );
    }

    RotateAbout(angle: number, origin: Point): Point {
        var originVec = origin.ToWorldVector();
        return this.SubtractVec(originVec).RotateOrigin(angle).AddVec(originVec);
    }

    Serialize() {
        return {
            x: this.x,
            y: this.y
        }
    }

    /*
     * Modifiers (lowercase methods).
     */
    translate(v: Vector): void {
        this.x += v.x;
        this.y += v.y;
    }

}