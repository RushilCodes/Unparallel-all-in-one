import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Initialize the scene
const scene = new THREE.Scene();

// Create and position the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 50, 300);

// Create and configure the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(100, 100, 100);
scene.add(pointLight);

// Create a star field background
const createStarField = () => {
  const starCount = 10000;
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    transparent: true,
    opacity: 0.7
  });

  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = THREE.MathUtils.randFloatSpread(2000);
    positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(2000);
    positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(2000);
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
};

createStarField();

// Create the black hole
const blackHoleGeometry = new THREE.SphereGeometry(50, 64, 64);
const blackHoleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
scene.add(blackHole);

// Create the accretion disk
const accretionDiskGeometry = new THREE.TorusGeometry(60, 15, 16, 100);
const accretionDiskMaterial = new THREE.MeshBasicMaterial({
  color: 0xffa500,
  side: THREE.DoubleSide,
  emissive: 0xffa500,
  emissiveIntensity: 1
});
const accretionDisk = new THREE.Mesh(accretionDiskGeometry, accretionDiskMaterial);
accretionDisk.rotation.x = Math.PI / 2;
scene.add(accretionDisk);

// Gravitational lensing shader
const lensingShader = {
  uniforms: {
    'tDiffuse': { value: null },
    'strength': { value: 0.5 },
    'center': { value: new THREE.Vector2(0.5, 0.5) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float strength;
    uniform vec2 center;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      vec2 offset = uv - center;
      float dist = length(offset);
      offset = normalize(offset) * pow(dist, strength);
      uv = center + offset;
      gl_FragColor = texture2D(tDiffuse, uv);
    }
  `
};

// Set up postprocessing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const lensingPass = new ShaderPass(lensingShader);
composer.addPass(lensingPass);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0;
bloomPass.strength = 1.5;
bloomPass.radius = 0;
composer.addPass(bloomPass);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Animation function
function animate() {
  requestAnimationFrame(animate);

  // Rotate the accretion disk
  accretionDisk.rotation.x += 0.01;

  // Render the scene
  composer.render();
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

animate();
