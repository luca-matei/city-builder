import * as THREE from 'three';
import { randFloat } from 'three/src/math/MathUtils';

export function createFloor(scene) {
    const floorSize = 20; // 20x20 grid
    const cubeSize = 1; // Size of each cube
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const dirtMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Dirt color
    const grassMaterial = new THREE.MeshStandardMaterial({ color: 0x4CAF50 }); // Darker green color for grass

    const floorGroup = new THREE.Group();
    for (let i = -floorSize / 2; i < floorSize / 2; i++) {
        for (let j = -floorSize / 2; j < floorSize / 2; j++) {
            // Create main cube
            const cube = new THREE.Mesh(cubeGeometry, dirtMaterial);
            cube.position.set(i * cubeSize, cubeSize / 2, j * cubeSize);
            cube.castShadow = true; // Enable shadows for cubes
            cube.receiveShadow = true; // Enable cubes to receive shadows
            floorGroup.add(cube);

            // Create grass
            const y = randFloat(0, 0.1);
            const grass = new THREE.Mesh(cubeGeometry, grassMaterial);
            grass.position.set(i * cubeSize, cubeSize + cubeSize * 0.1 / 2 + y, j * cubeSize);
            grass.scale.set(1, 0.1, 1);
            grass.castShadow = true;
            grass.receiveShadow = true;
            floorGroup.add(grass);
        }
    }
    scene.add(floorGroup);
}
