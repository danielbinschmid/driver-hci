import { GltfHandler } from "./GltfLoader";
import * as THREE from "three";
import { Clock, Material, Scene, Shader, ShaderMaterial, SkinnedMesh, Vector3 } from "three";
import { MeshBasicMaterialParameters } from "three";

export class DesignGlb extends GltfHandler {
    _material: Material;
    _position: Vector3;
    _meshes: THREE.Mesh[];
    _scene?: Scene;

    constructor(
        position = new Vector3(0, 0, 0),
        material: undefined | ShaderMaterial = undefined,
    ) {
        super();
        this._meshes = [];
        this._position = position;
        if (material === undefined) {
            this._material = this._initMaterial();
        } else {
            this._material = material;
        }
    }
    /**
     * 
     * @returns 231, 229, 225
     */


    _initMaterial(): Material {
        const params: MeshBasicMaterialParameters = {}
        params.color = 0x00ff00;
         
        const material = new THREE.MeshBasicMaterial(params)


        const depthParams:  THREE.MeshPhysicalMaterialParameters = {}
        depthParams.wireframe = true;
        depthParams.color = new THREE.Color(0.3, 0.3, 0.3);
        const depthMaterial = new THREE.MeshPhysicalMaterial(depthParams);
        // console.error("no material initialized for glb");
        return depthMaterial;
    }

    addToScene(scene: Scene) {

        // const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this._material);
        // mesh.position.x = this._position.x;
        // mesh.position.y = this._position.y;
        // mesh.position.z = this._position.z;
        // console.log(mesh);
        // scene.add(mesh);
        this._scene = scene;
        this.load("rear_mirror_blank.glb", this._loadCallback, this);
    }

    updateFrame() {
    }

    _meshCallback(res: SkinnedMesh, vm: DesignGlb) {
        if (res.geometry) {
            res.geometry.computeVertexNormals();

            
            // res.geometry.com
            // res.geometry.computeTangents();

            const mesh = new THREE.Mesh(res.geometry, vm._material);
            
            // const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this._material);
            const constantScale = 3;
            res.geometry.scale(
                constantScale,
                constantScale,
                constantScale
            );
            mesh.position.x = this._position.x;
            mesh.position.y = this._position.y;
            mesh.position.z = this._position.z;
            console.log(res.geometry);
            if (vm._scene) vm._scene.add(mesh);
        }
        
        
        
    }

    _loadCallback(gltf: any, vm: DesignGlb) {
        gltf.scene.traverse((res: any) => {
            vm._meshCallback(res, vm);
        });
    }
}

