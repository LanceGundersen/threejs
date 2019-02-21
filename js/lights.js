'use strict'
const redLight = () => {
  const spotLight1 = new THREE.SpotLight( 0xf0fdff, 2.5 )
	spotLight1.position.set(300, 400, 0)
	spotLight1.castShadow = true
	spotLight1.shadow.bias = 0.0001
	spotLight1.angle = Math.PI / 4
	spotLight1.penumbra = 0.05
	spotLight1.decay = 2
	spotLight1.distance = 1000
	spotLight1.shadow.camera.near = 1
	spotLight1.shadow.camera.far = 1000
	spotLight1.shadow.mapSize.width = 1024
	spotLight1.shadow.mapSize.height = 1024
  return spotLight1
}

const blueLight = () => {
  const spotLight2 = new THREE.SpotLight( 0x0000ff, 2.3 )
	spotLight2.position.set(-300, 400, 0)
	spotLight2.castShadow = true
	spotLight2.shadow.bias = 0.0001
	spotLight2.angle = Math.PI / 4
	spotLight2.penumbra = 0.05
	spotLight2.decay = 2
	spotLight2.distance = 1000
	spotLight2.shadow.camera.near = 1
	spotLight2.shadow.camera.far = 1000
	spotLight2.shadow.mapSize.width = 1024
	spotLight2.shadow.mapSize.height = 1024
	return spotLight2
}

const hemiLight = () => {
  let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 )
  hemiLight.color.setHSL( 0.6, 1, 0.6 )
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 )
  hemiLight.position.set( 0, 500, 0 )
  return hemiLight
}



// Export functions for use outside of module
export {
  blueLight,
  redLight,
  hemiLight
}