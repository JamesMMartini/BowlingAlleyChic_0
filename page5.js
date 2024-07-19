import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ToneMapShader } from './ToneMapShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', OnWindowResize, false);


const composer = new EffectComposer( renderer );
const renderPass = new RenderPass( scene, camera );
const shaderPass = new ShaderPass( ToneMapShader );
composer.addPass(renderPass);
composer.addPass(shaderPass);

composer.setSize( window.innerWidth, window.innerHeight )

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

var textureLoader = new THREE.TextureLoader();

scene.background = textureLoader.load("Textures/portland.jpg");

const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        texture1: { type: "t", value: textureLoader.load("Textures/battle ui.png") }
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent
  });

const cube = new THREE.Mesh( geometry, shaderMaterial );
scene.add( cube );

camera.position.z = 2;

var defaultRotation = 0.01;

//document.addEventListener( 'mousedown', onDocumentMouseDown, false );


function OnWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {

  if (defaultRotation != 0) {
    cube.rotation.x += defaultRotation;
    cube.rotation.y += defaultRotation;
  }
  else {
    //rotateAroundWorldAxis(cube, new THREE.Vector3(0, 1, 0), targetRotationX);
    //rotateAroundWorldAxis(cube, new THREE.Vector3(1, 0, 0), targetRotationY);

    //targetRotationY = targetRotationY * (1 - slowingFactor);
    //targetRotationX = targetRotationX * (1 - slowingFactor);
  }

	//renderer.render( scene, camera );
  composer.render();
}