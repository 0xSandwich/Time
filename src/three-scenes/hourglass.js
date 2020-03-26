import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let hourGlass = {
    gltfLoader:new GLTFLoader(),
    sceneGroup:new THREE.Group(),
    wrapper:new THREE.Group(),
    hourGlassWrapper:new THREE.Group(),
    decoration:new THREE.Group(),
    sandMaterial: new THREE.MeshPhysicalMaterial({color:0xfff700,reflectivity:1,roughness:0.9}),
    sandGeometry: new THREE.CylinderGeometry(0.06,0.06,0.2,30,10,false),
    objectsMaterial: new THREE.MeshPhysicalMaterial({roughness:0.8,flatShading:true}),
    glassMaterial: new THREE.MeshPhysicalMaterial({color:0xffffff,transparent:true,opacity:0.2,roughness:0.3,metalness:0.4}),

    // Chargement modèle sablier
    init:function(){

        this.gltfLoader.load(
            'three-models/hourglass/hourglass.gltf',
            (_gltf)=>{
                this.sceneGroup.name="sceneGroup"
                this.wrapper.name="wrapper"
                this.decoration.name="deco"
                this.hourGlassWrapper.name="hourglasswrapper"
                let hourGlassGroup = _gltf.scene.children[0].children[0]
                let hourGlassMesh = hourGlassGroup.children[0]
                let hourGlassGlass = hourGlassGroup.children[1]
                hourGlassGroup.position.set(0,0.165,0)
                hourGlassGroup.scale.set(0.0013,0.0013,0.0013)

                let decor = _gltf.scene.children[0].children[1]
                decor.position.set(0,-0.075,0)
                decor.scale.set(0.0013,0.0013,0.0013)
                decor.traverse(child => {
                    child.castShadow= true
                    child.receiveShadow = true
                    child.material=this.objectsMaterial
                })
                this.decoration.add(decor)

                hourGlassGlass.material=this.glassMaterial
                hourGlassMesh.material = this.objectsMaterial
                hourGlassMesh.castShadow=true;
                hourGlassMesh.receiveShadow=true

                this.hourGlassWrapper.add(hourGlassGroup)

                this.sceneGroup.add(this.hourGlassWrapper)
            }
        )

        // Sable
        let sandBot = new THREE.Mesh(this.sandGeometry,this.sandMaterial)
        sandBot.geometry.translate(0,0.1,0)
        sandBot.position.y=-0.1
        sandBot.scale.y=0.7
        
        let sandTop = new THREE.Mesh(this.sandGeometry,this.sandMaterial)
        sandTop.position.y=0.2
        sandTop.scale.y=0.3

        this.hourGlassWrapper.add(sandBot)
        this.hourGlassWrapper.add(sandTop)
        this.hourGlassWrapper.position.y=-0.2
        this.sceneGroup.position.y=0.2

        this.sceneGroup.traverse((child)=>{
            child.castShadow=true
            child.receiveShadow=true
        })
        this.wrapper.add(this.sceneGroup)
        this.wrapper.add(this.decoration)
        return this.wrapper
    }
}

export default hourGlass