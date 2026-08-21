'use client';

import { useRef, useEffect } from 'react';

export default function OrbitSimulation({
  className = '',
  semiMajorAxis = 1.0,
  eccentricity = 0.016,
  mass = 1.0,
}) {
  const containerRef = useRef(null);

  // Refs to hold live mutable Three.js values across renders
  const paramsRef = useRef({ semiMajorAxis, eccentricity, mass });

  // Update paramsRef whenever props change without re-running full Three.js init
  useEffect(() => {
    paramsRef.current = { semiMajorAxis, eccentricity, mass };
  }, [semiMajorAxis, eccentricity, mass]);

  useEffect(() => {
    let animationFrameId;
    let renderer, scene, camera, controls;
    let sunMesh, planetMesh, orbitLine, milkyWaySphere;
    let THREE;

    const container = containerRef.current;
    if (!container) return;

    const init = async () => {
      THREE = await import('three');

      let OrbitControls;
      try {
        const module = await import('three/examples/jsm/controls/OrbitControls.js');
        OrbitControls = module.OrbitControls;
      } catch (e) {
        console.log(e);
      }

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // 1. Scene setup
      scene = new THREE.Scene();

      // 2. Camera setup - Exact camera position (10, 15, 20)
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(10, 15, 20);
      camera.lookAt(0, 0, 0);

      // 3. Renderer setup
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // 4. OrbitControls for smooth interaction
      if (OrbitControls) {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.target.set(0, 0, 0);
        controls.update();
      }

      // 5. Lights
      const ambientLight = new THREE.AmbientLight(0x666688, 2.5);
      scene.add(ambientLight);

      const sunLight = new THREE.PointLight(0xffd700, 6, 100);
      sunLight.position.set(0, 0, 0);
      scene.add(sunLight);

      // 6. Milky Way Skybox Sphere Background
      const textureLoader = new THREE.TextureLoader();
      const milkyWayTexture = textureLoader.load(
        'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80'
      );
      milkyWayTexture.wrapS = THREE.RepeatWrapping;
      milkyWayTexture.wrapT = THREE.ClampToEdgeWrapping;

      const bgGeom = new THREE.SphereGeometry(400, 64, 64);
      const bgMat = new THREE.MeshBasicMaterial({
        map: milkyWayTexture,
        side: THREE.BackSide,
        color: 0x8888aa,
      });
      milkyWaySphere = new THREE.Mesh(bgGeom, bgMat);
      milkyWaySphere.rotation.z = Math.PI / 6;
      scene.add(milkyWaySphere);

      // 7. Sun Mesh
      const sunGeom = new THREE.SphereGeometry(2, 32, 32);
      const sunMat = new THREE.MeshStandardMaterial({
        color: 0xf0c040,
        emissive: 0xf0c040,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      sunMesh = new THREE.Mesh(sunGeom, sunMat);
      scene.add(sunMesh);

      // 8. Planet Mesh
      const planetGeom = new THREE.SphereGeometry(0.65, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        emissive: 0x003344,
        roughness: 0.2,
        metalness: 0.4,
      });
      planetMesh = new THREE.Mesh(planetGeom, planetMat);
      scene.add(planetMesh);

      // 9. Initial Orbit Line
      const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
      });
      orbitLine = new THREE.Line(new THREE.BufferGeometry(), orbitMaterial);
      orbitLine.rotation.x = Math.PI / 2;
      scene.add(orbitLine);

      // Function to update Kepler Orbit Line Geometry dynamically
      const updateOrbitGeometry = (a, e) => {
        const scaleA = Math.max(4, a * 12);
        const ecc = Math.min(0.95, Math.max(0.0, e));
        const b = scaleA * Math.sqrt(1 - ecc * ecc);
        const focus = scaleA * ecc;

        const curve = new THREE.EllipseCurve(-focus, 0, scaleA, b, 0, 2 * Math.PI, false, 0);
        const points = curve.getPoints(140);
        const newGeom = new THREE.BufferGeometry().setFromPoints(points);

        if (orbitLine.geometry) orbitLine.geometry.dispose();
        orbitLine.geometry = newGeom;
      };

      updateOrbitGeometry(paramsRef.current.semiMajorAxis, paramsRef.current.eccentricity);

      // 10. Starfield Dust Particles Background
      const particlesGeom = new THREE.BufferGeometry();
      const count = 800;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 150;
      }
      particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.4,
        transparent: true,
        opacity: 0.8,
      });
      const starParticles = new THREE.Points(particlesGeom, particlesMat);
      scene.add(starParticles);

      // 11. Animation Loop
      let time = 0;
      let lastA = paramsRef.current.semiMajorAxis;
      let lastE = paramsRef.current.eccentricity;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const { semiMajorAxis: curA, eccentricity: curE, mass: curM } = paramsRef.current;

        // If orbit parameters changed, update geometry on the fly without recreating WebGL!
        if (curA !== lastA || curE !== lastE) {
          updateOrbitGeometry(curA, curE);
          lastA = curA;
          lastE = curE;
        }

        const scaleA = Math.max(4, curA * 12);
        const ecc = Math.min(0.95, Math.max(0.0, curE));
        const b = scaleA * Math.sqrt(1 - ecc * ecc);
        const focus = scaleA * ecc;
        const speed = 0.01 * Math.sqrt(curM);

        time += speed;

        const x = scaleA * Math.cos(time) - focus;
        const z = b * Math.sin(time);

        if (planetMesh) {
          planetMesh.position.set(x, 0, z);
        }
        if (sunMesh) {
          sunMesh.rotation.y += 0.005;
        }
        if (milkyWaySphere) {
          milkyWaySphere.rotation.y += 0.0001;
        }

        if (controls) {
          controls.update();
        }

        renderer.render(scene, camera);
      };

      animate();

      // 12. Resize Handler
      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      container._cleanup = () => {
        window.removeEventListener('resize', handleResize);
        if (controls) controls.dispose();
      };
    };

    init();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && containerRef.current._cleanup) {
        containerRef.current._cleanup();
      }
      if (renderer && renderer.domElement) {
        renderer.domElement.remove();
        renderer.dispose();
      }
    };
  }, []); // Run setup ONCE on mount

  return (
    <div
      ref={containerRef}
      className={`relative z-10 w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  );
}
