import { Scene } from "three";




export abstract class MeshBase {

    constructor() {
    }

    abstract updateFrame(): void;

    reset() {
        
    }

    abstract addToScene(scene: Scene): void;
}