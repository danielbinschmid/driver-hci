import type { Mesh, Scene, Vector3 } from "three";
import { MeshBase } from "./MeshBase";
import type { CustomSinCurve } from "./Pipe";
import * as THREE from "three";

export declare type DotOptions = {
    path: CustomSinCurve,
    step: number
}

export class Dot extends MeshBase {
    options: DotOptions;
    _mesh: Mesh;
    constructor(options: DotOptions) {
        super();
        
        this.options = options;


        const geometry = new THREE.BoxGeometry( 30, 30, 1 );
        const material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
        const cube = new THREE.Mesh( geometry, material );
        
        const startPos = options.path.getPointAt(options.step);
        
        cube.position.x = startPos.x;
        cube.position.y = startPos.y;
        cube.position.z = 1

        this._mesh = cube;
    }

    addToScene(scene: Scene): void {

        scene.add( this._mesh );
    }

    updateFrame(): void {
        const updatedPos = this.options.path.getPointAt(this.options.step);
        
        this._mesh.position.x = updatedPos.x;
        this._mesh.position.y = updatedPos.y;
        this._mesh.position.z = 1
    }
}