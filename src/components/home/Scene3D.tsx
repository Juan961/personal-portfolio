'use client'

import React, { useRef, useEffect } from 'react';

import * as THREE from 'three';

export default function Scene3D () {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // =================== SCENE SETUP
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Shadow settings
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      
      // Append renderer to container
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.x = 5;
      camera.position.z = 5;
      camera.position.y = 5;
      camera.lookAt(0, 0, 0);

      scene.background = null;

      // =================== LIGHT
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 10, 0);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // =================== CUBE
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
      const cube = new THREE.Mesh(geometry, material);
      console.log(cube.position)
      cube.castShadow = true;
      cube.receiveShadow = true;
      scene.add(cube);

      // =================== FLOOR
      const geometry2 = new THREE.BoxGeometry(10, 0.1, 10);
      const material2 = new THREE.MeshStandardMaterial({ color: 0xfafafa });
      const cube2 = new THREE.Mesh(geometry2, material2);
      cube2.position.y = -5;
      cube2.castShadow = true;
      cube2.receiveShadow = true;
      scene.add(cube2);
      

      // =================== ANIMATE
      const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      }

      animate();
    }
  }, []);

  return <div className='w-1/2' ref={containerRef} />;
}
