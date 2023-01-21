import type { Vector3 } from "three";
import * as THREE from "three"
import { MeshBase } from "./MeshBase";


export declare type RoadConfig = {
    path: CustomSinCurve,

}

export class CustomSinCurve extends THREE.Curve<THREE.Vector3> {
    scaleX: number;
    scaleY: number;
    center: Vector3;
    offsetStep: number;

	constructor( scaleX = 1, scaleY = 1 , center: Vector3, offsetStep: number) {
		super();
		this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.center = center;
        this.offsetStep = offsetStep;
	}

	getPoint(t: number, optionalTarget: THREE.Vector3 = new THREE.Vector3() ) {
        var tx = 0;
        var ty = 0;
        var tz = 0;
        t = t.toString() == "NaN"? 0: t 
        t = t + this.offsetStep;

        const FIRST_THRESHHOLD = 0.2;
        const SCND_THRESHHOLD = 0.8
        const SIN_HEIGHT = 0.2

        if (t < FIRST_THRESHHOLD) {
            tx = -0.5
            ty = (t - FIRST_THRESHHOLD) * (0.5 / FIRST_THRESHHOLD) ;

        } else if (t < SCND_THRESHHOLD) {
            let t_ = ((t - FIRST_THRESHHOLD) / (SCND_THRESHHOLD - FIRST_THRESHHOLD))

            tx = t_ - 0.5;
            ty = Math.sin( 2 * Math.PI * t_ ) * SIN_HEIGHT;
        } else {
            tx = 0.5;
            ty = (t - SCND_THRESHHOLD) * (0.5 / (1 - SCND_THRESHHOLD));
        }


        return optionalTarget.set( tx * this.scaleX + this.center.x, ty * this.scaleY + this.center.y, tz + this.center.z );

	}

}




export class Pipe extends MeshBase {
    private mesh: THREE.Mesh;

    options: RoadConfig;


    constructor(options: RoadConfig) {
        super();

        this.options = options;

        
        const geometry = new THREE.TubeGeometry( options.path, 200, 4, 8, false );
        const material = new THREE.MeshToonMaterial(  );

        const mesh = new THREE.Mesh( geometry, material );



        this.mesh = mesh;

    }

    addToScene(scene: THREE.Scene): void {
        scene.add(this.mesh);
    }

    updateFrame(): void {
        
    }
}