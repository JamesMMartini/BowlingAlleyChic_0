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
        texture1: { type: "t", value: textureLoader.load("Textures/battle ui.jpg") }
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent
  });

const cube = new THREE.Mesh( geometry, shaderMaterial );
scene.add( cube );

camera.position.z = 2;


var defaultRotation = 0.01;

var targetRotationX = 0.5;
var targetRotationOnMouseDownX = 0;

var targetRotationY = 0.2;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var slowingFactor = 0.1;

document.addEventListener( 'mousedown', onDocumentMouseDown, false );


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
    rotateAroundWorldAxis(cube, new THREE.Vector3(0, 1, 0), targetRotationX);
    rotateAroundWorldAxis(cube, new THREE.Vector3(1, 0, 0), targetRotationY);

    //targetRotationY = targetRotationY * (1 - slowingFactor);
    //targetRotationX = targetRotationX * (1 - slowingFactor);
  }

	//renderer.render( scene, camera );
  composer.render();
}

function onDocumentMouseDown( event ) {

  event.preventDefault();

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  document.addEventListener( 'mouseout', onDocumentMouseOut, false );

  mouseXOnMouseDown = event.clientX - windowHalfX;
  targetRotationOnMouseDownX = targetRotationX;

  mouseYOnMouseDown = event.clientY - windowHalfY;
  targetRotationOnMouseDownY = targetRotationY;

  defaultRotation = 0;
}

function onDocumentMouseMove( event ) {

  mouseX = event.clientX - windowHalfX;

  targetRotationX = ( mouseX - mouseXOnMouseDown ) * 0.00025;

  mouseY = event.clientY - windowHalfY;

  targetRotationY = ( mouseY - mouseYOnMouseDown ) * 0.00025;
}

function onDocumentMouseUp( event ) {

  document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

  //defaultRotation = 0.01;
}

function onDocumentMouseOut( event ) {

  document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function rotateAroundObjectAxis(object, axis, radians) {
  var rotationMatrix = new THREE.Matrix4();

  rotationMatrix.makeRotationAxis(axis.normalize(), radians);
  object.matrix.multiply(rotationMatrix);
  object.rotation.setFromRotationMatrix( object.matrix );

}

function rotateAroundWorldAxis( object, axis, radians ) {

  var rotationMatrix = new THREE.Matrix4();

  rotationMatrix.makeRotationAxis( axis.normalize(), radians );
  rotationMatrix.multiply( object.matrix );                       // pre-multiply
  object.matrix = rotationMatrix;
  object.rotation.setFromRotationMatrix( object.matrix );
}