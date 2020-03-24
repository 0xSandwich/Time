import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let sunDial = {
    fbxLoader:new FBXLoader(),
    gltfLoader:new GLTFLoader(),
    // Le groupe dans lequel tous les mesh doivent être ajouter
    sceneGroup:new THREE.Group(),
    init:function(){
        this.gltfLoader.load(
            '/three-models/sundial/sundial.gltf',
            (_gltf)=>{
                let scene = _gltf.scene.children[0]
                let sun = scene.children[0].children[0]
                sun.material=new THREE.MeshBasicMaterial({color:0xfcba03})
                scene.position.set(0,-0.1,0)
                scene.scale.set(0.005,0.005,0.005)
                console.log(sun)
                this.sceneGroup.add(scene)
                scene.children[1].traverse((child)=>{
                    child.material=new THREE.MeshPhysicalMaterial({reflectivity:2})
                    child.castShadow=true
                    console.log(child)
                    child.receiveShadow=true
                })
            }
        )
        return this.sceneGroup
    }
}

export default sunDial