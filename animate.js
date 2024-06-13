export function animate(renderer, scene, camera, controls, moveCamera) {
    function animationLoop() {
        requestAnimationFrame(animationLoop);
        moveCamera(); // Update camera position based on input
        controls.update(); // Update controls
        renderer.render(scene, camera);
    }

    animationLoop();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
