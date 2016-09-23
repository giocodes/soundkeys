// var FizzyText = function() {
//     this.message = 'dat.gui';
//     this.speed = 0.8;
//     this.displayOutline = false;
//     this.camerax = 0;
//     // this.explode = function() {};
//     // Define render logic ...
// };

window.onload = function() {
    // var text = new FizzyText();
    var gui = new dat.GUI();
    // gui.add(text, 'message');
    // gui.add(text, 'speed', -5, 5);
    // gui.add(text, 'displayOutline');
    // gui.add(text, 'explode');
    var f1 = gui.addFolder('CAMERA');
    f1.add(camera.position, 'x');
    f1.add(camera.position, 'y');
    f1.add(camera.position, 'z');
    f1.add(camera, 'fov');
    
    var f2 = gui.addFolder('CONTROLS');
    f2.add(controls.target, 'x');
    f2.add(controls.target, 'y');
    f2.add(controls.target, 'z');
    f2.add(controls, 'rotateUp');
    var f3 = gui.addFolder('CUBE');
    f3.add(cube.position, 'x');
    f3.add(cube.position, 'y');
    f3.add(cube.position, 'z');
    f3.add(cube.material.color, 'b');

    var f4 = gui.addFolder('SPHERE');
    f4.add(sphere.scale, 'x');
    f4.add(sphere.scale, 'y');
    f4.add(sphere.scale, 'z');
    gui.add(sphere.material.map, 'sourceFile', 0, 100).listen();

    f1.open();
    f2.open();
    f3.open();
    f4.open();

    console.dir(controls);
    console.dir(effect);
    console.dir(camera);
    console.dir(container);
    console.dir(scene);
    console.dir(cube);
    console.dir(sphere);
};