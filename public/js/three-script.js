// Scene
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xCCCC99 );
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;



// Minion
var sonic;
var loader = new THREE.ObjectLoader();
loader.load( '/js/assets/sonic.json', function ( obj ) {
    sonic = obj;
    // var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
    scene.add( sonic );
});

// Cube

// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({ color: 0x99CC99 });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Render function

function render() {
    requestAnimationFrame(render);
    // adding rotation
    // sonic.rotation.x += 0.1;
    sonic.rotation.y += 0.01;
    renderer.render(scene, camera);
}
render();
