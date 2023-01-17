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
    private _renderer: WebGLRenderer;
    private _scene: Scene;
    private _camera: PerspectiveCamera;
    _canvas: HTMLCanvasElement;
    private _meshes: {[name: string]: MeshBase | DesignGlb};
    private initialCameraPos: Vector3 | undefined;
    options: SceneOptions3D;
    
    constructor(options: SceneOptions3D) {
        // initialize
        this.options = options;
        this._meshes = {};
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
        this._renderer.setSize(options.width, options.height);

        
        window.addEventListener(
            "resize",
            () => {
                if (this._camera) this._camera.aspect = this.options.width / this.options.height;
                if (this._camera) this._camera.updateProjectionMatrix();
                if (this._renderer) this._renderer.setSize(this.options.width, this.options.height);
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

        const designGlb = new DesignGlb(new Vector3(designCenter.x - 30, designCenter.y + 0, designCenter.z - 100), undefined);
        this._addMesh(designGlb, "design");


        // CAMERA MOVEMENTS
        this._camera.position.x = cameraPos.x;
        this._camera.position.y = cameraPos.y;
        this._camera.position.z = cameraPos.z;
        this.initialCameraPos = cameraPos;

        this._camera.lookAt(designCenter);
    }

    _addMesh(mesh: MeshBase, name: string) {
        this._meshes[name] = mesh;
        mesh.addToScene(this._scene);
    }

    resetScene() {
        if (this.initialCameraPos) {
            this._camera.position.x = this.initialCameraPos.x;
            this._camera.position.y = this.initialCameraPos.y;
            this._camera.position.z = this.initialCameraPos.z;
            this._camera.lookAt(new Vector3(0, 0, 0));

        }

        
    }

    
    animate(vm: SceneRenderer) {
        requestAnimationFrame(() => {
            this.animate(vm);
        });

        if (this.options.rotateDesign) this._meshes["design"].updateFrame();

        this._renderer.render(this._scene, this._camera);
    }
}