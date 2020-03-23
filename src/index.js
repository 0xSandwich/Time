import './style/main.styl'
import * as THREE from 'three'
import Container from './three-layout/Container.js'
import {TweenLite} from 'gsap/all'

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

/**
 * Resize
 */
window.addEventListener('resize', () =>
{ 
    // Update sizes object
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 1
scene.add(camera)
let mouse = {}
function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    camera.position.x=-(mouse.x/2)
    camera.position.y=-(mouse.y/2)
    camera.rotation.y=-(mouse.x/2)
    camera.rotation.x=(mouse.y/2)
}
window.addEventListener( 'mousemove', onMouseMove, false );

/**
 * Objects
 */
let slider = {
    curIndex:0,
    containerAray:[],
    group:new THREE.Group(),
    settings:{
        width:2,
        height:1,
        depth:1
    },
    init : function() {
        for(let i=0;i<3;i++){
            console.log(this)
            this.containerAray.push(new Container(this.settings.width,this.settings.height,this.settings.depth,i*this.settings.width))
            this.group.add(this.containerAray[i].group)
            scene.add(this.group)
        }
    },
    goTo: function(target) {
        if(target>=this.containerAray.length){
            target=0
        }
        console.log(this.curIndex*this.settings.width)
        TweenLite.to(
            this.group.position,
            2,
            {
                x:-(target*this.settings.width),
                ease:'Power3.easeInOut'
            }
            )
        this.curIndex = target
    } 
}
slider.init()

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.2,0.2,0.2),
    new THREE.MeshBasicMaterial({color:0x82f222})
)
slider.containerAray[0].group.add(cube)

const cubeD = new THREE.Mesh(
    new THREE.BoxGeometry(0.2,0.2,0.2),
    new THREE.MeshBasicMaterial({color:0xfff444})
)
slider.containerAray[1].group.add(cubeD)

const cubeE = new THREE.Mesh(
    new THREE.BoxGeometry(0.2,0.2,0.2),
    new THREE.MeshBasicMaterial({color:0x22f888})
)
slider.containerAray[2].group.add(cubeE)


// Next scene handling
const btnNext = document.querySelector('#next-btn')
btnNext.addEventListener('click',()=>{
    slider.goTo(slider.curIndex+1)
}, false)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Render
    renderer.render(scene, camera)
}

loop()