import { Point } from "./Point"
import { Ray } from "./Ray"

export interface Collider {
    
    CheckPointInside(p: Point): boolean;

    CheckRayCollision(r: Ray): boolean;
}