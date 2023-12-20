import './style.css'

import * as THREE from 'three';


var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 1400)
var ambient, directionalLight, cloudParticles = [], flash;

var renderer = new THREE.WebGLRenderer();

function initScene() {

  ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);

  directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0,0,1);
  scene.add(directionalLight);

  flash = new THREE.PointLight( 0x85abff, 30, 500, 0.6);
  flash.position.set(200,300,250);
  scene.add(flash);


  cam.position.z = 700;
  cam.position.x = 1.6;
  cam.position.y = -0.09;
  cam.rotation.z = 0.27;
  // cam.position.z = 1000;
  // cam.position.x = 1.6;
  // cam.position.y = -0.12;
  // cam.rotation.z = 0.27;
  scene.add(cam);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  particleSetup();
}

function particleSetup() {


  const loader = new THREE.TextureLoader();
  loader.load("./whiteSmoke.png", function (myTexture) {
    var cloudGeo = new THREE.PlaneGeometry(500, 500);
    var cloudMaterial = new THREE.MeshLambertMaterial(
      {
        map: myTexture,
        transparent: true
      });


    for (let p=0; p<25; p++) {
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
      Math.random()*800 - 400,
      500,
      Math.random()*500 - 450,
    );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random()*360;
      cloud.material.opacity = 0.6;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }

   animate();
   
  });

}

function animate(){
  cloudParticles.forEach(p=>{
    p.rotation.z -= 0.002;
  });

  if(Math.random() > 0.3 || flash.power > 100){
    if(flash.power < 100)
      flash.position.set(
    Math.random()*400,
    300 + Math.random() *200,
    100
    );
    flash.power = 50 + Math.random() * 500;
    // flash.power = 50 + Math.random() * 1000;
  }

  renderer.render(scene, cam);
  requestAnimationFrame(animate)
}


initScene();