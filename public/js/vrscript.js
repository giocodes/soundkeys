var FizzyText = function() {
    this.message = 'dat.gui';
    this.speed = 0.8;
    this.displayOutline = false;
    this.camerax = 0;
    // this.explode = function() {};
    // Define render logic ...
};


var camera, scene, renderer;
var effect, controls;
var element, container;

var clock = new THREE.Clock();

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer();
    element = renderer.domElement;
    container = document.getElementById('example');
    container.appendChild(element);

    effect = new THREE.StereoEffect(renderer);

    scene = new THREE.Scene();
    //( fov, aspect, near, far ) 
    camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
    camera.position.set(40, 15, 35);
    scene.add(camera);

    controls = new THREE.OrbitControls(camera, element);
    controls.rotateUp(Math.PI / 4);
    controls.target.set(36, 18, 32);
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
    var cube = new THREE.Mesh(geometry2, material2);
    scene.add(cube);

    // Sphere
    var sphere = new THREE.Mesh(
      new THREE.SphereGeometry(100, 20, 20),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('images/snow.jpg')
      })
    );
    sphere.scale.x = -1;
    scene.add(sphere);



    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);
}

function resize() {
    var width = container.offsetWidth;
    var height = container.offsetHeight;

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
    effect.render(scene, camera);
}

function animate(t) {
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



window.onload = function() {
    var text = new FizzyText();
    var gui = new dat.GUI();
    // gui.add(text, 'message');
    // gui.add(text, 'speed', -5, 5);
    // gui.add(text, 'displayOutline');
    // gui.add(text, 'explode');
    gui.add(camera.position, 'x');
    gui.add(camera.position, 'y');
    gui.add(camera.position, 'z');
    gui.add(camera, 'fov');
    gui.add(controls.target, 'x');
    gui.add(controls.target, 'y');
    gui.add(controls.target, 'z');
    console.dir(controls)
};
