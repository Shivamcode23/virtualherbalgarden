// Create the scene, camera, and renderer with a transparent background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set the renderer with alpha: true to make the background transparent
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Make the scene's background transparent
renderer.setClearColor(0x808080, 100);  // 0x000000 is black, but '0' is the transparency level

// Add ambient light and directional light
const ambientLight = new THREE.AmbientLight(0x404040, 2);  // Soft white ambient light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Load the 3D model using GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load(
  'greenhouse_park_fbx_free.glb',  // Path to your GLB file
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);  // Adjust the model size as needed
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error('An error happened while loading the model:', error);
  }
);

// Set the camera position
camera.position.set(0, 2, 10);

// Add OrbitControls to allow mouse interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Enable damping (smooth motion)
controls.dampingFactor = 0.05;  // Damping inertia factor
controls.minDistance = 2;       // Set minimum zoom distance
controls.maxDistance = 20;      // Set maximum zoom distance

// Animation loop to render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();  // Update the controls
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
