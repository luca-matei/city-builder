// main.js
import { setupScene } from './setup.js';
import { addLights } from './lighting.js';
import { createFloor } from './floor.js';
import { setupControls } from './controls.js';
import { animate } from './animate.js';

const { scene, camera, renderer } = setupScene();
addLights(scene);
createFloor(scene);
const { controls, moveCamera } = setupControls(camera, renderer);
animate(renderer, scene, camera, controls, moveCamera);
