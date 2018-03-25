import { Point } from "./Point";

export class Vector {

    x: number;
    y: number;

    static readonly UP: Vector = new Vector(0.0, 1.0);
    static readonly DOWN: Vector = new Vector(0.0, -1.0);
    static readonly LEFT: Vector = new Vector(-1.0, 0.0);
    static readonly RIGHT: Vector = new Vector(1.0, 0.0);
    static readonly ZERO: Vector = new Vector(0.0, 0.0);

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

    /*
     * Returns angle (radians) to vector b, in range (-PI, PI]
     */
    AngleTo(b: Vector): number {

        if (b.Compare(Vector.ZERO) || this.Compare(Vector.ZERO)) {
            // One of the vectors was invalid
            console.warn("Vector:AngleTo: tried to use null vector");
            return -1;
        }

        // Normalize both vectors
        var c = this.Normalize();
        var d = b.Normalize();

        // First case: c = -d?
        if (c.Scale(-1).Compare(d)) {
            return Math.PI;
        }

        var acuteAngle = Math.asin(Math.abs(c.Cross(d)));

        if (c.Dot(d) < 0) {
            // Obtuse angle
            acuteAngle += (Math.PI / 2) * (acuteAngle < 0 ? -1 : 1);
        }

        return acuteAngle;
    }

    // Returns true if two vectors are within tolerance distance of eachother
    Compare(b: Vector, tolerance: number = 0.1, 
            quickCheck: boolean = true): boolean {

        if (tolerance < 0) {
            console.warn("negative tolerance used in vec compare");
            tolerance *= -1;
        }

        // Quick check
        if (quickCheck && 
                (   this.x - tolerance > b.x || this.x + tolerance < b.x ||
                    this.y - tolerance > b.y || this.y + tolerance < b.x)) {
            return false;
        }

        return this.SubtractVec(b).Magnitude() <= tolerance;

    }

}
