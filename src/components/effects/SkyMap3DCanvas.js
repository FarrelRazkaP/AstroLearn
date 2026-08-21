'use client';

import { useEffect, useRef } from 'react';

export default function SkyMap3DCanvas({ target }) {
  const containerRef = useRef(null);
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useEffect(() => {
    let animationFrameId;
    let scene, camera, renderer, starSphere, constellationGroup;
    let targetGroup, reticleRing;
    let orion3DGroup, andromeda3DGroup, sirius3DGroup, pleiades3DGroup;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const targetRotations = {
      'Orion Nebula': { rotY: 1.46, rotX: 0.09 },
      'Andromeda Galaxy': { rotY: 0.18, rotX: -0.72 },
      'Sirius A': { rotY: 1.76, rotX: 0.29 },
      'Pleiades Cluster': { rotY: 0.99, rotX: -0.42 },
    };

    const container = containerRef.current;
    if (!container) return;

    async function init() {
      const THREE = await import('three');

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // 1. Scene & Camera Setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 1;

      // 2. Renderer Setup
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Helper function: Soft radial glow particle texture (NO SQUARE BORDERS!)
      const createGlowTexture = (colorHex) => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, colorHex);
        grad.addColorStop(0.3, colorHex);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(64, 64, 64, 0, Math.PI * 2);
        ctx.fill();

        return new THREE.CanvasTexture(canvas);
      };

      const whiteGlowTex = createGlowTexture('rgba(255,255,255,1)');
      const cyanGlowTex = createGlowTexture('rgba(0,212,255,1)');
      const pinkGlowTex = createGlowTexture('rgba(255,0,170,1)');
      const goldGlowTex = createGlowTexture('rgba(255,215,0,1)');

      // 3. Star Sphere (Radius 500, BackSide)
      const starGeometry = new THREE.SphereGeometry(500, 64, 64);
      const starMaterial = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        color: 0x070a1a,
      });

      // 4. Procedural Deep Space Background
      const bgCanvas = document.createElement('canvas');
      bgCanvas.width = 1024;
      bgCanvas.height = 1024;
      const bgCtx = bgCanvas.getContext('2d');
      bgCtx.fillStyle = '#070a1a';
      bgCtx.fillRect(0, 0, 1024, 1024);

      const grad = bgCtx.createLinearGradient(0, 0, 1024, 1024);
      grad.addColorStop(0, 'rgba(7, 10, 26, 1)');
      grad.addColorStop(0.3, 'rgba(20, 14, 50, 0.6)');
      grad.addColorStop(0.5, 'rgba(50, 40, 90, 0.4)');
      grad.addColorStop(0.7, 'rgba(20, 14, 50, 0.6)');
      grad.addColorStop(1, 'rgba(7, 10, 26, 1)');
      bgCtx.fillStyle = grad;
      bgCtx.fillRect(0, 0, 1024, 1024);

      for (let i = 0; i < 6000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const r = Math.random() * 1.5;
        bgCtx.fillStyle = i % 10 === 0 ? '#00d4ff' : i % 15 === 0 ? '#ffd700' : i % 25 === 0 ? '#ff77aa' : 'white';
        bgCtx.beginPath();
        bgCtx.arc(x, y, r, 0, Math.PI * 2);
        bgCtx.fill();
      }

      const starTexture = new THREE.CanvasTexture(bgCanvas);
      starMaterial.map = starTexture;
      starSphere = new THREE.Mesh(starGeometry, starMaterial);
      scene.add(starSphere);

      // 5. Constellation Lines
      constellationGroup = new THREE.Group();
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.25,
      });

      for (let i = 0; i < 25; i++) {
        const points = [];
        for (let j = 0; j < 5; j++) {
          points.push(
            new THREE.Vector3(
              (Math.random() - 0.5) * 400,
              (Math.random() - 0.5) * 400,
              (Math.random() - 0.5) * 400
            )
              .normalize()
              .multiplyScalar(490)
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        constellationGroup.add(line);
      }
      scene.add(constellationGroup);

      // 6. Target Group with Reticle Ring and Procedural 3D Visual Objects
      targetGroup = new THREE.Group();

      // Lock Reticle Ring
      const ringGeom = new THREE.RingGeometry(35, 37, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      reticleRing = new THREE.Mesh(ringGeom, ringMat);
      targetGroup.add(reticleRing);

      // --- PROCEDURAL OBJECT 1: Orion Nebula (M42) Volumetric Particle Gas Cloud ---
      orion3DGroup = new THREE.Group();
      const particleCount = 1200;
      const orionPositions = new Float32Array(particleCount * 3);
      const orionColors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        orionPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        orionPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
        orionPositions[i * 3 + 2] = radius * Math.cos(phi) * 0.6;

        // Magenta & Cyan & Purple Gas Cloud Colors
        if (i % 3 === 0) {
          orionColors[i * 3] = 1.0;
          orionColors[i * 3 + 1] = 0.0;
          orionColors[i * 3 + 2] = 0.67; // Magenta
        } else if (i % 3 === 1) {
          orionColors[i * 3] = 0.0;
          orionColors[i * 3 + 1] = 0.83;
          orionColors[i * 3 + 2] = 1.0; // Cyan
        } else {
          orionColors[i * 3] = 0.53;
          orionColors[i * 3 + 1] = 0.27;
          orionColors[i * 3 + 2] = 1.0; // Violet
        }
      }

      const orionGeom = new THREE.BufferGeometry();
      orionGeom.setAttribute('position', new THREE.BufferAttribute(orionPositions, 3));
      orionGeom.setAttribute('color', new THREE.BufferAttribute(orionColors, 3));

      const orionMat = new THREE.PointsMaterial({
        size: 3.5,
        map: pinkGlowTex,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.85,
      });

      const orionPoints = new THREE.Points(orionGeom, orionMat);
      orion3DGroup.add(orionPoints);
      targetGroup.add(orion3DGroup);

      // --- PROCEDURAL OBJECT 2: Andromeda Galaxy (M31) 3D Particle Spiral Arms ---
      andromeda3DGroup = new THREE.Group();
      const galaxyParticleCount = 3000;
      const galaxyPositions = new Float32Array(galaxyParticleCount * 3);
      const galaxyColors = new Float32Array(galaxyParticleCount * 3);

      for (let i = 0; i < galaxyParticleCount; i++) {
        // Spiral arm equation
        const armIndex = i % 2;
        const distance = Math.pow(Math.random(), 2) * 35;
        const angle = distance * 0.2 + armIndex * Math.PI;

        galaxyPositions[i * 3] = Math.cos(angle) * distance + (Math.random() - 0.5) * 2;
        galaxyPositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
        galaxyPositions[i * 3 + 2] = Math.sin(angle) * distance + (Math.random() - 0.5) * 2;

        // Core gold, arms cyan-white
        if (distance < 8) {
          galaxyColors[i * 3] = 1.0;
          galaxyColors[i * 3 + 1] = 0.85;
          galaxyColors[i * 3 + 2] = 0.4;
        } else {
          galaxyColors[i * 3] = 0.7;
          galaxyColors[i * 3 + 1] = 0.85;
          galaxyColors[i * 3 + 2] = 1.0;
        }
      }

      const galaxyGeom = new THREE.BufferGeometry();
      galaxyGeom.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
      galaxyGeom.setAttribute('color', new THREE.BufferAttribute(galaxyColors, 3));

      const galaxyMat = new THREE.PointsMaterial({
        size: 2.2,
        map: goldGlowTex,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.9,
      });

      const galaxyPoints = new THREE.Points(galaxyGeom, galaxyMat);
      galaxyPoints.rotation.x = Math.PI / 3;
      andromeda3DGroup.add(galaxyPoints);
      targetGroup.add(andromeda3DGroup);

      // --- PROCEDURAL OBJECT 3: Sirius A Blazing 3D Star & Diffraction Flare Rays ---
      sirius3DGroup = new THREE.Group();

      const siriusCoreGeom = new THREE.SphereGeometry(6, 32, 32);
      const siriusCoreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const siriusCore = new THREE.Mesh(siriusCoreGeom, siriusCoreMat);
      sirius3DGroup.add(siriusCore);

      // Blazing Halo Sprite
      const siriusHaloMat = new THREE.SpriteMaterial({
        map: cyanGlowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.95,
      });
      const siriusHalo = new THREE.Sprite(siriusHaloMat);
      siriusHalo.scale.set(45, 45, 1);
      sirius3DGroup.add(siriusHalo);

      // Cross Lens Flare Rays
      const flareMat = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
      });
      const flareGeomH = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-30, 0, 0),
        new THREE.Vector3(30, 0, 0),
      ]);
      const flareGeomV = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -30, 0),
        new THREE.Vector3(0, 30, 0),
      ]);
      sirius3DGroup.add(new THREE.Line(flareGeomH, flareMat));
      sirius3DGroup.add(new THREE.Line(flareGeomV, flareMat));
      targetGroup.add(sirius3DGroup);

      // --- PROCEDURAL OBJECT 4: Pleiades Cluster (M45) 7 Glowing Stars & Nebulae ---
      pleiades3DGroup = new THREE.Group();
      const pleiadesCoords = [
        [0, 0, 0],
        [8, 5, 0],
        [-9, 7, 2],
        [6, -8, -2],
        [-7, -6, 1],
        [11, -3, -1],
        [-4, 11, -2],
      ];

      pleiadesCoords.forEach(([x, y, z]) => {
        const starGeom = new THREE.SphereGeometry(2.2, 16, 16);
        const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const starM = new THREE.Mesh(starGeom, starMat);
        starM.position.set(x, y, z);
        pleiades3DGroup.add(starM);

        const haloSprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: cyanGlowTex,
            transparent: true,
            blending: THREE.AdditiveBlending,
            opacity: 0.8,
          })
        );
        haloSprite.scale.set(16, 16, 1);
        haloSprite.position.set(x, y, z);
        pleiades3DGroup.add(haloSprite);
      });
      targetGroup.add(pleiades3DGroup);

      // Position target group in 3D scene depth
      targetGroup.position.set(0, 0, -380);
      scene.add(targetGroup);

      // 7. Interactive Drag Rotation
      const handleMouseDown = (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const handleMouseUp = () => {
        isDragging = false;
      };

      const handleMouseMove = (e) => {
        if (isDragging && starSphere) {
          const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y,
          };
          starSphere.rotation.y += deltaMove.x * 0.002;
          starSphere.rotation.x += deltaMove.y * 0.002;
          constellationGroup.rotation.y += deltaMove.x * 0.002;
          constellationGroup.rotation.x += deltaMove.y * 0.002;
        }
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);

      // 8. Animation Loop
      function animate() {
        animationFrameId = requestAnimationFrame(animate);

        const currentTargetName = targetRef.current?.name || 'Orion Nebula';
        const targetRot = targetRotations[currentTargetName] || targetRotations['Orion Nebula'];

        // Smoothly lerp camera / sphere rotation toward target
        if (!isDragging && starSphere) {
          starSphere.rotation.y += (targetRot.rotY - starSphere.rotation.y) * 0.08;
          starSphere.rotation.x += (targetRot.rotX - starSphere.rotation.x) * 0.08;
          constellationGroup.rotation.y = starSphere.rotation.y;
          constellationGroup.rotation.x = starSphere.rotation.x;
        }

        // Toggle visibility of procedural 3D objects
        if (orion3DGroup) {
          orion3DGroup.visible = currentTargetName === 'Orion Nebula';
          orion3DGroup.rotation.z += 0.002;
        }
        if (andromeda3DGroup) {
          andromeda3DGroup.visible = currentTargetName === 'Andromeda Galaxy';
          andromeda3DGroup.rotation.z += 0.004;
        }
        if (sirius3DGroup) {
          sirius3DGroup.visible = currentTargetName === 'Sirius A';
          sirius3DGroup.rotation.z += 0.005;
        }
        if (pleiades3DGroup) {
          pleiades3DGroup.visible = currentTargetName === 'Pleiades Cluster';
          pleiades3DGroup.rotation.z += 0.002;
        }

        // Pulse Reticle Ring Animation
        if (reticleRing) {
          const scale = 1 + Math.sin(Date.now() * 0.004) * 0.08;
          reticleRing.scale.set(scale, scale, 1);
        }

        renderer.render(scene, camera);
      }

      animate();

      // 9. Resize Handler
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
        container.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    }

    init();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container._cleanup) container._cleanup();
      if (renderer && renderer.domElement) {
        renderer.domElement.remove();
        renderer.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing select-none" />;
}
