// Crear la escena
const scene = new THREE.Scene();

// Crear la cámara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear una esfera
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Configurar posición inicial
sphere.position.set(0, 0, 0);

// Crear las paredes de la caja
const boxSize = 5;
const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Posicionar la cámara
camera.position.z = 10;

// Velocidad inicial
const velocity = { x: 0.05, y: 0.03, z: 0.04 };

// Animación
function animate() {
    requestAnimationFrame(animate);

    // Actualizar posición de la esfera
    sphere.position.x += velocity.x;
    sphere.position.y += velocity.y;
    sphere.position.z += velocity.z;

    // Detectar colisiones con las paredes
    if (Math.abs(sphere.position.x) > boxSize / 2) velocity.x = -velocity.x;
    if (Math.abs(sphere.position.y) > boxSize / 2) velocity.y = -velocity.y;
    if (Math.abs(sphere.position.z) > boxSize / 2) velocity.z = -velocity.z;

    renderer.render(scene, camera);
}
animate();

// Ajustar el tamaño al cambiar la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});