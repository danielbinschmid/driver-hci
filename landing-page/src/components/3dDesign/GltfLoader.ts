import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshBase } from "./MeshBase";


export abstract class GltfHandler extends MeshBase {
	_loader;
	constructor() {
        super();
		this._loader = new GLTFLoader();
	}


    load(gltfLoc: string, loadCallback: (gltf: any, vm: any) => void, vm: GltfHandler) {
        this._loader.load(
            gltfLoc,
            (gltf) => {
                loadCallback(gltf, vm);
            },
            (xhr) => {
                // called while loading is progressing
                // console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
            },
            (error) => {
                // called when loading has errors
                console.error("An error happened", error);
            }
        );
    }
}
