import * as THREE from 'three';

export type ModelType = 'heart' | 'flower' | 'saturn' | 'buddha' | 'fireworks';

export function generateHeartPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const z = (Math.random() - 0.5) * 4;
    points.push(new THREE.Vector3(x * 0.1, y * 0.1, z * 0.1));
  }
  return points;
}

export function generateFlowerPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const petals = 6;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const r = 1 + 0.5 * Math.cos(petals * t);
    const x = r * Math.cos(t);
    const y = r * Math.sin(t);
    const z = (Math.random() - 0.5) * 0.5;
    points.push(new THREE.Vector3(x * 1.5, y * 1.5, z));
  }
  return points;
}

export function generateSaturnPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const sphereCount = Math.floor(count * 0.4);
  const ringCount = count - sphereCount;
  
  for (let i = 0; i < sphereCount; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 0.6;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    points.push(new THREE.Vector3(x, y, z));
  }
  
  for (let i = 0; i < ringCount; i++) {
    const theta = (i / ringCount) * Math.PI * 2;
    const r = 1.2 + Math.random() * 0.4;
    const x = r * Math.cos(theta);
    const z = r * Math.sin(theta);
    const y = (Math.random() - 0.5) * 0.1;
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

export function generateBuddhaPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const section = Math.random();
    let x, y, z;
    
    if (section < 0.3) {
      const theta = Math.random() * Math.PI * 2;
      const r = 0.3 + Math.random() * 0.1;
      x = r * Math.cos(theta);
      y = 1.2 + Math.random() * 0.3;
      z = r * Math.sin(theta) * 0.8;
    } else if (section < 0.7) {
      const theta = Math.random() * Math.PI * 2;
      const yPos = Math.random() * 1.2;
      const r = 0.4 + 0.3 * Math.sin(yPos * Math.PI);
      x = r * Math.cos(theta);
      y = yPos;
      z = r * Math.sin(theta) * 0.6;
    } else {
      x = (Math.random() - 0.5) * 1.2;
      y = -0.3 - Math.random() * 0.4;
      z = (Math.random() - 0.5) * 0.4;
    }
    
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

export function generateFireworksPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const bursts = 5;
  const perBurst = Math.floor(count / bursts);
  
  for (let b = 0; b < bursts; b++) {
    const cx = (Math.random() - 0.5) * 2;
    const cy = (Math.random() - 0.5) * 2;
    const cz = (Math.random() - 0.5) * 2;
    
    for (let i = 0; i < perBurst; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 0.3 + Math.random() * 0.5;
      const x = cx + r * Math.sin(phi) * Math.cos(theta);
      const y = cy + r * Math.sin(phi) * Math.sin(theta);
      const z = cz + r * Math.cos(phi);
      points.push(new THREE.Vector3(x, y, z));
    }
  }
  return points;
}

export function getModelPoints(model: ModelType, count: number): THREE.Vector3[] {
  switch (model) {
    case 'heart':
      return generateHeartPoints(count);
    case 'flower':
      return generateFlowerPoints(count);
    case 'saturn':
      return generateSaturnPoints(count);
    case 'buddha':
      return generateBuddhaPoints(count);
    case 'fireworks':
      return generateFireworksPoints(count);
    default:
      return generateHeartPoints(count);
  }
}
