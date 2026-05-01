// components/Dodecahedron.jsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Dodecahedron = ({ size = 300, className = "" }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = size;
    const height = size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    const mount = mountRef.current;
    if (mount) {
      mount.appendChild(renderer.domElement);
    }

    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshBasicMaterial({
      color: "#6A75E4",
      wireframe: true,
      opacity: 0.5,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let rafId;
    const animate = () => {
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.005;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      renderer.dispose();
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  useEffect(() => {
    if (!mountRef.current) return;

    gsap.fromTo(
      mountRef.current,
      { scale: 1 },
      {
        scale: 0.85,
        scrollTrigger: {
          trigger: mountRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default Dodecahedron;