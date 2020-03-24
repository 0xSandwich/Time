import * as THREE from 'three'

let setup = {
    setupGroup:new THREE.Group(),
    ambiantL: new THREE.AmbientLight(0xffffff, 0.2),
    sunL: new THREE.DirectionalLight(0x00fffc, 0.8),
    spotL: new THREE.SpotLight(0x00ff9c, 1, 0, Math.PI * 0.1, 1),
    ground: new THREE.Mesh(
        new THREE.PlaneGeometry(10,10),
        new THREE.MeshPhongMaterial({
            color:0x19beff,
            shininess:100,
            side:THREE.DoubleSide
        })
    )
    ,
    init:function(){
        this.ground.rotation.x=1.5708
        this.ground.receiveShadow= true

        this.sunL.position.set(-2,3,4)
        this.sunL.castShadow=true
        this.sunL.shadowMapHeight=2048
        this.sunL.shadowMapWidth=2048

        this.spotL.position.set(-2,2,3)
        this.spotL.target.position.set(0,0,0)

        this.setupGroup.add(this.spotL)
        this.setupGroup.add(this.spotL.target)
        this.setupGroup.add(this.sunL)
        this.setupGroup.add(this.ground)
        return this.setupGroup
    }
}

export default setup