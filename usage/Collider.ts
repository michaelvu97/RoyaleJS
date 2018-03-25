import { Point } from "./Point"
import { Ray } from "./Ray"
import { CircleCollider } from "./CircleCollider"
import { BoxCollider } from "./BoxCollider"

export interface Collider {
    
    CheckPointInside(p: Point): boolean;

    CheckRayCollision(r: Ray): boolean;

    CheckCircleCollision(c: CircleCollider): boolean;

    CheckBoxCollision(b: BoxCollider): boolean;
}