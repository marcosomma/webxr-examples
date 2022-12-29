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
      0.1,
      100
    );
    this.camera.position.set(0, 0, 6);

    // Set up SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x002222);

    // Set up LIGHTS
    const ambient = new THREE.HemisphereLight(0xffffff, 0x0000ff, 0.5);
    const light = new THREE.DirectionalLight();
    light.position.set(0.2, 1, 1);

    // Set up RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);
    this.renderer.setAnimationLoop(this.render.bind(this));

    // Set up OBJECTS and MATERIALS
    const box = new THREE.BoxBufferGeometry();
    const circle = new THREE.CircleBufferGeometry(.5, 32, 0, Math.PI);
    const cone = new THREE.ConeBufferGeometry(.5, 1, 24);
    const material1 = new THREE.MeshStandardMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    const material2 = new THREE.MeshLambertMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const material3 = new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.DoubleSide, specular: 0xffffff });
    this.meshBox = new THREE.Mesh(box, material1);
    this.meshCircle = new THREE.Mesh(circle, material2);
    this.meshCone = new THREE.Mesh(cone, material3);

    // Add to the SCENE
    this.scene.add(ambient);
    this.scene.add(light);
    this.scene.add(this.meshBox);
    this.scene.add(this.meshCircle);
    this.scene.add(this.meshCone);
    this.meshBox.position.x = 3
    this.meshCircle.position.x = 1
    this.meshCone.position.x = -1

    // Add resizeEvent listener
    window.addEventListener("resize", this.resize.bind(this));
        
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.update();
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    // Do something with the objects in the scene
    this.meshBox.rotateY(0.01);
    this.meshBox.rotateZ(-0.01);
    this.meshBox.rotateX(0.01);
    this.meshCircle.rotateY(-0.01);
    this.meshCircle.rotateZ(0.01);
    this.meshCircle.rotateX(-0.01);
    this.meshCone.rotateY(0.01);
    this.meshCone.rotateZ(-0.01);
    this.meshCone.rotateX(0.01);
    this.renderer.render(this.scene, this.camera);
  }
}

export { App };
