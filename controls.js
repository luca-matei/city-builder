// controls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

export function setupControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia)
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false; // Prevent panning
    controls.maxPolarAngle = Math.PI / 2; // Restrict to top-down view
    controls.minDistance = 5; // Minimum zoom distance
    controls.maxDistance = 50; // Maximum zoom distance

    const moveSpeed = 0.02;
    const maxSpeed = 0.5;
    const acceleration = 0.02;
    const deceleration = 0.02;

    const velocity = new THREE.Vector3(0, 0, 0);
    const direction = new THREE.Vector3();
    const right = new THREE.Vector3();
    const forward = new THREE.Vector3();
    const keyState = {};

    window.addEventListener('keydown', (event) => {
        keyState[event.code] = true;
    }, true);

    window.addEventListener('keyup', (event) => {
        keyState[event.code] = false;
    }, true);

    function moveCamera() {
        camera.getWorldDirection(direction);
        right.crossVectors(camera.up, direction).normalize();
        forward.crossVectors(right, camera.up).normalize();

        if (keyState['ArrowUp'] || keyState['KeyW']) {
            velocity.add(forward.clone().multiplyScalar(acceleration));
        } else if (velocity.dot(forward) > 0) {
            velocity.add(forward.clone().multiplyScalar(-deceleration));
        }

        if (keyState['ArrowDown'] || keyState['KeyS']) {
            velocity.add(forward.clone().multiplyScalar(-acceleration));
        } else if (velocity.dot(forward) < 0) {
            velocity.add(forward.clone().multiplyScalar(deceleration));
        }

        if (keyState['ArrowLeft'] || keyState['KeyA']) {
            velocity.add(right.clone().multiplyScalar(acceleration));
        } else if (velocity.dot(right) > 0) {
            velocity.add(right.clone().multiplyScalar(-deceleration));
        }

        if (keyState['ArrowRight'] || keyState['KeyD']) {
            velocity.add(right.clone().multiplyScalar(-acceleration));
        } else if (velocity.dot(right) < 0) {
            velocity.add(right.clone().multiplyScalar(deceleration));
        }

        // Clamp the speed to the maximum speed
        if (velocity.length() > maxSpeed) {
            velocity.setLength(maxSpeed);
        }

        // Apply the velocity to the camera position and target
        camera.position.add(velocity);
        controls.target.add(velocity);
    }

    return { controls, moveCamera };
}
