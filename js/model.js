import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let scene, renderer, camera, controls;
const canvas = document.getElementById("home-page_model");

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight;

// scene
scene = new THREE.Scene();

// camera
camera = new THREE.PerspectiveCamera(
  45,
  canvas.width / canvas.height,
  0.1,
  100,
);

// xyz
camera.position.set(0, 0, 0);
scene.add(camera);

// loader
const loader = new GLTFLoader();

loader.load(
  "../model/scene.gltf",
  function (gltf) {
    const root = gltf.scene;
    root.scale.set(0.1, 0.1, 0.1);
    root.rotation.y = Math.PI;
    scene.add(root);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 * "% loaded");
  },
  function (error) {
    console.error(error);
  },
);

// renderer
renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(2);
renderer.setClearColor(new THREE.Color(0xf7f3f3));

// lightning
var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

// controls
controls = new OrbitControls(camera, canvas);
controls.enablePan = false;
controls.enableDamping = false;
controls.enableZoom = false;
controls.enableRotate = false;

// xyz
controls.object.position.set(0.04, 0.1, -0.3);
controls.object.rotation.set(0, 0, 0);
controls.target = new THREE.Vector3(0, 0.16, -0.8);

// render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// resizing window and camera
window.addEventListener("resize", () => {
  // udpate sizes
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight;
  // update camera
  camera.aspect = canvas.width / canvas.height;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.width, canvas.height);
});

// rerender on resize
const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// animation
window.addEventListener("mousemove", (e) => {
  let x = (e.x / window.innerWidth) * (0.2 - -0.2) + -0.2;
  x = Math.min(0.2, Math.max(-0.2, x));

  let y = (e.y / window.innerHeight) * (0.3 - 0.1) + 0.1;
  y = Math.min(0.3, Math.max(0.1, y));

  controls.object.position.set(x, y, -0.3);
});
