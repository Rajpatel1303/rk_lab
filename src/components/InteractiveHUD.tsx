import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Activity, RotateCcw, Sliders, Box, Cpu, Compass, Play, Zap, RefreshCw } from "lucide-react";
import { gsap } from "gsap";
import { playHoverTick, playMenuHover, playSelectTick, playSciFiWarpSweep } from "../utils/sound";

interface Particle2D {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isDragging?: boolean;
}

export default function InteractiveHUD() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef2D = useRef<HTMLCanvasElement>(null);
  const canvasRef3D = useRef<HTMLCanvasElement>(null);

  // ENGINE MODE CONTROLLER: "2d" (Fluid Physics) vs "3d" (ThreeJS WebGL)
  const [engineMode, setEngineMode] = useState<"2d" | "3d">("2d");

  // Performance Guard: Track component visibility in viewport
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // State shared/diagnostic logs
  const [realtimeFPS, setRealtimeFPS] = useState<number>(60);
  const [latencyValue, setLatencyValue] = useState<number>(0.12);

  // ==========================================
  // --- STATE FOR 2D KINETIC ENGINE ---
  // ==========================================
  const [gravityType2D, setGravityType2D] = useState<"none" | "down" | "center">("center");
  const [magneticPower2D, setMagneticPower2D] = useState<boolean>(true);
  const [activeLasers2D, setActiveLasers2D] = useState<boolean>(true);
  const [particleCount2D, setParticleCount2D] = useState<number>(24);
  const [hoveredIndex2D, setHoveredIndex2D] = useState<number | null>(null);

  const particles2DRef = useRef<Particle2D[]>([]);
  const mouse2DRef = useRef<{ x: number; y: number; isDown: boolean; activeId: number | null }>({
    x: -1000,
    y: -1000,
    isDown: false,
    activeId: null,
  });
  const dragStart2DRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  // ==========================================
  // --- STATE FOR 3D THREE.JS ENGINE ---
  // ==========================================
  const [geometryType3D, setGeometryType3D] = useState<"torusKnot" | "icosahedron" | "sphere">("torusKnot");
  const [colorTheme3D, setColorTheme3D] = useState<"cyan" | "emerald" | "amber">("emerald");
  const [particleDensity3D, setParticleDensity3D] = useState<number>(300);
  const [currentSpeed3D, setCurrentSpeed3D] = useState<number>(1);

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const activeMeshRef = useRef<THREE.Mesh | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);

  // Drag inertia for 3D spinning
  const rotateData3DRef = useRef({
    x: 0,
    y: 0,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRotationX: 0,
    targetRotationY: 0,
  });
  const mouseNDC3DRef = useRef({ x: 0, y: 0 });

  // Helper theme colors to map to hex
  const getThemeColor = (themeName: "cyan" | "emerald" | "amber", isHex = false) => {
    if (isHex) {
      if (themeName === "cyan") return 0x06b6d4;
      if (themeName === "amber") return 0xf59e0b;
      return 0x10b981;
    } else {
      if (themeName === "cyan") return "rgb(6, 182, 212)";
      if (themeName === "amber") return "rgb(245, 158, 11)";
      return "rgb(16, 185, 129)";
    }
  };

  // ==========================================
  // --- ENGINE WORKER 2D LOGIC ---
  // ==========================================
  const initParticles2D = (width: number, height: number, count: number) => {
    const list: Particle2D[] = [];
    const colors = [
      "rgba(16, 185, 129, 0.8)", // Emerald
      "rgba(20, 184, 166, 0.8)", // Teal
      "rgba(6, 182, 212, 0.8)",  // Cyan
      "rgba(249, 115, 22, 0.8)", // Amber
    ];

    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: Math.random() * 4.5 + 4,
        color: colors[i % colors.length],
      });
    }
    particles2DRef.current = list;
  };

  // 2D Frame Loop
  useEffect(() => {
    if (engineMode !== "2d") return;

    let animationId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsInterval = lastTime;

    const canvas = canvasRef2D.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const parentWidth = rect?.width || 350;
      const parentHeight = 280;
      canvas.width = parentWidth;
      canvas.height = parentHeight;

      if (particles2DRef.current.length === 0) {
        initParticles2D(parentWidth, parentHeight, particleCount2D);
      }
    };
    updateSize();

    const resizeObserver = new ResizeObserver(() => updateSize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const gravityAccel = 0.15;
    const friction = 0.985;
    const pullStrength = 0.08;

    const tick = (now: number) => {
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(tick);
        return;
      }
      const width = canvas.width;
      const height = canvas.height;

      // Diagnostic calculations
      const frameDelta = now - lastTime;
      lastTime = now;
      frameCount++;

      if (now - fpsInterval >= 1000) {
        setRealtimeFPS(Math.round((frameCount * 1000) / (now - fpsInterval)));
        frameCount = 0;
        fpsInterval = now;
        setLatencyValue(parseFloat((0.08 + Math.random() * 0.06).toFixed(2)));
      }

      const mouse = mouse2DRef.current;
      const list = particles2DRef.current;

      list.forEach((p) => {
        if (p.isDragging) {
          p.x += (mouse.x - p.x) * 0.3;
          p.y += (mouse.y - p.y) * 0.3;
          p.vx = 0;
          p.vy = 0;
          return;
        }

        // Apply constant gravity vector checks
        if (gravityType2D === "down") {
          p.vy += gravityAccel;
        } else if (gravityType2D === "center") {
          const cx = width / 2;
          const cy = height / 2;
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          p.vx += (dx / dist) * pullStrength;
          p.vy += (dy / dist) * pullStrength;
        }

        // Apply dynamic mouse magnetic cursor pull
        if (magneticPower2D && mouse.x > -500) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 1) {
            const force = (120 - dist) / 120;
            p.vx += (dx / dist) * force * 0.45;
            p.vy += (dy / dist) * force * 0.45;
          }
        }

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        // Bouncing Elastic Boundary limits
        const bounceCoeff = -0.85;
        if (p.x < p.radius) {
          p.x = p.radius;
          p.vx *= bounceCoeff;
        } else if (p.x > width - p.radius) {
          p.x = width - p.radius;
          p.vx *= bounceCoeff;
        }

        if (p.y < p.radius) {
          p.y = p.radius;
          p.vy *= bounceCoeff;
        } else if (p.y > height - p.radius) {
          p.y = height - p.radius;
          p.vy *= bounceCoeff;
        }

        // Node repulsive elastic collision logic
        list.forEach((other) => {
          if (p.id === other.id) return;
          const dx = other.x - p.x;
          const dy = other.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = p.radius + other.radius;
          if (dist < minDist) {
            const overlap = minDist - dist;
            const pushX = (dx / dist) * overlap * 0.5;
            const pushY = (dy / dist) * overlap * 0.5;

            if (!p.isDragging) {
              p.x -= pushX;
              p.y -= pushY;
            }
            if (!other.isDragging) {
              other.x += pushX;
              other.y += pushY;
            }

            const tempvx = p.vx;
            const tempvy = p.vy;
            p.vx = other.vx * 0.8;
            p.vy = other.vy * 0.8;
            other.vx = tempvx * 0.8;
            other.vy = tempvy * 0.8;
          }
        });
      });

      // Drawing 2D graphics elements
      ctx.clearRect(0, 0, width, height);

      // Fine grid graphics background
      ctx.strokeStyle = "rgba(71, 85, 105, 0.08)";
      ctx.lineWidth = 1;
      const grid = 28;
      for (let x = 0; x < width; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render connection alignment lasers
      if (activeLasers2D) {
        ctx.lineWidth = 0.9;
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            const p1 = list[i];
            const p2 = list[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 80) {
              const opacity = (80 - dist) / 80;
              ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.25})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw light magnetic field indicator
      if (mouse.x > -500) {
        ctx.strokeStyle = "rgba(16, 185, 129, 0.05)";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(16, 185, 129, 0.12)";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 35, 0, Math.PI * 2);
        ctx.stroke();

        list.forEach((p) => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(20, 184, 166, ${(120 - d) / 120 * 0.16})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        });
      }

      // Render Solid Core Particles with vibrant drop aura glow effects
      list.forEach((p) => {
        const glow = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, p.radius * 2.5);
        glow.addColorStop(0, p.color);
        glow.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = p.isDragging ? "rgb(255, 255, 255)" : p.color;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Core visual dot
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [engineMode, gravityType2D, magneticPower2D, activeLasers2D, particleCount2D]);

  const handleMouseMove2D = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef2D.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouse2DRef.current.x = x;
    mouse2DRef.current.y = y;

    let hoverIdx = -1;
    particles2DRef.current.forEach((p, index) => {
      const dist = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
      if (dist < p.radius + 8) hoverIdx = index;
    });
    setHoveredIndex2D(hoverIdx !== -1 ? hoverIdx : null);
  };

  const handleMouseDown2D = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef2D.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouse2DRef.current.isDown = true;

    let targetParticle: Particle2D | null = null;
    particles2DRef.current.forEach((p) => {
      const dist = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
      if (dist < p.radius + 12) targetParticle = p;
    });

    if (targetParticle) {
      const p = targetParticle as Particle2D;
      p.isDragging = true;
      mouse2DRef.current.activeId = p.id;
      dragStart2DRef.current = {
        x,
        y,
        px: p.x,
        py: p.y,
      };
    } else {
      // Create new dynamic kinetic custom particles
      const colors = [
        "rgba(16, 185, 129, 0.8)",
        "rgba(20, 184, 166, 0.8)",
        "rgba(6, 182, 212, 0.8)",
        "rgba(249, 115, 22, 0.8)",
      ];
      const newP: Particle2D = {
        id: Date.now() + Math.random(),
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        radius: Math.random() * 4 + 4.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        isDragging: false,
      };
      particles2DRef.current.push(newP);
    }
  };

  const handleMouseUp2D = () => {
    mouse2DRef.current.isDown = false;
    if (mouse2DRef.current.activeId !== null) {
      const p = particles2DRef.current.find(item => item.id === mouse2DRef.current.activeId);
      if (p) p.isDragging = false;
    }
    mouse2DRef.current.activeId = null;
    dragStart2DRef.current = null;
  };

  const handleTouchStart2D = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef2D.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    mouse2DRef.current.x = x;
    mouse2DRef.current.y = y;
    mouse2DRef.current.isDown = true;

    let targetParticle: Particle2D | null = null;
    particles2DRef.current.forEach((p) => {
      const dist = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
      if (dist < p.radius + 20) targetParticle = p;
    });

    if (targetParticle) {
      const p = targetParticle as Particle2D;
      p.isDragging = true;
      mouse2DRef.current.activeId = p.id;
      dragStart2DRef.current = {
        x,
        y,
        px: p.x,
        py: p.y,
      };
    } else {
      const colors = [
        "rgba(16, 185, 129, 0.8)",
        "rgba(20, 184, 166, 0.8)",
        "rgba(6, 182, 212, 0.8)",
        "rgba(249, 115, 22, 0.8)",
      ];
      const newP: Particle2D = {
        id: Date.now() + Math.random(),
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        radius: Math.random() * 4 + 4.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        isDragging: false,
      };
      particles2DRef.current.push(newP);
    }
  };

  const handleTouchMove2D = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef2D.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    mouse2DRef.current.x = x;
    mouse2DRef.current.y = y;

    let hoverIdx = -1;
    particles2DRef.current.forEach((p, index) => {
      const dist = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
      if (dist < p.radius + 20) hoverIdx = index;
    });
    setHoveredIndex2D(hoverIdx !== -1 ? hoverIdx : null);
  };

  const handleTouchEnd2D = () => {
    handleMouseUp2D();
  };

  const clearMouse2D = () => {
    mouse2DRef.current.x = -1000;
    mouse2DRef.current.y = -1000;
    handleMouseUp2D();
  };

  // Supernova Kinetic 2D Blast
  const triggerSupernova2D = () => {
    const canvas = canvasRef2D.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    particles2DRef.current.forEach((p) => {
      const dx = p.x - cx;
      const dy = p.y - cy;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      p.vx = (dx / d) * (14 + Math.random() * 8);
      p.vy = (dy / d) * (14 + Math.random() * 8);
    });
  };

  const resetParticles2D = () => {
    const canvas = canvasRef2D.current;
    if (!canvas) return;
    initParticles2D(canvas.width, canvas.height, particleCount2D);
  };


  // ==========================================
  // --- ENGINE WORKER 3D LOGIC ---
  // ==========================================
  useEffect(() => {
    if (engineMode !== "3d") return;

    const canvas = canvasRef3D.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const width = parent?.clientWidth || 350;
    const height = 280;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(getThemeColor(colorTheme3D, true), 12, 50, 1.2);
    pointLight.position.set(3, 4, 3);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    const backlight = new THREE.DirectionalLight(0xff6000, 0.5);
    backlight.position.set(-4, -3, -2);
    scene.add(backlight);

    // Build central mesh wireframe
    let geometry: THREE.BufferGeometry;
    if (geometryType3D === "torusKnot") {
      geometry = new THREE.TorusKnotGeometry(1.6, 0.45, 90, 12);
    } else if (geometryType3D === "icosahedron") {
      geometry = new THREE.IcosahedronGeometry(1.9, 1);
    } else {
      geometry = new THREE.SphereGeometry(1.8, 16, 16);
    }

    const material = new THREE.MeshPhongMaterial({
      color: getThemeColor(colorTheme3D, true),
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      shininess: 80,
    });

    const activeMesh = new THREE.Mesh(geometry, material);
    scene.add(activeMesh);
    activeMeshRef.current = activeMesh;

    // Starfield particle system
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleDensity3D * 3);
    const originalPositions = new Float32Array(particleDensity3D * 3);

    for (let i = 0; i < particleDensity3D * 3; i += 3) {
      const radius = 2.6 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;

      originalPositions[i] = x;
      originalPositions[i + 1] = y;
      originalPositions[i + 2] = z;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleCanvas = document.createElement("canvas");
    particleCanvas.width = 16;
    particleCanvas.height = 16;
    const pCtx = particleCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 1, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, getThemeColor(colorTheme3D) as string);
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      pCtx.fillStyle = grad;
      pCtx.beginPath();
      pCtx.arc(8, 8, 8, 0, Math.PI * 2);
      pCtx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    let lastAnimFrameId: number;
    let frameTimes: number[] = [];
    let prevTickTime = performance.now();

    const tick3D = (now: number) => {
      if (!isVisibleRef.current) {
        lastAnimFrameId = requestAnimationFrame(tick3D);
        return;
      }
      const deltaFrame = now - prevTickTime;
      prevTickTime = now;
      frameTimes.push(deltaFrame);
      if (frameTimes.length > 30) frameTimes.shift();
      const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      setRealtimeFPS(Math.round(1000 / avg));

      if (Math.random() < 0.05) {
        setLatencyValue(parseFloat((0.11 + Math.random() * 0.07).toFixed(2)));
      }

      if (activeMesh) {
        // Continuous auto rotating spins
        const speed = 0.0042 * currentSpeed3D;
        rotateData3DRef.current.targetRotationX += speed;
        rotateData3DRef.current.targetRotationY += speed * 1.4;

        activeMesh.rotation.x += (rotateData3DRef.current.targetRotationX - activeMesh.rotation.x) * 0.12;
        activeMesh.rotation.y += (rotateData3DRef.current.targetRotationY - activeMesh.rotation.y) * 0.12;
      }

      if (particleSystem) {
        particleSystem.rotation.y += 0.001 * currentSpeed3D;
        particleSystem.rotation.x += 0.0005 * currentSpeed3D;

        // Interactive mouse magnetic reaction on 3D particles
        const posAttr = particleGeo.getAttribute("position") as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        const mouse3D = new THREE.Vector3(
          mouseNDC3DRef.current.x * 2.7,
          mouseNDC3DRef.current.y * 2.7,
          0
        );

        for (let i = 0; i < particleDensity3D * 3; i += 3) {
          const px = posArray[i];
          const py = posArray[i + 1];
          const pz = posArray[i + 2];

          const ox = originalPositions[i];
          const oy = originalPositions[i + 1];
          const oz = originalPositions[i + 2];

          const offsetOffset = Math.sin(now * 0.0012 + i) * 0.015;

          const dist = Math.sqrt((px - mouse3D.x) ** 2 + (py - mouse3D.y) ** 2 + pz ** 2);
          if (dist < 2.5) {
            const power = (2.5 - dist) * 0.025;
            posArray[i] += (mouse3D.x - px) * power;
            posArray[i + 1] += (mouse3D.y - py) * power;
          } else {
            posArray[i] += (ox + offsetOffset - px) * 0.06;
            posArray[i + 1] += (oy + offsetOffset - py) * 0.06;
          }
        }
        posAttr.needsUpdate = true;
      }

      if (pointLight) {
        const time = now * 0.0009;
        pointLight.position.x = Math.sin(time) * 3.5;
        pointLight.position.y = Math.cos(time) * 3.5;
      }

      renderer.render(scene, camera);
      lastAnimFrameId = requestAnimationFrame(tick3D);
    };

    lastAnimFrameId = requestAnimationFrame(tick3D);

    const handleResize = () => {
      const w = parent?.clientWidth || width;
      const h = 280;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const observer = new ResizeObserver(() => handleResize());
    if (parent) observer.observe(parent);

    return () => {
      cancelAnimationFrame(lastAnimFrameId);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, [engineMode, geometryType3D, colorTheme3D, particleDensity3D, currentSpeed3D]);

  // 3D Canvas mouse spin triggers
  const handleMouseDown3D = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const data = rotateData3DRef.current;
    data.isDragging = true;
    data.prevMouseX = e.clientX;
    data.prevMouseY = e.clientY;
  };

  const handleMouseMove3D = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef3D.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseNDC3DRef.current.x = (x / rect.width) * 2 - 1;
    mouseNDC3DRef.current.y = -(y / rect.height) * 2 + 1;

    const data = rotateData3DRef.current;
    if (data.isDragging) {
      const dx = e.clientX - data.prevMouseX;
      const dy = e.clientY - data.prevMouseY;

      data.targetRotationY += dx * 0.01;
      data.targetRotationX += dy * 0.01;

      data.prevMouseX = e.clientX;
      data.prevMouseY = e.clientY;
    }
  };

  const handleMouseUpOrLeave3D = () => {
    rotateData3DRef.current.isDragging = false;
    mouseNDC3DRef.current.x = 0;
    mouseNDC3DRef.current.y = 0;
  };

  const handleTouchStart3D = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const data = rotateData3DRef.current;
    data.isDragging = true;
    data.prevMouseX = touch.clientX;
    data.prevMouseY = touch.clientY;
  };

  const handleTouchMove3D = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef3D.current;
    if (!canvas || e.touches.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    mouseNDC3DRef.current.x = (x / rect.width) * 2 - 1;
    mouseNDC3DRef.current.y = -(y / rect.height) * 2 + 1;

    const data = rotateData3DRef.current;
    if (data.isDragging) {
      const dx = touch.clientX - data.prevMouseX;
      const dy = touch.clientY - data.prevMouseY;

      data.targetRotationY += dx * 0.015;
      data.targetRotationX += dy * 0.015;

      data.prevMouseX = touch.clientX;
      data.prevMouseY = touch.clientY;
    }
  };

  const handleTouchEnd3D = () => {
    handleMouseUpOrLeave3D();
  };

  const trigger3DWarp = () => {
    const warpObj = { val: currentSpeed3D };
    gsap.timeline()
      .to(warpObj, {
        val: 12,
        duration: 0.35,
        ease: "power2.out",
        onUpdate: () => setCurrentSpeed3D(warpObj.val),
      })
      .to(warpObj, {
        val: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.45)",
        onUpdate: () => setCurrentSpeed3D(warpObj.val),
      });
  };

  const resetAlignment3D = () => {
    rotateData3DRef.current.targetRotationX = 0;
    rotateData3DRef.current.targetRotationY = 0;
    setCurrentSpeed3D(1);
  };

  return (
    <div 
      className="p-6 rounded-3xl glass-panel border border-emerald-500/15 bg-white/70 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-emerald-500/5 hover:border-emerald-500/25 transition-all duration-300 select-none mx-auto w-full"
      ref={containerRef}
      id="unified-scientific-sandbox-card"
    >
      {/* Background Soft Lighting Radial Glow Overlay */}
      <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-emerald-500/5 via-teal-500/2 to-transparent pointer-events-none -z-10" />

      {/* TOP COMPILING DIAGNOSTIC AND SWITCH TAB ROW */}
      <div className="flex flex-col gap-3 border-b border-slate-200/60 pb-4 mb-4">
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-700 tracking-wider">KINETIC WORKBENCH CORE</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-emerald-500 font-semibold animate-pulse">{latencyValue}ms_SYNC</span>
            <span className="text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded text-[9px] bg-white">{realtimeFPS} FPS</span>
          </div>
        </div>

        {/* SELECT MASTER SIMULATOR ENGINE MODE BUTTONS */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 justify-between items-center">
          <button
            onClick={() => {
              playSelectTick();
              setEngineMode("2d");
              setRealtimeFPS(60);
            }}
            onMouseEnter={playMenuHover}
            className={`flex-1 py-2 px-3 text-[10.5px] font-mono font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              engineMode === "2d" 
                ? "bg-slate-900 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            KINETIC 2D GRAVITY ENGINE
          </button>
          <button
            onClick={() => {
              playSelectTick();
              setEngineMode("3d");
              setRealtimeFPS(60);
            }}
            onMouseEnter={playMenuHover}
            className={`flex-1 py-2 px-3 text-[10.5px] font-mono font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              engineMode === "3d" 
                ? "bg-slate-900 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            SPATIAL 3D ORBIT ENGINE
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE CONSOLE SCREEN VIEWPORTS */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden mb-4 shadow-2xl h-[280px]">
        {engineMode === "2d" ? (
          <div key="viewport-2d">
            <canvas
              key="canvas-2d"
              ref={canvasRef2D}
              onMouseMove={handleMouseMove2D}
              onMouseDown={handleMouseDown2D}
              onMouseUp={handleMouseUp2D}
              onMouseLeave={clearMouse2D}
              onTouchStart={handleTouchStart2D}
              onTouchMove={handleTouchMove2D}
              onTouchEnd={handleTouchEnd2D}
              onTouchCancel={clearMouse2D}
              className={`block w-full h-[280px] bg-slate-950/20 cursor-crosshair touch-none`}
              id="sandbox-2d-physics-canvas"
            />
            {/* Top Info HUD pill */}
            <div className="absolute left-3 top-3 py-1.5 px-2.5 rounded-lg bg-slate-900/90 border border-slate-700 pointer-events-none flex items-center gap-2 shadow-md font-mono text-[9px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>ACTIVE ENERGY CHANNELS: {particles2DRef.current.length}</span>
            </div>
            {/* Bottom floating control instructions label */}
            <div className="absolute right-3 bottom-3 py-1 px-2 rounded bg-slate-900/95 text-[8px] font-mono text-slate-400 pointer-events-none tracking-wider border border-slate-800">
              CLICK OR TOUCH STAGE TO SPAWN BALLS // DRAG TO FLING
            </div>
          </div>
        ) : (
          <div key="viewport-3d">
            <canvas
              key="canvas-3d"
              ref={canvasRef3D}
              onMouseDown={handleMouseDown3D}
              onMouseMove={handleMouseMove3D}
              onMouseUp={handleMouseUpOrLeave3D}
              onMouseLeave={handleMouseUpOrLeave3D}
              onTouchStart={handleTouchStart3D}
              onTouchMove={handleTouchMove3D}
              onTouchEnd={handleTouchEnd3D}
              onTouchCancel={handleTouchEnd3D}
              className={`block w-full h-[280px] bg-slate-950 transition-all touch-none ${
                rotateData3DRef.current.isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              id="webgl-threejs-integrated-canvas"
            />
            {/* Top Tech dynamic specs */}
            <div className="absolute left-3 top-3 py-1.5 px-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 pointer-events-none flex items-center gap-2 shadow-md font-mono text-[9px] text-slate-300 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>CYBER_MESH: {geometryType3D.toUpperCase()}</span>
            </div>
            <div className="absolute right-3 bottom-3 py-1 px-2 rounded bg-slate-900/95 text-[8px] font-mono text-slate-400 pointer-events-none tracking-wider border border-slate-800">
              DRAG CANVAS TO ROTATE WIREFRAME
            </div>
          </div>
        )}
      </div>

      {/* RENDER CONTROL SYSTEM FOR MODE CONSOLES */}
      <AnimatePresence mode="wait">
        {engineMode === "2d" ? (
          <motion.div
            key="controls-2d"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            {/* Settings system for gravity and connections triggers */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
              <div className="flex gap-2.5 items-center">
                <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1 font-semibold uppercase">
                  <Sliders className="w-3 h-3 text-slate-500" /> GRAVITY VECTOR:
                </span>
                <div className="flex border border-slate-200 rounded-lg overflow-hidden shrink-0 bg-white shadow-sm p-0.5">
                  <button
                    onClick={() => {
                      playSelectTick();
                      setGravityType2D("none");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`text-[9.5px] font-mono font-medium px-2 py-1 rounded transition-all cursor-pointer ${
                      gravityType2D === "none" ? "bg-slate-950 text-white" : "hover:bg-slate-100 text-slate-600"
                    }`}
                    title="Zero gravity floating space particles"
                  >
                    OFF
                  </button>
                  <button
                    onClick={() => {
                      playSelectTick();
                      setGravityType2D("down");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`text-[9.5px] font-mono font-medium px-2 py-1 rounded transition-all cursor-pointer ${
                      gravityType2D === "down" ? "bg-slate-950 text-white" : "hover:bg-slate-100 text-slate-600"
                    }`}
                    title="Downward heavy gravity vectors"
                  >
                    DOWN
                  </button>
                  <button
                    onClick={() => {
                      playSelectTick();
                      setGravityType2D("center");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`text-[9.5px] font-mono font-medium px-2 py-1 rounded transition-all cursor-pointer ${
                      gravityType2D === "center" ? "bg-slate-950 text-white" : "hover:bg-slate-100 text-slate-600"
                    }`}
                    title="Central magnetic core gravity focal points"
                  >
                    CORE
                  </button>
                </div>
              </div>

              {/* Toggles check items */}
              <div className="flex items-center gap-4 shrink-0">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={magneticPower2D}
                    onChange={(e) => {
                      playSelectTick();
                      setMagneticPower2D(e.target.checked);
                    }}
                    className="rounded border-slate-350 text-emerald-600 focus:ring-emerald-500/20 w-3 h-3 cursor-pointer"
                  />
                  <span className="text-[9.5px] font-mono text-slate-500 font-bold uppercase hover:text-slate-800">TUG</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeLasers2D}
                    onChange={(e) => {
                      playSelectTick();
                      setActiveLasers2D(e.target.checked);
                    }}
                    className="rounded border-slate-350 text-emerald-600 focus:ring-emerald-500/20 w-3 h-3 cursor-pointer"
                  />
                  <span className="text-[9.5px] font-mono text-slate-500 font-bold uppercase hover:text-slate-800">LASERS</span>
                </label>
              </div>
            </div>

            {/* Explode action and restart triggers */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  playSciFiWarpSweep();
                  triggerSupernova2D();
                }}
                onMouseEnter={playMenuHover}
                className="flex-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 text-white font-mono uppercase tracking-wider text-[10.5px] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_18px_rgba(16,185,129,0.25)] duration-300 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-100" />
                TRIGGER SUPERNOVA BURST //
              </button>

              <button
                onClick={() => {
                  playSelectTick();
                  resetParticles2D();
                }}
                onMouseEnter={playHoverTick}
                className="px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-950 rounded-xl transition-all flex items-center justify-center cursor-pointer active:scale-95 animate-none"
                title="Reset engine nodes"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="controls-3d"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
              
              {/* Controls layout selectors */}
              <div className="flex flex-col gap-1.5 animate-none">
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 font-bold uppercase">
                  <Box className="w-3.5 h-3.5 text-slate-400" /> Mesh Geometry:
                </span>
                <div className="flex border border-slate-200 rounded-lg overflow-hidden shrink-0 bg-white p-0.5">
                  <button
                    onClick={() => {
                      playSelectTick();
                      setGeometryType3D("torusKnot");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`text-[9.5px] font-mono font-semibold py-1 px-1.5 flex-1 rounded transition-all cursor-pointer ${
                      geometryType3D === "torusKnot" ? "bg-slate-900 text-white" : "hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    KNOT
                  </button>
                  <button
                    onClick={() => {
                      playSelectTick();
                      setGeometryType3D("icosahedron");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`text-[9.5px] font-mono font-semibold py-1 px-1.5 flex-1 rounded transition-all cursor-pointer ${
                      geometryType3D === "icosahedron" ? "bg-slate-900 text-white" : "hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    CRYSTAL
                  </button>
                  <button
                    onClick={() => {
                      playSelectTick();
                      setGeometryType3D("sphere");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`text-[9.5px] font-mono font-semibold py-1 px-1.5 flex-1 rounded transition-all cursor-pointer ${
                      geometryType3D === "sphere" ? "bg-slate-900 text-white" : "hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    SPHERE
                  </button>
                </div>
              </div>

              {/* Color Accents selection theme */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 font-bold uppercase">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" /> Color Accent:
                </span>
                <div className="flex border border-slate-200 rounded-lg overflow-hidden shrink-0 bg-white p-0.5">
                  <button
                    onClick={() => {
                      playSelectTick();
                      setColorTheme3D("emerald");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`text-[9.5px] font-mono font-medium py-1 px-1.5 flex-1 rounded transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      colorTheme3D === "emerald" ? "bg-emerald-600 text-white" : "hover:bg-slate-100 text-emerald-600"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 border border-white" />
                    Emerald
                  </button>
                  <button
                    onClick={() => {
                      playSelectTick();
                      setColorTheme3D("cyan");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`text-[9.5px] font-mono font-medium py-1 px-1.5 flex-1 rounded transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      colorTheme3D === "cyan" ? "bg-cyan-600 text-white" : "hover:bg-slate-100 text-cyan-500"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 border border-white" />
                    Cyan
                  </button>
                  <button
                    onClick={() => {
                      playSelectTick();
                      setColorTheme3D("amber");
                    }}
                    onMouseEnter={playHoverTick}
                    className={`text-[9.5px] font-mono font-medium py-1 px-1.5 flex-1 rounded transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      colorTheme3D === "amber" ? "bg-amber-600 text-white" : "hover:bg-slate-100 text-amber-500"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 border border-white" />
                    Amber
                  </button>
                </div>
              </div>
            </div>

            {/* GSAP Accelerometer trigger warp buttons */}
            <div className="flex gap-3 animate-none">
              <button
                onClick={() => {
                  playSciFiWarpSweep();
                  trigger3DWarp();
                }}
                onMouseEnter={playMenuHover}
                className="flex-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 text-white font-mono uppercase tracking-wider text-[10.5px] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_18px_rgba(16,185,129,0.3)] duration-300 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-100 animate-pulse" />
                GSAP HYPER-SPEED WARP //
              </button>

              <button
                onClick={() => {
                  playSelectTick();
                  resetAlignment3D();
                }}
                onMouseEnter={playHoverTick}
                className="px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-950 rounded-xl transition-all flex items-center justify-center cursor-pointer active:scale-95"
                title="Reset 3D alignment orientation"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
