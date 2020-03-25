import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let sunDial = {
    gltfLoader:new GLTFLoader(),
    sceneGroup:new THREE.Group(),
    init:function(){
        this.gltfLoader.load(
            'three-models/sundial/sundial.gltf',
            (_gltf)=>{
                let scene = _gltf.scene.children[0]
                let sun = scene.children[0].children[1]
                sun.children[0].material=new THREE.MeshBasicMaterial({color:0xffffff})
                scene.position.set(0,-0.1,0)
                scene.scale.set(0.005,0.005,0.005)
                scene.children[1].traverse((child)=>{
                    child.material=new THREE.MeshPhysicalMaterial({roughness:0.8,flatShading:true})
                    child.castShadow=true
                    child.receiveShadow=true
                })
                scene.children[1].children[0].material = new THREE.MeshPhysicalMaterial({color:0x0099ff,roughness:0.9})
                this.sceneGroup.add(scene)
            }
        )
        return this.sceneGroup
    }
}

export default sunDial