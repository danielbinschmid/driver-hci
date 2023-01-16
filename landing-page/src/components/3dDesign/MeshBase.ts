import { Scene } from "three";




export abstract class MeshBase {

    constructor() {
    }

    abstract updateFrame(): void;


    abstract addToScene(scene: Scene): void;
}