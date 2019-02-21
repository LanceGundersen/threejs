import * as models from './models.js'
import * as lights from './lights.js'

var container
var camera, scene, renderer

// Models
var box, sphere, sphere2, torus

// Pivot point
var pivotPoint, pivotPoint2, pivotPoint3

// Camera settings
var FOV = 35
var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var NEAR = 1
var FAR = 10000

// Renderer
let pixelRatio = window.devicePixelRatio

// Background color
let backgroundColor = new THREE.Color( 0x21252d )

init()
animate()

function init() {
  // Container
	container = document.getElementById('myCanvas')
  // document.body.appendChild( container );

  // Camera
  camera = new THREE.PerspectiveCamera( FOV, WIDTH / HEIGHT, NEAR, FAR )

  // Scene
	scene = new THREE.Scene()

	// -------------------------------------
	// Box
  box = models.box(100, 100, 100)
  box.receiveShadow = true
  box.position.set(0, 1, 0, 0xf0fd23)
  scene.add(box)

	// Pivot points
  pivotPoint = new THREE.Object3D()
  pivotPoint2 = new THREE.Object3D()
  pivotPoint3 = new THREE.Object3D()
  box.add(pivotPoint, pivotPoint2, pivotPoint3)

	// Sphere 1
	sphere = models.sphere(30, 20, 20, 0xff0000)
  // Position from pivot point to sphere
  sphere.position.set(260, 4, 6)
  // make the pivotpoint the sphere's parent.
  pivotPoint.add(sphere)

  // Sphere 2
	sphere2 = models.sphere(10, 10, 5, 0x4d4dff)
  // Position from pivot point to sphere
  sphere2.position.set(0, 100, 200)
  // make the pivotpoint the sphere's parent.
  pivotPoint2.add(sphere2)

  // Torus
  torus = models.torus(100, 5, 3, 3, 10, 3, 0xccff66)
  // Position from pivot point to sphere
  torus.position.set(100, 0, 70)
  // make the pivotpoint the sphere's parent.
  pivotPoint3.add(torus)


  // Lights
  camera.lookAt(scene.position)
	scene.add( lights.redLight(), lights.blueLight(), lights.hemiLight() )


  // -------------------------------------

  // Renderer
  renderer = new THREE.WebGLRenderer( { canvas: container, antialias: true, alpha: false } );
	renderer.setPixelRatio( pixelRatio );
	renderer.setSize( WIDTH, HEIGHT );

  // Background color
  renderer.setClearColor( backgroundColor );

  // Event Listener
  window.addEventListener( 'resize', onWindowResize, false );

  // Position and point the camera to the center of the scene
  camera.position.x = 300;
  camera.position.y = 400;
  camera.position.z = 700;
  camera.lookAt(scene.position);

  // Shadows
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	// Gamma
	renderer.gammaInput = true;
	renderer.gammaOutput = true;

  // Fog
	scene.fog = new THREE.Fog( 0x23272a, 0.5, 1700, 4000 );

} // End of init

// Resize
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

// Animate
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
	render();
}

// Mesh animation
function render() {
  // -------------------------------------
	// Animating box
	var time = Date.now() * 0.0005;
	box.position.x = Math.cos( time * 10 ) * 5;
	box.position.y = Math.cos( time * 7 ) * 3;
	box.position.z = Math.cos( time * 8 ) * 4;

	// Animating sphere 1
  pivotPoint.rotation.y += 0.01;
  // Animating sphere 2
  pivotPoint2.rotation.x += 0.03;
  // Animating sphere 2
  pivotPoint3.rotation.z += 0.02;
  pivotPoint3.rotation.x += 0.04;

  // -------------------------------------

}
