import * as THREE from "../../libs/three/three.module.js";
import { OrbitControls } from "../../libs/three/jsm/OrbitControls.js";

class App {
  constructor() {
    const container = document.createElement("div");
    document.body.appendChild(container);
	// Set up CAMERA
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      .1,
      100
    );
    this.camera.position.set(0, 0, 4);

	// Set up SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x002222);

	// Set up LIGHTS
	const ambient = new THREE.HemisphereLight( 0xffffff, 0x0000ff, .3)
	const light = new THREE.DirectionalLight()
	light.position.set(.2, 1, 1)

	// Set up RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);
    this.renderer.setAnimationLoop(this.render.bind(this));

	// Set up OBJECTS and MATERIALS
	const geometry = new THREE.BoxBufferGeometry();
	const material = new THREE.MeshStandardMaterial({ color: 0xff0000})
	this.mesh = new THREE.Mesh(geometry, material)

	// Add to the SCENE
	this.scene.add(ambient)
	this.scene.add(light)
	this.scene.add(this.mesh)

	// Add resizeEvent listener
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {}

  render() {
	// Do something with the objects in the scene
	this.mesh.rotateY(Math.random()/1000)
	this.mesh.rotateZ(-.001)
	this.mesh.rotateX(.001)
	this.renderer.render(this.scene, this.camera)
  }
}

export { App };
