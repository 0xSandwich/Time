import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let hourGlass = {
    gltfLoader:new GLTFLoader(),
    sceneGroup:new THREE.Group(),
    sandMaterial: new THREE.MeshPhongMaterial({color:0xffffff}),
    sandGeometry: new THREE.CylinderGeometry(0.06,0.06,0.2,30,10,false),
    objectsMaterial: new THREE.MeshPhysicalMaterial({reflectivity:1,roughness:0.8,flatShading:true}),
    glassMaterial: new THREE.MeshPhysicalMaterial({color:0xffffff,transparent:true,opacity:0.2}),

    // Chargement modèle sablier
    init:function(){

        this.gltfLoader.load(
            'three-models/hourglass/hourglass.gltf',
            (_gltf)=>{
                let scene = _gltf.scene.children[0]
                let hourGlassGroup = scene.children[0]
                let hourGlassMesh = hourGlassGroup.children[0]
                let hourGlassGlass = hourGlassGroup.children[1]
                scene.position.set(0,-0.1,0)
                scene.scale.set(0.0013,0.0013,0.0013)

                hourGlassGlass.material=this.glassMaterial
                hourGlassMesh.material = this.objectsMaterial
                hourGlassMesh.castShadow=true;
                hourGlassMesh.receiveShadow=true

                this.sceneGroup.add(scene)
            }
        )

        // Sable
        let sandBot = new THREE.Mesh(this.sandGeometry,this.sandMaterial)
        sandBot.geometry.translate(0,0.1,0)
        sandBot.position.y=-0.1
        sandBot.scale.y=0.1
        
        let sandTop = new THREE.Mesh(this.sandGeometry,this.sandMaterial)
        sandTop.position.y=0.2
        sandTop.scale.y=1

        // Ajouter ici tous les mesh créés au groupe
        this.sceneGroup.add(sandBot)
        this.sceneGroup.add(sandTop)
        this.sceneGroup.traverse((child)=>{
            child.castShadow=true
            child.receiveShadow=true
        })
        // On retourne l'ensemble de la scène
        return this.sceneGroup
    }
}

export default hourGlass