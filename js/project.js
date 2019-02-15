let renderer,
    scene,
    camera,
    myCanvas = document.getElementById('myCanvas')

//Renderer
renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true })
renderer.setClearColor(0x000000)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

// Camera
camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.1, 3000)

// Scene
scene = new THREE.Scene()

// Lights
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
const light1 = new THREE.PointLight(0xffffff, 0.1)
scene.add(light1)
const light2 = new THREE.AmbientLight(0x9F4839, 1)
scene.add(light2)
const light3 = new THREE.PointLight(0x0E5476, 1, 100)
scene.add(light3)

const curve = new THREE.CatmullRomCurve3( [
    new THREE.Vector3( -10, 0, 10 ),
    new THREE.Vector3( -5, 5, 5 ),
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 5, -5, 5 ),
    new THREE.Vector3( 10, 0, 10 )
] )


const geometry = new THREE.TubeGeometry(
    curve,  //path
    20,    //segments
    2,     //radius
    8,     //radiusSegments
    false  //closed
)

const material = new THREE.MeshLambertMaterial({ color: 0xF3FFE2 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.z = -1000

scene.add(mesh)

//RENDER LOOP
render()

const delta = 0
function render() {
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
