'use strict'
const box = (l, w, h, givenColor) => {
  const geometry = new THREE.BoxGeometry(l, w, h)
  const material = new THREE.MeshLambertMaterial({ color: givenColor })
  return new THREE.Mesh(geometry, material)
}

const sphere = (x, y, z, givenColor) => {
  const geometry = new THREE.SphereBufferGeometry(x,y,z)
  const material = new THREE.MeshLambertMaterial({ color: givenColor })
  return new THREE.Mesh(geometry, material)
}

const torus = (radius, tube, tubularSegments, radialSegments, p, q, givenColor) => {
  const geometry = new THREE.TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q)
  const material = new THREE.MeshLambertMaterial({ color: givenColor })
  return new THREE.Mesh(geometry, material)
}


// Export functions for use outside of module
export {
  box,
  sphere,
  torus
}