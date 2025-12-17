'use client'

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { TTFLoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(renderer.domElement);
      }

      camera.position.set(0, 0, 35);
      camera.lookAt(0, 0, 0);
      
      const mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // Cluster
      const clusters = [
        { name: 'Mechatronics', pos: new THREE.Vector3(15, 0, 0) },
        { name: 'Web', pos: new THREE.Vector3(15 * Math.cos(2 * Math.PI / 3), 0, 15 * Math.sin(2 * Math.PI / 3)) },
        { name: 'Deep Learning', pos: new THREE.Vector3(15 * Math.cos(4 * Math.PI / 3), 0, 15 * Math.sin(4 * Math.PI / 3)) }
      ];

      // Materials & Refs
      const clusterRefs = clusters.map(() => ({
        pointsMat: new THREE.PointsMaterial({ size: 0.1, color: 0x333333, transparent: true, opacity: 0.1 }),
        linesMat: new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.05 }),
        textMat: new THREE.MeshBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.1 }),
        textMesh: null as THREE.Mesh | null,
        rotationGroup: null as THREE.Group | null
      }));

      // Geometry Generation
      const particleCount = 40;
      const radius = 5;
      
      clusters.forEach((cluster, index) => {
        const group = new THREE.Group();
        group.position.copy(cluster.pos);
        mainGroup.add(group);

        // Sub-group for rotation (particles & lines)
        const rotationGroup = new THREE.Group();
        group.add(rotationGroup);
        clusterRefs[index].rotationGroup = rotationGroup;

        // Points
        const ptsGeo = new THREE.BufferGeometry();
        const positions = [];
        for(let i=0; i<particleCount; i++) {
           const r = Math.random() * radius;
           const theta = Math.random() * Math.PI * 2;
           const phi = Math.acos(2 * Math.random() - 1);
           const x = r * Math.sin(phi) * Math.cos(theta);
           const y = r * Math.sin(phi) * Math.sin(theta);
           const z = r * Math.cos(phi);
           positions.push(x, y, z);
        }
        ptsGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const pts = new THREE.Points(ptsGeo, clusterRefs[index].pointsMat);
        rotationGroup.add(pts);

        // Lines (Connect nearby points)
        const lineGeo = new THREE.BufferGeometry();
        const linePos = [];
        for(let i=0; i<positions.length; i+=3) {
            for(let j=i+3; j<positions.length; j+=3) {
                const d = Math.sqrt(
                    Math.pow(positions[i]-positions[j], 2) +
                    Math.pow(positions[i+1]-positions[j+1], 2) +
                    Math.pow(positions[i+2]-positions[j+2], 2)
                );
                if(d < 3.5) {
                    linePos.push(positions[i], positions[i+1], positions[i+2]);
                    linePos.push(positions[j], positions[j+1], positions[j+2]);
                }
            }
        }
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
        const lines = new THREE.LineSegments(lineGeo, clusterRefs[index].linesMat);
        rotationGroup.add(lines);

        // Text (Outside rotationGroup to stay upright relative to cluster center)
        const ttfLoader = new TTFLoader();
        ttfLoader.load('/fonts/Satoshi-Variable.ttf', (json) => {
            const fontLoader = new FontLoader();
            const font = fontLoader.parse(json);
            const textGeo = new TextGeometry(cluster.name, {
                font: font, size: 1.2, depth: 0, curveSegments: 4, bevelEnabled: false
            });
            textGeo.center();
            const textMesh = new THREE.Mesh(textGeo, clusterRefs[index].textMat);
            textMesh.position.set(0, radius + 1.5, 0);
            group.add(textMesh);
            clusterRefs[index].textMesh = textMesh;
        });
      });

      // Inter-cluster connections (Static relative to mainGroup)
      const globalLineMat = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.05 });
      const globalGeo = new THREE.BufferGeometry();
      const globalPos = [];
      globalPos.push(clusters[0].pos.x, clusters[0].pos.y, clusters[0].pos.z);
      globalPos.push(clusters[1].pos.x, clusters[1].pos.y, clusters[1].pos.z);
      globalPos.push(clusters[1].pos.x, clusters[1].pos.y, clusters[1].pos.z);
      globalPos.push(clusters[2].pos.x, clusters[2].pos.y, clusters[2].pos.z);
      globalPos.push(clusters[2].pos.x, clusters[2].pos.y, clusters[2].pos.z);
      globalPos.push(clusters[0].pos.x, clusters[0].pos.y, clusters[0].pos.z);
      globalGeo.setAttribute('position', new THREE.Float32BufferAttribute(globalPos, 3));
      const globalLines = new THREE.LineSegments(globalGeo, globalLineMat);
      mainGroup.add(globalLines);

      // Animation State
      let activeClusterIndex = 0;

      const animate = (time: number) => {
        requestAnimationFrame(animate);
        
        // 1. Main System Orbit (Pure Y-axis rotation)
        mainGroup.rotation.y += 0.001;

        // 2. Individual Cluster Rotation (Electrons)
        clusterRefs.forEach((ref) => {
          if (ref.rotationGroup) {
            ref.rotationGroup.rotation.y -= 0.002;
            ref.rotationGroup.rotation.x += 0.001;
          }
        });

        // Focus Switch Logic (Proximity based)
        let minDistance = Infinity;
        clusters.forEach((cluster, i) => {
          const worldPos = cluster.pos.clone().applyEuler(mainGroup.rotation);
          const distance = worldPos.distanceTo(camera.position);
          if (distance < minDistance) {
            minDistance = distance;
            activeClusterIndex = i;
          }
        });

        // Lerp Styles
        clusterRefs.forEach((ref, i) => {
            const isActive = i === activeClusterIndex;
            const targetColor = isActive ? new THREE.Color(0xFFFFFF) : new THREE.Color(0x555555);
            const targetOpacityPoints = isActive ? 1.0 : 0.6;
            const targetOpacityLines = isActive ? 0.5 : 0.3;
            const targetSize = isActive ? 0.3 : 0.05; 

            // Lerp Color
            ref.pointsMat.color.lerp(targetColor, 0.05);
            ref.linesMat.color.lerp(targetColor, 0.05);
            ref.textMat.color.lerp(targetColor, 0.05);

            // Lerp Opacity
            ref.pointsMat.opacity += (targetOpacityPoints - ref.pointsMat.opacity) * 0.05;
            ref.linesMat.opacity += (targetOpacityLines - ref.linesMat.opacity) * 0.05;
            ref.textMat.opacity += (targetOpacityPoints - ref.textMat.opacity) * 0.05;

            // Lerp Size
            ref.pointsMat.size += (targetSize - ref.pointsMat.size) * 0.05;
            
            // Keep text facing camera
            if (ref.textMesh) {
                ref.textMesh.lookAt(camera.position);
            }
        });

        renderer.render(scene, camera);
      };

      animate(0);
    }
  }, []);

  return <div className='w-full md:w-1/2' ref={containerRef} />;
}
