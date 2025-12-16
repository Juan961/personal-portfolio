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
      const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
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
      
      // Tilted camera angle for "circuit board" view
      camera.position.set(0, 20, 0);
      camera.lookAt(0, 0, 0);

      scene.background = null;

      // =================== LIGHT
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 10, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft blue-ish ambient
      scene.add(ambientLight);
      
      // Blue point light for the "core" glow
      const pointLight = new THREE.PointLight(0x00aaff, 2, 20);
      pointLight.position.set(0, 2, 0);
      scene.add(pointLight);

      // =================== NODES & CONNECTIONS DATA
      const skillNames = ['Nuxt', 'AWS', 'PyTorch', 'Python', 'Cloud', 'TS', 'Control', 'Docker'];
      const skills = skillNames.map((name, i) => {
        if (i === 0) return { name, pos: new THREE.Vector3(0, 0, 0), isCenter: true };
        const angle = ((i - 1) / (skillNames.length - 1)) * Math.PI * 2;
        const radius = 8;
        return { name, pos: new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius), isCenter: false };
      });

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
          let geometry;
          let material;
          
          if (skill.isCenter) {
             // Central CPU - Square/Box
             geometry = new THREE.BoxGeometry(5, 0.5, 5);
             material = new THREE.MeshPhysicalMaterial({ 
                color: 0x00aaff,
                metalness: 0.9,
                roughness: 0.2,
                transmission: 0.5,
                opacity: 0.8,
                transparent: true,
                emissive: 0x002244,
                emissiveIntensity: 0.5
             });
          } else {
             // Outer Nodes - Hexagons
             geometry = new THREE.CylinderGeometry(1.8, 1.8, 0.2, 6);
             material = new THREE.MeshPhysicalMaterial({ 
                color: 0x54DBEC,
                metalness: 0.8,
                roughness: 0.4,
                flatShading: true,
                transparent: true,
                opacity: 0.9
             });
          }

          const chip = new THREE.Mesh(geometry, material);
          chip.castShadow = true;
          chip.receiveShadow = true;
          if (!skill.isCenter) chip.rotation.y = Math.PI / 6; // Rotate hexagon to point flat side
          group.add(chip);

          // Text Label
          const textGeometry = new TextGeometry(skill.name, {
            font: font,
            size: skill.isCenter ? 1.2 : 0.5,
            depth: 0.1,
            curveSegments: 12,
            bevelEnabled: false,
          });
          textGeometry.center();
          const textMaterial = new THREE.MeshStandardMaterial({ 
              color: 0xffffff, 
              emissive: 0xffffff, 
              emissiveIntensity: 0.5 
          });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.y = 0.4; 
          textMesh.rotateX(-Math.PI/2); 
          group.add(textMesh);

          scene.add(group);
          nodes.push(group);
        });

        // 2. Create Connections (Traces)
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, opacity: 0.4, transparent: true });
        
        const connections: number[][] = [];
        // Connect Center (0) to all others
        for (let i = 1; i < skills.length; i++) {
            connections.push([0, i]);
        }
        // Connect Outer Ring
        for (let i = 1; i < skills.length; i++) {
            const next = i === skills.length - 1 ? 1 : i + 1;
            connections.push([i, next]);
        }
        
        connections.forEach(([fromIdx, toIdx]) => {
          const start = skills[fromIdx].pos;
          const end = skills[toIdx].pos;
          
          const points = [start, end];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);

          // Create Data Packet (Electron)
          const packetGeo = new THREE.SphereGeometry(0.15, 8, 8);
          const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
          const packet = new THREE.Mesh(packetGeo, packetMat);
          scene.add(packet);

          packets.push({
            mesh: packet,
            start: start,
            end: end,
            progress: Math.random(), // Random start pos
            speed: 0.002 + Math.random() * 0.004
          });
        });
      });

      // =================== PARTICLES
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 300;
      const posArray = new Float32Array(particlesCount * 3);
      
      for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 30; // Spread around
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00aaff,
        transparent: true,
        opacity: 0.6,
      });
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);


      // =================== ANIMATE
      const animate = () => {
        requestAnimationFrame(animate);

        // Animate Packets
        packets.forEach(p => {
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;
          p.mesh.position.lerpVectors(p.start, p.end, p.progress);
        });

        // Animate Nodes
        nodes.forEach((node, i) => {
           node.position.y = skills[i].pos.y + Math.sin(Date.now() * 0.001 + i) * 0.1;
        });
        
        // Rotate particles slowly
        particlesMesh.rotation.y += 0.0005;

        // Orbit light
        directionalLight.position.x = 10 * Math.cos(Date.now() * 0.001);
        directionalLight.position.z = 10 * Math.sin(Date.now() * 0.001);

        renderer.render(scene, camera);
      }

      animate();
    }
  }, []);

  return <div className='w-1/2' ref={containerRef} />;
}
