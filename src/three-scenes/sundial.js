import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

let sunDial = {
    loader:new FBXLoader(),
    // Le groupe dans lequel tous les mesh doivent être ajouter
    sceneGroup:new THREE.Group(),
    init:function(){
        this.loader.load(
            '/three-models/sundial/sundial.fbx',
            (_fbx)=>{
                _fbx.children[1].position.set(0,0,0)
                _fbx.children[1].scale.set(0.005,0.005,0.005)
                _fbx.children[1].castShadow=true
                _fbx.children[1].receiveShadow=true
                this.sceneGroup.add(_fbx)
                console.log(_fbx.children)
            }
        )
        return this.sceneGroup
    }
}

export default sunDial