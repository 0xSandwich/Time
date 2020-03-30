import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {TweenLite} from 'gsap/all'
import {TimelineLite} from 'gsap/all'

let clock = {
    gltfLoader:new GLTFLoader(),
    sceneGroup:new THREE.Group(),
    objectMaterial: new THREE.MeshPhysicalMaterial({color:0xbf63be,roughness:0.9}),
    decoMaterial:new THREE.MeshPhysicalMaterial({roughness:0.8,flatShading:true}),
    init:function(){
        this.gltfLoader.load(
            'three-models/clock/clock.gltf',
            (_gltf)=>{
                const scene = _gltf.scene.children[0]
                scene.position.set(0,-0.1,0)
                scene.scale.set(0.005,0.005,0.005)

                for(let i =0;i<2;i++){
                    scene.children[i].traverse(child=>{
                        child.receiveShadow=true
                        child.castShadow=true
                        child.material=this.decoMaterial
                    })
                }
                scene.children[0].children[1].material = this.objectMaterial
                const massTl = new TimelineLite({
                    onComplete: function() {
                      this.restart();
                    }
                  }).fromTo(scene.children[1].children[3].rotation,1,{z:3.4,ease:'Power3.easeInOut'},{z:2.8,ease:'Power3.easeInOut'})
                  .fromTo(scene.children[1].children[3].rotation,1,{z:2.8,ease:'Power3.easeInOut'},{z:3.4,ease:'Power3.easeInOut'})

                const marrowTl = new TimelineLite({
                    onComplete: function() {
                      this.restart();
                    }
                  }).fromTo(scene.children[1].children[2].rotation,60,{z:0},{z:-6.28319,ease:"steps(60)"})

                const gearTopTl = new TimelineLite({
                    onComplete:function(){
                        this.restart()
                    }
                }).fromTo(scene.children[1].children[0].rotation,60,{z:0},{z:-6.28319})

                const gearBotTl = new TimelineLite({
                    onComplete:function(){
                        this.restart()
                    }
                }).fromTo(scene.children[1].children[1].rotation,60,{z:0.2},{z:6.48319})

                this.sceneGroup.add(scene)
            }
        )
        // On retourne l'ensemble de la scène
        return this.sceneGroup
    }
}

export default clock