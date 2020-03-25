import * as THREE from 'three'

export default class Container{
    constructor(width,height,depth,posX){
        this.group = new THREE.Group()
        const containerGeometry = new THREE.BoxGeometry(width,height,depth)
        const containerMaterial = new THREE.MeshBasicMaterial({visible:false})
        const containerMesh = new THREE.Mesh(containerGeometry,containerMaterial)
        this.group.position.x=posX
        this.group.add(containerMesh)
    }
}