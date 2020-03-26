import './style/main.styl'
import * as THREE from 'three'
import camera from './three-required/camera.js'
import setUp from './three-scenes/setup.js'
import Container from './three-layout/Container.js'
import sunDial from './three-scenes/sundial.js'
import hourGlass from './three-scenes/hourglass.js'
import clock from './three-scenes/clock.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {TweenLite} from 'gsap/all'
import * as dat from 'dat.gui';

const sceneSettings = {
    spotPosX:-1.6,
    spotIntensity:4.6,
    spotBlur:Math.PI * 0.1,
    spotLPenumbra:1,
    sunLintensity:1,
    ambiantLIntensity:0.8,
    set:function(){
        setUp.spotL.intensity=this.spotIntensity
        setUp.spotL.position.x=this.spotPosX
        setUp.spotL.angle=this.spotBlur
        setUp.spotL.penumbra=this.spotLPenumbra
        setUp.ambiantL.intensity=this.ambiantLIntensity
        setUp.sunL.intensity=this.sunLintensity
    }
}
sceneSettings.set()


/**
 * Scene
 */
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x2f2f2f)
scene.fog = new THREE.Fog( scene.background, 1, 4 );

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

    // Update composer
    composer.setSize( sizes.width, sizes.height );

    // Update camera
    camera.camera.aspect = sizes.width / sizes.height
    camera.camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

// Camera
scene.add(camera.init())

// Light & Ground setup
scene.add(setUp.init())

/**
 * Parallax
 */
const $cursorParallax = document.querySelectorAll('.parallax')
window.addEventListener('mousemove', (_event)=>
{
    $cursorParallax.forEach((_element, _key)=>
    {
        const strength = _key + 0.1
        const translateX = -camera.mouse.x  * 10 * strength
        const translateY = camera.mouse.y * 10 * strength
        _element.style.transform = `translateX(${translateX}%) translateY(${translateY}%)`
    })
})

/**
 * Cursor
 */
const cursor = document.querySelector('.cursor')

    document.addEventListener('mousemove', (e) =>
    {
        cursor.setAttribute("style", "top: " + e.pageY + "px; left:" + e.pageX + "px;")
    })


/**
 * Objects
 */
let slider = {
    curIndex:0,
    containerAray:[],
    sceneAray:[sunDial.init(),hourGlass.init(),clock.init()],
    interactDOM:document.querySelector('#interaction'),
    infoDOM:document.querySelector('#info'),
    sceneInteract:[
        "<p>Move your mouse across the window to move thun sun</p>",
        "<p>Click here to turn the hourglass</p>",
        "<p>Click here to learn more about the mechanism</p>"
    ],
    startInit : [
        document.querySelector('#start'),
        document.querySelector('.hours'),
        document.querySelector('.home')
        
    ],
    timeline : [
        document.querySelector('.date.sundial'),
        document.querySelector('.date.hourglass'),
        document.querySelector('.date.pendulum-clock'),
        document.querySelector('#line')
    ],
    sceneInfoDom:[
        document.querySelector('#title'),
        document.querySelector('#description'),
        document.querySelector('#question'),
        document.querySelector('#answer')
    ],
    sceneData:[
        [
            "Sundial",
            "Sundials are the oldest known devices that are used to measure time. It depends on the rotation and movement of the sun. As the sun moves from east to west, the shadows formed predict the time of the day. The Egyptians were the first to use the sundials. They used a stick or pillar called the gnomon. Time was calculated depending on the length of the shadow.",
            "What should we put the sundial on ?",
            "Whether it's a pedestal, a low wall, a water basin, on the patio, on a flowerpot, it can be used for anything. You can let your imagination run wild.",
            {
                r:0,
                g:0.45,
                b:1
            }
        ],
        [
            "Hourglass",
            "Its predecessor the clepsydra, is known to have existed in Babylon and Egypt as early as the 16th century BCE. The hourglass first appeared in Europe in the eighth century, and may have been made by Luitprand, a monk at the cathedral in Chartres, France. It appears to have been widely used throughout Western Europe from that time through 1500.",
            "What's the difference between a clepsydra and an hourglass ?",
            "The clepsydra measures the flow of water, and the hourglass measures the flow of sand.",
            {
                r:0.8,
                g:0.5,
                b:0
            }
        ],
        [
            "Pendulum",
            "One of the earliest known uses of a pendulum was a 1st-century seismometer device of Han Dynasty Chinese scientist Zhang Heng. Italian scientist Galileo Galilei was the first to study the properties of pendulums, beginning around 1602. Galileo discovered the crucial property that makes pendulums useful as timekeepers, called isochronism.",
            "How does the mechanism of a clock work ?",
            "The operation of a mechanical clock is based on the combination of three elements, a source of energy for the rotational movement, a regulator, and a pendulum gives a precise time reference",
            {
                r:1,
                g:0.43,
                b:0.79
            }
        ]
    ],
    group:new THREE.Group(),
    settings:{
        width:2,
        height:1,
        depth:1,
        margin:2
    },

    setInfo : function() {
        this.infoDOM.classList.add('info-hidden')
        this.interactDOM.classList.add("faded")
        setTimeout(()=>{
            this.interactDOM.innerHTML=this.sceneInteract[this.curIndex]
            this.sceneInfoDom.map((element , index) => {
                element.innerHTML=this.sceneData[this.curIndex][index]
            })
            this.infoDOM.classList.remove('info-hidden')
            this.interactDOM.classList.remove("faded")
        },
        800)

    },
    init : function() {
        camera.init()
        for(let i=0;i<this.sceneAray.length;i++){
            this.containerAray.push(new Container(this.settings.width,this.settings.height,this.settings.depth,i*(this.settings.width+this.settings.margin)))
            this.containerAray[i].group.add(this.sceneAray[i])
            this.group.add(this.containerAray[i].group)
            scene.add(this.group)
        }
        this.handleNext()
        this.setInfo()

        this.startInit[0].addEventListener('click', () => 
        {
            this.startInit[1].style.animationPlayState = 'running'
            this.startInit[2].style.opacity = 0
            this.startInit[2].style.pointerEvents = 'none'           
        })
    },
    goTo: function(target) {
        if(target>=this.containerAray.length){
            target=0
        }
        TweenLite.to(
            this.group.position,
            2,
            {
                x:-(target*(this.settings.width+this.settings.margin)),
                ease:'Power3.easeInOut'
            }
        )
        TweenLite.fromTo(
            setUp.walls.rotation,
            2,
            {
                y:0,
                ease:'Power3.easeInOut'
            },
            {
                y:+6.28319,
                ease:'Power3.easeInOut'
            }
        )
        TweenLite.fromTo(
            this.containerAray[this.curIndex].group.rotation,
            2,
            {
                x:0,
                ease:'Power3.easeInOut'
            },
            {
                x:-6.28319,
                ease:'Power3.easeInOut'
            }
        )
        var initial = new THREE.Color(setUp.sunL.color.getHex())
        TweenLite.to(
            initial,
            3,
            {
                r:this.sceneData[target][4].r,
                g:this.sceneData[target][4].g,
                b:this.sceneData[target][4].b,
            onUpdate:function(){
                setUp.sunL.color=initial
                setUp.ambiantL.color=initial
            }
            }
        )

        
        this.curIndex = target
        this.setInfo()
    },
    handleNext:function(){
        let checked = 0
        const btnNext = document.querySelector('#next-btn')
        btnNext.addEventListener('click',()=>{
            this.goTo(this.curIndex+1)

            this.timeline[this.curIndex].style.opacity = 1
            this.timeline[this.curIndex].style.pointerEvents = 'auto'

            if(this.curIndex+1==2 && checked==0)
            {
                this.timeline[3].style.transform = 'scaleX(175)'
                checked = 1
            }
            else if (this.curIndex==2)
            {
                this.timeline[3].style.transform = 'scaleX(350)'
            }
        }, false)
        for (let i = 0; i < 3; i++) 
        {
            this.timeline[i].addEventListener('click',()=>
            {
                this.goTo(i)
            })
        }
    }
}
slider.init()


// Animated assets
let isPlaying = true
let callOnce = true
let animatedMeshes={
}
let getMeshes = () => {
    setTimeout(function(){
        if(slider.sceneAray[0].children.length == 0) {
            getMeshes()
        }
        else {
            setTimeout(function(){
                animatedMeshes.hourGlassTop = slider.sceneAray[1].children[0].children[0].children[1]
                animatedMeshes.hourGlassBot = slider.sceneAray[1].children[0].children[0].children[0]
                animatedMeshes.sun = slider.sceneAray[0].children[0].children[0].children[1]
                animatedMeshes.clouds = slider.sceneAray[0].children[0].children[0].children[0]
            },200)
        }
    },200)
}
let hourGlassReverse = () =>{
    if (callOnce){
        callOnce=false
        animatedMeshes.hourGlassTop.scale.y=0.06
        TweenLite.to(
            animatedMeshes.hourGlassTop.scale,
            2,
            {
                y:1,
                ease:'Power3.easeInOut'
            }
        )
        TweenLite.to(
            animatedMeshes.hourGlassBot.scale,
            2,
            {
                y:0.2,
                ease:'Power3.easeInOut'
            }
        )
        TweenLite.fromTo(
            slider.sceneAray[1].children[0].rotation,
            2,
            {
                z:0
            },
            {
                z:-6.28319,
                ease:'Power3.easeInOut'
            }
        )
        isPlaying=true
        callOnce=true
    }

}
getMeshes()

// Interactions
slider.interactDOM.addEventListener('click',() =>{
    switch (slider.curIndex) {
        case 0:
            break;
        case 1:
            TweenLite.to(
                animatedMeshes.hourGlassBot.scale,
                1,
                {
                    y:1,
                    ease:'Power3.easeInOut'
                }
            )
            TweenLite.to(
                animatedMeshes.hourGlassTop.scale,
                1,
                {
                    y:0.06,
                    ease:'Power3.easeInOut',
                    onComplete:hourGlassReverse
                }
            )
            break;
        case 2:
            break;
    }
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights=true
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // options are THREE.BasicShadowMap | THREE.PCFShadowMap | THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)
let renderScene = new RenderPass( scene, camera.camera ) 
// Post processing
var params = {
    exposure: 0.9,
    bloomStrength: 0.4,
    bloomThreshold: 0.1,
    bloomRadius: 1
};
let bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;
let composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );

/**
 * Loop
 */
const loop = () =>
{
    //Sundial
    if (animatedMeshes.sun && slider.curIndex==0 && isPlaying){
        setUp.sunL.position.x=camera.mouse.x*20
        animatedMeshes.sun.rotation.z=-(((camera.mouse.x+1)/2)*2.8)
        animatedMeshes.clouds.position.x=-((camera.mouse.x)*200)
    }
    else if(slider.curIndex==1 && isPlaying) {
        animatedMeshes.hourGlassBot.scale.y+=0.001
        animatedMeshes.hourGlassTop.scale.y-=0.001
        if(animatedMeshes.hourGlassTop.scale.y <= 0.05){
            isPlaying= false
            hourGlassReverse()
        }
    }
    window.requestAnimationFrame(loop)
    // Render
    composer.render();
}

loop()
