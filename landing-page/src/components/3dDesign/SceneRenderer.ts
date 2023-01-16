import * as THREE from "three";
import {
    ColorRepresentation,
    Color,
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    Vector3,
    Mesh,
    Camera,
    WebGLRendererParameters,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DesignGlb } from "./DesignGlb";
import { MeshBase } from "./MeshBase";



export class SceneRenderer {
    _renderer: WebGLRenderer;
    _scene: Scene;
    _camera: PerspectiveCamera;
    _canvas: HTMLCanvasElement;
    private _meshes: MeshBase[];

    
    constructor() {
        // initialize
        this._meshes = [];
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
        this._canvas = canvas;
        console.log(canvas);
        
         
        const webglParams: WebGLRendererParameters = {

            canvas: canvas,
            antialias: true
        }
        this._renderer = new THREE.WebGLRenderer(webglParams);
        this._renderer.setSize(window.innerWidth, window.innerHeight);

        
        window.addEventListener(
            "resize",
            () => {
                if (this._camera) this._camera.aspect = window.innerWidth / window.innerHeight;
                if (this._camera) this._camera.updateProjectionMatrix();
                if (this._renderer) this._renderer.setSize(window.innerWidth, window.innerHeight);
            },
            false
        );

        // orbit control
        const orbitcontrols = new OrbitControls(this._camera, this._canvas);
        orbitcontrols.position0 = this._camera.position;
        this._initScene();


        this.animate(this);

    }



    _initScene() {
        // ----------- STATIC FIXED POSITIONS ------------
        // camera
        const cameraPos: Vector3 = new Vector3(0, -300, 0);  // Starting position of camera

        // dragon pos
        const designCenter = new Vector3(0, 0, 0); // dragon position


        // 231, 229, 225 = 0.9058, 0.898, 0.88235

        // background color
        const backgroundColor: ColorRepresentation = new Color(0.9058, 0.898, 0.88235); // rgb(240, 248, 255) rgb(229.5, 229.5, 255)
        this._renderer.setClearColor(backgroundColor);

        // add light
        const light = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2); // soft white light
        this._scene.add(light);

        const directionalLightFront = new THREE.DirectionalLight(new THREE.Color(1, 1, 1), 1);
        directionalLightFront.position.set(0, -100, 0);
        this._scene.add(directionalLightFront);

        const directionalLightLeft = new THREE.DirectionalLight(new THREE.Color(1, 1, 1), 1);
        directionalLightLeft.position.set(100, 0, 0);
        this._scene.add(directionalLightLeft);

        const directionalLightBack = new THREE.DirectionalLight(new THREE.Color(1, 1, 1), 1);
        directionalLightBack.position.set(100, 0, 0);
        this._scene.add(directionalLightBack);


        const pointLight = new THREE.PointLight( new THREE.Color(1, 1, 1), 1, 100 );
        pointLight.position.set( 0, -100, 0);
        this._scene.add( pointLight );

        

        // ------------------- MESHES ---------------------

        const designGlb = new DesignGlb(designCenter, undefined);
        this._addMesh(designGlb);


        // CAMERA MOVEMENTS
        this._camera.position.x = cameraPos.x;
        this._camera.position.y = cameraPos.y;
        this._camera.position.z = cameraPos.z;

        this._camera.lookAt(designCenter);
    }

    _addMesh(mesh: MeshBase) {
        this._meshes.push(mesh);
        mesh.addToScene(this._scene);
    }

    
    animate(vm: SceneRenderer) {
        requestAnimationFrame(() => {
            this.animate(vm);
        });
        this._renderer.render(this._scene, this._camera);
    }
}