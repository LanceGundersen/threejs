let container
let camera, scene, renderer
let box, sphere, sphere2, torus, disk, octahedron, sphere3
let whiteLight, redLight, blueLight, hemiLight

const lightToggle = document.getElementById('lightToggle')
const shapeToggle = document.getElementById('shapeToggle')
const ambientToggle = document.getElementById('ambientToggle')

// Models
const boxModel = (l, w, h, givenColor) => {
  const geometry = new THREE.BoxGeometry(l, w, h)
  const material = new THREE.MeshLambertMaterial({
    color: givenColor
  })
  return new THREE.Mesh(geometry, material)
}

const sphereModel = (x, y, z, givenColor) => {
  const geometry = new THREE.SphereBufferGeometry(x, y, z)
  const material = new THREE.MeshLambertMaterial({
    color: givenColor
  })
  return new THREE.Mesh(geometry, material)
}

const cylinderModel = (radiusTop, radiusBottom, height, radialSegments, givenColor) => {
  const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
  const material = new THREE.MeshLambertMaterial({
    color: givenColor
  })
  return new THREE.Mesh(geometry, material)
}

const torusModel = (radius, tube, tubularSegments, radialSegments, p, q, givenColor) => {
  const geometry = new THREE.TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q)
  const material = new THREE.MeshLambertMaterial({
    color: givenColor
  })
  return new THREE.Mesh(geometry, material)
}

const octahedronModel = (radius, detail, givenColor) => {
  const geometry = new THREE.OctahedronGeometry(radius, detail, givenColor)
  const material = new THREE.MeshLambertMaterial({
    color: givenColor
  })
  return new THREE.Mesh(geometry, material)
}


// Lights
const wLight = () => {
  const light = new THREE.SpotLight(0xfffff, 1);
  light.position.set(100, 1000, 100);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 500;
  light.shadow.camera.far = 4000;
  light.shadow.camera.fov = 30;
  return light
}

const rLight = () => {
  const light = new THREE.SpotLight(0xff0000, 4)
  light.position.set(300, 400, 0)
  light.castShadow = true
  light.shadow.bias = 0.0001
  light.angle = Math.PI / 4
  light.penumbra = 0.05
  light.decay = 1
  light.distance = 1000
  light.shadow.camera.near = 1
  light.shadow.camera.far = 1000
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024
  return light
}

const bLight = () => {
  const light = new THREE.AmbientLight(0x0000ff, 1)
  light.position.set(50, 500, 10)
  light.angle = Math.PI / 4
  light.penumbra = 0.05
  light.distance = 1000
  return light
}

const hLight = () => {
  let light = new THREE.HemisphereLight(0x00ffff, 0xffd700, 2)
  light.color.setHSL(0.6, 1, 0.6)
  light.groundColor.setHSL(0.095, 1, 0.75)
  light.position.set(0, 500, 0)
  return light
}

// Pivot point
let pivotPoint, pivotPoint1, pivotPoint2, pivotPoint3, pivotPoint4, pivotPoint5

// Camera settings
let FOV = 35
let WIDTH = window.innerWidth
let HEIGHT = window.innerHeight
let NEAR = 1
let FAR = 10000

// Renderer
let pixelRatio = window.devicePixelRatio

// Background color
let backgroundColor = new THREE.Color(0x21252d)

init()
animate()

function init() {
  console.log('init')

  // Container
  container = document.getElementById('myCanvas')
  // document.body.appendChild( container );

  // Camera
  camera = new THREE.PerspectiveCamera(FOV, WIDTH / HEIGHT, NEAR, FAR)

  // Scene
  scene = new THREE.Scene()

  // -------------------------------------
  // Box
  box = boxModel(100, 100, 100)
  box.receiveShadow = true
  box.position.set(0, 1, 0, 0xf0fd23)
  scene.add(box)

  // Pivot points
  pivotPoint = new THREE.Object3D()
  pivotPoint1 = new THREE.Object3D()
  pivotPoint2 = new THREE.Object3D()
  pivotPoint3 = new THREE.Object3D()
  pivotPoint4 = new THREE.Object3D()
  pivotPoint5 = new THREE.Object3D()
  box.add(pivotPoint, pivotPoint1, pivotPoint2, pivotPoint3, pivotPoint4, pivotPoint5)

  // Sphere 1
  sphere = sphereModel(30, 20, 20)
  // Position from pivot point to sphere
  sphere.position.set(260, 4, 6)
  // make the pivotpoint the sphere's parent.
  pivotPoint.add(sphere)

  // Sphere 2
  sphere2 = sphereModel(10, 10, 5)
  // Position from pivot point to sphere
  sphere2.position.set(0, 100, 200)
  // make the pivotpoint the sphere's parent.
  pivotPoint1.add(sphere2)

  // Torus
  torus = torusModel(100, 5, 8, 3, 10, 3)
  // Position from pivot point to sphere
  torus.position.set(100, 0, 70)
  // make the pivotpoint the sphere's parent.
  pivotPoint2.add(torus)

  // Disk
  disk = cylinderModel(50, 50, 1, 10)
  // Position from pivot point to sphere
  disk.position.set(-100, 50, 100)
  // make the pivotpoint the disk's parent.
  pivotPoint3.add(disk)

  // Parametric
  octahedron = octahedronModel(10, 0)
  // Position from pivot point to octahedron
  octahedron.position.set(100, 200, 250)
  // make the pivotpoint the octahedron's parent.
  pivotPoint4.add(octahedron)

  // Sphere 3
  sphere3 = sphereModel(25, 10, 5)
  // Position from pivot point to sphere
  sphere3.position.set(0, 100, 200)
  // make the pivotpoint the sphere's parent.
  pivotPoint5.add(sphere3)

  // Lights
  camera.lookAt(scene.position)
  whiteLight = wLight()
  redLight = rLight()
  blueLight = bLight()
  hemiLight = hLight()

  // -------------------------------------

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true,
    alpha: false
  })
  renderer.setPixelRatio(pixelRatio)
  renderer.setSize(WIDTH, HEIGHT)

  // Background color
  renderer.setClearColor(backgroundColor)

  // Event Listener
  window.addEventListener('resize', onWindowResize, false)

  // Position and point the camera to the center of the scene
  camera.position.x = 300
  camera.position.y = 400
  camera.position.z = 700
  camera.lookAt(scene.position)

  // Shadows
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Gamma
  renderer.gammaInput = true
  renderer.gammaOutput = true

  // Fog
  scene.fog = new THREE.Fog(0x23272a, 0.5, 1700, 4000)

} // End of init

// Resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Animate
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  render();
}

// Mesh animation
function render() {
  // Animating box
  let time = Date.now() * 0.0005
  box.position.x = Math.cos(time * 10) * 5
  box.position.y = Math.cos(time * 7) * 3
  box.position.z = Math.cos(time * 8) * 4

  // Animating sphere 1
  pivotPoint.rotation.y += 0.01
  // Animating sphere 2
  pivotPoint1.rotation.x += 0.03
  pivotPoint1.rotation.y += 0.02
  pivotPoint1.rotation.z += 0.01
  // Animating torus
  pivotPoint2.rotation.z += 0.02
  pivotPoint2.rotation.x += 0.04
  // Animating disk
  pivotPoint3.rotation.y += 0.01
  pivotPoint3.rotation.x += 0.01
  // Animating octahedron
  pivotPoint4.rotation.y += 0.01
  pivotPoint4.rotation.x += 0.01
  // Animating octahedron
  pivotPoint5.rotation.y -= 0.02
  pivotPoint5.rotation.x -= 0.08

  // Animate lights
  whiteLight.rotation.y += 0.04
  whiteLight.rotation.x += 0.04

  redLight.rotation.y = Math.cos(time * 8) * 4
  redLight.rotation.x = Math.cos(time * 8) * 4

  blueLight.rotation.x += 0.04
  blueLight.rotation.y += 0.04

  hemiLight.rotation.z += 0.04
  hemiLight.rotation.y += 0.04

  if (!lightToggle.checked) {
    scene.remove(whiteLight, redLight, blueLight, hemiLight)
  } else {
    scene.add(whiteLight, redLight, blueLight, hemiLight)
  }

  if (!ambientToggle.checked) {
    scene.remove(blueLight)
  } else {
    scene.add(blueLight)
  }

  if (shapeToggle.checked) {
    pivotPoint5.add(sphere3)
  } else {
    pivotPoint5.remove(sphere3)
  }


}