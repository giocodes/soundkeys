var camera, scene, renderer;
var effect, controls;
var element, container;
var cube, sphere;

var clock = new THREE.Clock();

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer();
    element = renderer.domElement;
    container = document.getElementById('example');
    container.appendChild(element);

    // VR option
    effect = new THREE.StereoEffect(renderer);

    scene = new THREE.Scene();
    //( fov, aspect, near, far ) 
    camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
    // camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 10, 0);
    // camera.position.set(50, 50, 50);
    scene.add(camera);

    controls = new THREE.OrbitControls(camera, element);
    controls.rotateUp(Math.PI / 4);
    // controls.target.set(36, 18, 32);
    controls.target.set(24, 24, 50);
    // camera.position.x + 0.1,
    // camera.position.y,
    // camera.position.z
    controls.noZoom = true;
    controls.noPan = true;

    function setOrientationControls(e) {
        if (!e.alpha) {
            return;
        }

        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();

        element.addEventListener('click', fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
    window.addEventListener('deviceorientation', setOrientationControls, true);


    var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
    scene.add(light);

    var texture = THREE.ImageUtils.loadTexture(
        'textures/patterns/checker.png'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(50, 50);
    texture.anisotropy = renderer.getMaxAnisotropy();

    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture
    });

    var geometry = new THREE.PlaneGeometry(1000, 1000);

    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    // scene.add(mesh);

    // Cube
    var geometry2 = new THREE.BoxGeometry(1, 1, 1);
    var material2 = new THREE.MeshBasicMaterial({ color: 0x99CC99 });
    cube = new THREE.Mesh(geometry2, material2);
    cube.lookAt(camera.position);
    cube.position.set(0,0,60);
    scene.add(cube);

    // Sphere
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(100, 20, 20),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('images/lake.jpg')
      })
    );
    sphere.scale.x = -1;
    scene.add(sphere);



    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);
}

function resize() {
    var width = container.offsetWidth;
    // var width = container.offsetWidth * 2;
    var height = container.offsetHeight;
    // var height = container.offsetHeight * 2;

    // camera.aspect = width / height;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    effect.setSize(width, height);
}

function update(dt) {
    resize();

    camera.updateProjectionMatrix();

    controls.update(dt);
}

function render(dt) {
    // VR Version
    // effect.render(scene, camera);
    // Desktop Version
    renderer.render(scene, camera);
}

function animate(t) {

    // Cube Animation
    if (cube.position.x > 100) {
      cube.position.x = -100;
    }
    cube.rotation.y += 0.01;
    cube.position.x += 1;
    requestAnimationFrame(animate);

    update(clock.getDelta());
    render(clock.getDelta());
}

function fullscreen() {
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    }
}
