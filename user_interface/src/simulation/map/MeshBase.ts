import type { Scene } from "three";




export abstract class MeshBase {
    options: any;
    _mesh?: any;
    constructor() {
    }

    abstract updateFrame(): void;

    reset() {
        
    }

    abstract addToScene(scene: Scene): void;
}