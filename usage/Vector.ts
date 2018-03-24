import { Point } from "./Point";

export class Vector {

    x: number;
    y: number;

    static readonly UP: Vector = new Vector(0.0, 1.0);
    static readonly DOWN: Vector = new Vector(0.0, -1.0);
    static readonly LEFT: Vector = new Vector(-1.0, 0.0);
    static readonly RIGHT: Vector = new Vector(1.0, 0.0);

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /*
     * All function are "functional" non-modifiers unless stated otherwise.
     */
    AddPoint (b: Point): Point  {
        return new Point(this.x + b.x, this.y + b.y);
    }

    AddVec (b: Vector): Vector {
        return new Vector(this.x + b.x, this.y + b.y);
    }

    SubtractVec (b: Vector): Vector {
        return new Vector(this.x - b.x, this. y - b.y);
    }

    Scale (m: number): Vector {
        return new Vector(this.x * m, this.y * m);
    }

    /*
     * Returns ONE vector perpendicular to this one, with the same magnitude.
     * The vector returned is rotated 90 degrees CCW.
     */
    Perpendicular (): Vector {
        return new Vector(-1 * this.y, this.x);
    }

    RotateRad (radians: number): Vector {
        return new Vector(
                (this.x * Math.cos(radians)) - (this.y * Math.sin(radians)),
                (this.x * Math.sin(radians)) + (this.y * Math.cos(radians))
            );
    }

    RotateDeg (degrees: number): Vector {
        return this.RotateRad(degrees * Math.PI / 180.0);
    }

    ToWorldPoint (): Point {
        return new Point(this.x, this.y);
    }

    Dot (b: Vector): number {
        return (this.x * b.x) + (this.y * b.y);
    }

    // Since this is a 2D engine, cross returns the magnitude of a z-vector
    Cross (b: Vector): number {
        return (this.x * b.y) - (this.y * b.x);
    }

    Magnitude(): number {
        return Math.sqrt(this.Dot(this));
    }

    Normalize(): Vector {
        if (this.Magnitude() <= 0) {
            return this; // Do not normalize if this is a zero vector.
        }

        return this.Scale(1 / this.Magnitude());
    }

}
