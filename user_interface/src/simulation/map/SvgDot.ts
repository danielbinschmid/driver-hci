import type { Mesh, Vector3 } from "three";
import { MeshBase } from "./MeshBase";
import type { CustomSinCurve } from "./Pipe";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import type { Scene, Group } from "three";
export declare type SvgDotOptions = {
    path: CustomSinCurve,
    step: number,
    src: string,
    svgOffset: Vector3,
    onload: (svgMesh: SvgDot) => void
}

function getOpacityFromRGBA(rgba: string): number {
    const splits = rgba.split(",");
    if (splits.length == 4) {
        // a value is there
        return parseFloat(splits[3]);
    } {
        // only rgb
        return 1;
    }

}

export class SvgDot extends MeshBase {
    options: SvgDotOptions;
    _mesh?: Group;
    constructor(options: SvgDotOptions) {
        super();
        this._mesh = undefined;
        this.options = options;


        const loader = new SVGLoader();

        const vm = this;
        loader.load(
            options.src,
            (data) => {
                const paths = data.paths;
                console.log(data);
                const group = new THREE.Group();

                for ( let i = 0; i < paths.length; i ++ ) {

                    const path = paths[ i ];

                    var opacity = 1;

                    if (path.userData !== undefined) {
                        if (path.userData["style"]) {
                            if (path.userData["style"]["fill"] == "none") {
                                opacity = 0;
                            } else {
                                opacity =  getOpacityFromRGBA(path.userData.style.fill);
                               
                            }
                        }
                        
                    }
                    const material = new THREE.MeshBasicMaterial( {
                        color: path.color,
                        side: THREE.DoubleSide,
                        depthWrite: false,
                        transparent: true,
                        opacity: opacity
                    } );

                    const shapes = SVGLoader.createShapes( path );


                    var strokeColor = path.userData?.style.stroke;

                    if (strokeColor !== undefined && strokeColor !== 'none' && path.userData !== undefined) {
                        
                        var material_ = new THREE.MeshBasicMaterial( {
                            color: new THREE.Color().setStyle( strokeColor ),
                            opacity: path.userData.style.strokeOpacity,
                            transparent: path.userData.style.strokeOpacity < 1,
                            side: THREE.DoubleSide,
                            depthWrite: false
                        } );
                        
                        for (const subpath of path.subPaths) {
                            if (path.userData) {
                                const geometry  = SVGLoader.pointsToStroke(subpath.getPoints(), path.userData.style);
                                if ( geometry ) {
                                    var mesh = new THREE.Mesh( geometry, material_ );
                                    group.add( mesh );
                                }
                            }
    
                        }
                    }
                    

                    for ( let j = 0; j < shapes.length; j ++ ) {

                        const shape = shapes[ j ];
                        const geometry = new THREE.ShapeGeometry( shape );

                        const mesh = new THREE.Mesh( geometry, material );
                        
                        group.add( mesh );

                    }

                }
                
                group.scale.x = 0.5
                group.scale.y = 0.5
      
                vm._mesh = group;
                vm.updatePos(vm);
    
                

                vm.options.onload(vm);

            }, (progressEvent) => {

            }, (errorEvent) => {

            }
        )
        
   
    }



    addToScene(scene: Scene): void {
        if (this._mesh === undefined) { 
            console.error("svg not loaded but added to scene")
        } else {
            scene.add( this._mesh );
        }
       
    }

    updatePos(vm: SvgDot): void {
        const updatedPos = this.options.path.getPointAt(this.options.step);

        if (vm._mesh) {

            vm._mesh.position.x = updatedPos.x;
            vm._mesh.position.y = updatedPos.y - 50;
            vm._mesh.position.z = 1
        }
    }

    updateFrame(): void {
        
        this.updatePos(this);
    }
}