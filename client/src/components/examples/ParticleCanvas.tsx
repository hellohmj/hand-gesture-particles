import ParticleCanvas from '../ParticleCanvas';

export default function ParticleCanvasExample() {
  return (
    <ParticleCanvas 
      model="heart" 
      color="#ff6b9d" 
      scale={1.2} 
      isActive={true} 
    />
  );
}
