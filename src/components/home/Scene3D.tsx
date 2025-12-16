'use client'

import React, { useRef, useEffect } from 'react';

import * as THREE from 'three';

import { FontLoader } from 'three/examples/jsm/Addons.js';
import { TTFLoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';

/* Display your skills (Nuxt, AWS, PyTorch) as interconnected "nodes" on a 3D abstract circuit board, with subtle animations flowing between them */

export default function Scene3D () {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // =================== SCENE SETUP
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Shadow settings
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      
      // Append renderer to container
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(renderer.domElement);
      }
      
      camera.position.set(0, 15, 0);
      camera.lookAt(0, 0, 0);

      scene.background = null;

      // =================== LIGHT
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 7);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // =================== NODES & CONNECTIONS DATA
      const skills = [
        { name: 'Nuxt', pos: new THREE.Vector3(-4, 0, 0) },
        { name: 'AWS', pos: new THREE.Vector3(4, 0, 3) },
        { name: 'PyTorch', pos: new THREE.Vector3(7, 0, 5) },
        { name: 'Python', pos: new THREE.Vector3(7, 0, -2) },
        { name: 'Cloud', pos: new THREE.Vector3(0, 0, 4) },
        { name: 'TypeScript', pos: new THREE.Vector3(0, 0, 0) },
      ];

      const nodes: THREE.Group[] = [];
      const packets: { mesh: THREE.Mesh, start: THREE.Vector3, end: THREE.Vector3, progress: number, speed: number }[] = [];

      // =================== ASSETS LOADING
      const ttfLoader = new TTFLoader();
      ttfLoader.load('/fonts/Satoshi-Variable.ttf', (fontData) => {
        const fontLoader = new FontLoader();
        const font = fontLoader.parse(fontData);

        // 1. Create Nodes (Chips)
        skills.forEach((skill) => {
          const group = new THREE.Group();
          group.position.copy(skill.pos);

          // Chip Base
          const geometry = new THREE.BoxGeometry(2, 0.2, 1.5);
          const material = new THREE.MeshStandardMaterial({ 
            color: 0x54DBEC,
            roughness: 0.4, 
            metalness: 0.8 
          });
          const chip = new THREE.Mesh(geometry, material);
          chip.castShadow = true;
          chip.receiveShadow = true;
          group.add(chip);

          // Text Label
          const textGeometry = new TextGeometry(skill.name, {
            font: font,
            size: 0.6,
            depth: 0.1,
            curveSegments: 12,
            bevelEnabled: false,
          });
          textGeometry.center();
          const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.y = 0.2; // Float above chip
          textMesh.rotateX(-Math.PI/2); // Face upward 
          textMesh.castShadow = true;
          group.add(textMesh);

          scene.add(group);
          nodes.push(group);
        });

        // 2. Create Connections (Traces)
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, opacity: 0.3, transparent: true });
        
        // Connect in a loop: 0->1, 1->2, 2->0
        const connections = [[0, 1], [1, 2], [2, 0]];
        
        connections.forEach(([fromIdx, toIdx]) => {
          const start = skills[fromIdx].pos;
          const end = skills[toIdx].pos;
          
          const points = [start, end];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);

          // Create Data Packet (Electron)
          const packetGeo = new THREE.SphereGeometry(0.1, 8, 8);
          const packetMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
          const packet = new THREE.Mesh(packetGeo, packetMat);
          scene.add(packet);

          packets.push({
            mesh: packet,
            start: start,
            end: end,
            progress: 0,
            speed: 0.005 + Math.random() * 0.005 // Random speed variation
          });
        });
      });

      // =================== ANIMATE
      const animate = () => {
        requestAnimationFrame(animate);

        // Animate Packets flowing along lines
        packets.forEach(p => {
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;
          p.mesh.position.lerpVectors(p.start, p.end, p.progress);
        });

        // Animate Nodes (Subtle Float & Rotate)
        nodes.forEach((node, i) => {
           // Float up and down
           node.position.y = skills[i].pos.y + Math.sin(Date.now() * 0.001 + i) * 0.2;
           // Subtle rotation
           node.rotation.y = Math.sin(Date.now() * 0.0005 + i) * 0.1; 
        });

        // Make the directional light slowly orbit in x and z in circular path, how to make it faster: increase the multiplier in Date.now() * 0.0005
        directionalLight.position.x = 10 * Math.cos(Date.now() * 0.002);
        directionalLight.position.z = 10 * Math.sin(Date.now() * 0.002);

        renderer.render(scene, camera);
      }

      animate();
    }
  }, []);

  return <div className='w-1/2' ref={containerRef} />;
}
