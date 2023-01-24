import * as THREE from "three";
import {
    
    Color,
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    Vector3,
    Mesh,
    Camera,
    OrthographicCamera,
    
} from "three";
import type {ColorRepresentation, WebGLRendererParameters } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import type { MeshBase } from "./MeshBase";
import { CustomSinCurve, Pipe } from "./Pipe";
import type { RoadConfig} from "./Pipe";
import { Dot, type DotOptions } from "./Dot";
import { SvgDot } from "./SvgDot";
import type { SvgDotOptions } from "./SvgDot";

declare type Coords = {
    x: number,
    y: number
}


export class SceneRenderer {
    private _renderer: WebGLRenderer;
    private _scene: Scene;
    private _camera: OrthographicCamera;
    _canvas: HTMLCanvasElement;
    private _meshes: {[name: string]: MeshBase | SvgDot};
    private initialCameraPos: Vector3 | undefined;
    options: SceneOptions3D;
    private step: number;
    private path?: CustomSinCurve
    private cameraPos: Vector3;
    private intervals: NodeJS.Timer[];

    constructor(options: SceneOptions3D) {
        // initialize
        this.intervals = [];
        this.step = 0;
        this.cameraPos = new Vector3(0, 0, 0);
        this.options = options;
        this._meshes = {};
        this._scene = new THREE.Scene();
        this._camera = new THREE.OrthographicCamera(
            0, options.width, 
            0, options.height, 
            0, 100
        )
        const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(options.canvasID);
        this._canvas = canvas;
        
         
        const webglParams: WebGLRendererParameters = {
            alpha: true,
            canvas: canvas,
            antialias: true
        }
        this._renderer = new THREE.WebGLRenderer(webglParams);
        this._renderer.setSize(options.width, options.height);

         


        // orbit control
        const orbitcontrols = new OrbitControls(this._camera, this._canvas);
        orbitcontrols.position0 = this._camera.position;
        this._initScene();


        this.animate(this);

    }

    resize() {

    }

    private _translateCoordinates(coords: Coords): Coords {
        
        return {
            x: coords.x * (this.options.width / 100),
            y: coords.y * (this.options.height / 100)
        }
    }

    startAnimation() {
        if (this._meshes["own_car"] === undefined || this._meshes["other_car"] === undefined) {
            console.error("meshes not defined yet");
        }  

        const ownCarMesh: SvgDot | MeshBase = this._meshes["own_car"];
        const otherCarMesh = this._meshes["other_car"];

        const ownCarInterval = setInterval(() => {
                
            
            if (ownCarMesh.options.step >= 0.1) {
                ownCarMesh.options.step -= 0.0008
            } else if (ownCarMesh.options.step >= -0.35) {
                ownCarMesh.options.step -= 0.0004
            } else if(ownCarMesh.options.step >= -0.85){
                ownCarMesh.options.step -= 0.0008
            } else {
                clearInterval(ownCarInterval);
            }

            if (this.path) {
                const pos = this.path.getPoint(ownCarMesh.options.step);
                this.cameraPos.set(pos.x, pos.y, pos.z);
            } else {
                console.error("road-path not defined");
            }
    
        }, 10);
        
        const otherCarInterval = setInterval(() => {
            // speed of front car is (0.05714 steps / second) 71428
            if (otherCarMesh.options.step >= -0.6) otherCarMesh.options.step -= 0.0004

        }, 10);
        
        this.intervals = []
        this.intervals.push(ownCarInterval);
        this.intervals.push(otherCarInterval);

    }

    stopAnimation() {
        for (const interval of this.intervals) {
            clearInterval(interval);
        }
        this.intervals = [];
    }

    resetAnimation() {
        for (const interval of this.intervals) {
            clearInterval(interval);
        }
        this.intervals = [];

        if (this._meshes["own_car"] === undefined || this._meshes["other_car"] === undefined) {
            console.error("meshes not defined yet");
        }  

        const ownCarMesh: SvgDot | MeshBase = this._meshes["own_car"];
        const otherCarMesh = this._meshes["other_car"];

        ownCarMesh.reset();
        otherCarMesh.reset();
    }
 
    private _initScene() {
        // ----------- STATIC FIXED POSITIONS ------------
        // camera
        // camera
        const cameraPos: Vector3 = new Vector3(0, 0, 30);  // Starting position of camera

        // dragon pos
        const designCenter = new Vector3(0, 0, 0); // dragon position


        // 231, 229, 225 = 0.9058, 0.898, 0.88235

        // background color
        const backgroundColor: ColorRepresentation = new Color(0.9058, 0.898, 0.88235); // rgb(240, 248, 255) rgb(229.5, 229.5, 255)
        this._renderer.setClearColor(backgroundColor, 0);

        // add light
        const light = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2); // soft white light
        this._scene.add(light);




        const pointLight = new THREE.PointLight( new THREE.Color(1, 1, 1), 1, 100 );
        pointLight.position.set( 0, -100, 0);
        this._scene.add( pointLight );

        

        // ------------------- MESHES ---------------------

        // const designGlb = new DesignGlb(new Vector3(designCenter.x - 30, designCenter.y + 0, designCenter.z - 100), undefined);


        

        const roadPos = this._translateCoordinates({
            x: 50,
            y: 50
        })
        const path = new CustomSinCurve( this.options.width / 2, this.options.height, new Vector3(roadPos.x, roadPos.y, 0), 0);
        this.path = path;
        const roadOptions: RoadConfig = {
            path: path
        }
        const pipe = new Pipe(roadOptions);
        this._addMesh(pipe, "road");


        this._addMesh(new Pipe({
            path: new CustomSinCurve( this.options.width / 2, this.options.height, new Vector3(roadPos.x, roadPos.y, 0), -1)
        }), "road_before");
        this._addMesh(new Pipe({
            path: new CustomSinCurve( this.options.width / 2, this.options.height, new Vector3(roadPos.x, roadPos.y, 0), 1)
        }), "road_after");
        this._addMesh(new Pipe({
            path: new CustomSinCurve( this.options.width / 2, this.options.height, new Vector3(roadPos.x, roadPos.y, 0), -2)
        }), "road_after_2");
        //const dotOptions: DotOptions = {
        //    path: path,
        //    step: 1
        //}
        //const dot = new Dot(dotOptions);
        //this._addMesh(dot, "own_car");

        const selfCarOpts: SvgDotOptions = {
            path: path,
            step: 0.52, 
            startStep: 0.52,
            src: "/other_transparent_2.svg", // "/loc_transparent.svg",
            svgOffset: new Vector3(0, 0, 0),// new Vector3(200, -260, 0),
            onload: (svgMesh) => {
                
                this._addMesh(svgMesh, "other_car");
                
            }
        }
        const selfCar = new SvgDot(selfCarOpts);

        this.cameraPos = path.getPoint(0);
        
        const otherCarOpts: SvgDotOptions = {
            path: path,
            step: 1, 
            startStep: 1,
            src: "/loc_transparent.svg", // "/loc_transparent.svg",
            svgOffset: new Vector3(0, 0, 0),// new Vector3(200, -260, 0),
            onload: (svgMesh) => {
                
                this._addMesh(svgMesh, "own_car");
                
            }
        }
        const otherCar = new SvgDot(otherCarOpts);

        
        /**
         * const geometry = new THREE.BoxGeometry( 30, 30, 1 );
        const material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
        const cube = new THREE.Mesh( geometry, material );
         */
        // const cubePos = this._translateCoordinates({
        //     x: 50,
        //     y: 50
        // });
        // cube.position.x = cubePos.x;
        // cube.position.y = cubePos.y;
        // cube.position.z = 0;
        // this._scene.add( cube );
        // this._addMesh(designGlb, "design");


        // CAMERA MOVEMENTS
        this._camera.position.x = cameraPos.x;
        this._camera.position.y = cameraPos.y;
        this._camera.position.z = cameraPos.z;
        this.initialCameraPos = cameraPos;

        this._camera.lookAt(designCenter);
    }

    private _addMesh(mesh: MeshBase, name: string) {
        this._meshes[name] = mesh;
        mesh.addToScene(this._scene);
    }


    private _moveCamera() {

        this._camera.position.x = this.cameraPos.x - this.options.width / 2;
        this._camera.position.y = this.cameraPos.y - this.options.height / 2;
    

        this._camera.updateProjectionMatrix();
    }

    animate(vm: SceneRenderer) {
        requestAnimationFrame(() => {
            this.animate(vm);
        });

        if (this.options.rotateDesign) this._meshes["design"].updateFrame();

        
        // this._meshes["own_car"].updateFrame();
        
        

        if (this._meshes["own_car"] && this.path !== undefined) {
            this._meshes["own_car"].updateFrame();

            this.cameraPos.set(this._meshes["own_car"]._mesh.position.x, this._meshes["own_car"]._mesh.position.y + 50, 0);
            this._moveCamera()
        }
        if (this._meshes["other_car"]) this._meshes["other_car"].updateFrame();
       

        this._renderer.render(this._scene, this._camera);
    }
}