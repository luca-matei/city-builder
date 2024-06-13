import * as THREE from 'three';

export function setupScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Enable shadow maps
    document.body.appendChild(renderer.domElement);

    scene.background = new THREE.Color(0x87CEEB); // Light blue color

    return { scene, camera, renderer };
}
