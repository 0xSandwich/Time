import * as THREE from 'three'

let setup = {
    walls: new THREE.Group(),
    setupGroup:new THREE.Group(),
    ambiantL: new THREE.AmbientLight(new THREE.Color('hsl(208,100%,74%)'), 0.2),
    sunL: new THREE.DirectionalLight(new THREE.Color('hsl(208,100%,74%)'), 0.3),
    spotL: new THREE.SpotLight(0xFFFFFF, 0.4, 0, Math.PI * 0.1, 1),
    ground: new THREE.Mesh(
        new THREE.CylinderGeometry(5,5,0.2,50,10,false),
        new THREE.MeshPhongMaterial({
            color:0xFFFFFF,
            shininess:100,
            reflectivity:1,
            side:THREE.DoubleSide
        })
    ),
    wall: new THREE.Mesh(
        new THREE.CylinderGeometry(5,5,0.2,50,10,false),
        new THREE.MeshPhongMaterial({
            color:0xFFFFFF,
            side:THREE.DoubleSide
        })
    ),
    wallL: new THREE.Mesh(
        new THREE.CylinderGeometry(5,5,0.2,50,10,false),
        new THREE.MeshPhongMaterial({
            color:0xFFFfff,
            side:THREE.DoubleSide
        })
    ),
    wallR: new THREE.Mesh(
        new THREE.CylinderGeometry(5,5,0.2,50,10,false),
        new THREE.MeshPhongMaterial({
            color:0xFFFfff,
            side:THREE.DoubleSide
        })
    )
    ,
    init:function(){
        this.ground.rotation.y=1.5708
        this.ground.position.y=-0.2
        this.ground.receiveShadow= true

        this.wall.rotation.x = 1.5708
        this.wall.position.z=-1.5
        this.wall.receiveShadow=true

        this.wallR.rotation.x = 1.5708
        this.wallR.rotation.z = 1.5708
        this.wallR.position.x=1.5
        this.wallR.receiveShadow=true

        this.wallL.rotation.x = 1.5708
        this.wallL.rotation.z = 1.5708
        this.wallL.position.x=-1.5
        this.wallL.receiveShadow=true

        this.sunL.position.set(-4,4,4)
        this.sunL.castShadow=true
        this.sunL.shadow.mapSize.height=2048
        this.sunL.shadow.mapSize.width=2048
        const d = 2;
        this.sunL.shadow.camera.left = - d;
        this.sunL.shadow.camera.right = d;
        this.sunL.shadow.camera.top = d;
        this.sunL.shadow.camera.bottom = - d;

        this.spotL.position.set(-2,2,3)
        this.spotL.target.position.set(0,0,0)


        this.walls.add(this.wall)
        this.walls.add(this.ground)
        this.walls.add(this.wallL)
        this.walls.add(this.wallR)
        this.setupGroup.add(this.spotL)
        this.setupGroup.add(this.ambiantL)
        this.setupGroup.add(this.spotL.target)
        this.setupGroup.add(this.sunL)
        this.setupGroup.add(this.walls)
        return this.setupGroup
    }
}

export default setup