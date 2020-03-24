import * as THREE from 'three'

let camera = {
    mouse:{x:0,y:0},
    cameraWrapper:new THREE.Group(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight),
    init: function(){
        this.camera.position.z = 0.7
        this.cameraWrapper.position.y=0.2
        this.cameraWrapper.rotation.x=-0.3
        window.addEventListener( 'mousemove', ()=>(this.onMouseMove(event)), false );
        this.cameraWrapper.add(this.camera)
        return this.cameraWrapper
    },
    onMouseMove: function(event) {
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        this.camera.position.x=-(this.mouse.x/4)
        this.camera.position.y=-(this.mouse.y/4)
        this.camera.rotation.y=-(this.mouse.x/4)
        this.camera.rotation.x=(this.mouse.y/4)
    }
}

export default camera