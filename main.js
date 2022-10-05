import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl'

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

const scene = new THREE.Scene();
const camera = new THREE.
  PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  )

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);


const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 30),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: { 
      globeTexture: { 
        value: new THREE.TextureLoader().load('/imgs/globe.jpeg')
      }
    }
  })
)

 const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 30),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
)

atmosphere.scale.set(1.1, 1.1, 1.1)

scene.add(atmosphere);

const group = new THREE.Group();

group.add(sphere);
scene.add(group);

var controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 10
controls.enableZoom = false;
controls.enablePan = false;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
  sphere.rotation.y += 0.001
}

animate();
