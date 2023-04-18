import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

const canvas = document.querySelector(".canvas")
const sizes = {
	width: canvas.clientWidth,
	height: canvas.clientHeight
}

// Texture Loader
const loader = new THREE.TextureLoader()
const earth = loader.load("earth.jpg")

// scene
const scene = new THREE.Scene()

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
	alpha: true
})
renderer.setClearColor(0x000000, 0) // the default

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)

// Camera
const camera = new THREE.PerspectiveCamera(
	45,
	sizes.width / sizes.height,
	0.1,
	200
)
camera.position.z = 100

// Geometry

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 90
controls.maxDistance = 140
controls.enableDamping = true
controls.enablePan = false

const geometry = new THREE.SphereGeometry(30, 64, 32)

// Material
const material = new THREE.MeshPhongMaterial({
	map: earth
})

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

{
	const topColor = 0x05c9f5
	const intensity = 3
	const light = new THREE.HemisphereLight(topColor, topColor, intensity)
	scene.add(light)
}

const loop = time => {
	requestAnimationFrame(loop)
	time *= 0.0001
	sphere.rotation.y = time
	controls.update()
	renderer.render(scene, camera)
}
loop()

window.addEventListener("resize", () => {
	sizes.width = canvas.clientWidth
	sizes.height = canvas.clientHeight

	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()
	renderer.setSize(sizes.width, sizes.height)
})
if (window.innerWidth < 440) {
	camera.fov = 50
	camera.position.z = 50
	console.log(camera.position.z)
}
