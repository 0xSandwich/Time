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
                _fbx.position.set(0,-0.1,0)
                _fbx.scale.set(0.005,0.005,0.005)
                _fbx.children[2].castShadow=true
                _fbx.children[2].receiveShadow=true
                this.sceneGroup.add(_fbx)
                for(let i=0;i < _fbx.children[2].children.length ; i++){
                    _fbx.children[2].children[i].castShadow=true
                    _fbx.children[2].children[i].receiveShadow=true
                }
            }
        )
        return this.sceneGroup
    }
}

export default sunDial