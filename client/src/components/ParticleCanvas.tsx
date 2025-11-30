import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ModelType, getModelPoints } from '@/lib/particleModels';

interface ParticleCanvasProps {
  model: ModelType;
  color: string;
  scale: number;
  isActive: boolean;
}

const PARTICLE_COUNT = 2000;

export default function ParticleCanvas({ model, color, scale, isActive }: ParticleCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const targetPositionsRef = useRef<Float32Array | null>(null);
  const animationFrameRef = useRef<number>(0);
  const currentScaleRef = useRef(1);
  const [initialized, setInitialized] = useState(false);

  const updateTargetPositions = useCallback((modelType: ModelType) => {
    const points = getModelPoints(modelType, PARTICLE_COUNT);
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    
    points.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });
    
    targetPositionsRef.current = positions;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0.5;
      colors[i * 3 + 2] = 0.8;
      
      sizes[i] = Math.random() * 3 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    updateTargetPositions(model);
    setInitialized(true);

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [updateTargetPositions]);

  useEffect(() => {
    if (initialized) {
      updateTargetPositions(model);
    }
  }, [model, initialized, updateTargetPositions]);

  useEffect(() => {
    if (!particlesRef.current) return;
    
    const colorObj = new THREE.Color(color);
    const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const variation = 0.8 + Math.random() * 0.4;
      colors[i * 3] = colorObj.r * variation;
      colors[i * 3 + 1] = colorObj.g * variation;
      colors[i * 3 + 2] = colorObj.b * variation;
    }
    
    particlesRef.current.geometry.attributes.color.needsUpdate = true;
  }, [color, initialized]);

  useEffect(() => {
    if (!initialized) return;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (!particlesRef.current || !targetPositionsRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const targets = targetPositionsRef.current;
      
      currentScaleRef.current += (scale - currentScaleRef.current) * 0.05;
      const currentScale = currentScaleRef.current;
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const targetX = targets[i3] * currentScale;
        const targetY = targets[i3 + 1] * currentScale;
        const targetZ = targets[i3 + 2] * currentScale;
        
        positions[i3] += (targetX - positions[i3]) * 0.02;
        positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.02;
        positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.02;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += 0.002;
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [initialized, scale]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0"
      data-testid="particle-canvas"
    />
  );
}
