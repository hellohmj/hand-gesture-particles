import { useState, useEffect, useRef, useCallback } from 'react';
import ParticleCanvas from '@/components/ParticleCanvas';
import ControlPanel from '@/components/ControlPanel';
import WebcamIndicator from '@/components/WebcamIndicator';
import FullscreenButton from '@/components/FullscreenButton';
import LoadingScreen from '@/components/LoadingScreen';
import { ModelType } from '@/lib/particleModels';
import { HandGestureData, initializeHandTracking } from '@/lib/handTracking';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelType>('heart');
  const [particleColor, setParticleColor] = useState('#ff6b9d');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [gestureData, setGestureData] = useState<HandGestureData>({
    isDetected: false,
    handCount: 0,
    scale: 1,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraRef = useRef<any>(null);

  const handleGestureResults = useCallback((data: HandGestureData) => {
    setGestureData(data);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading || !videoRef.current) return;

    const initCamera = async () => {
      setIsCameraLoading(true);
      
      try {
        const { camera } = initializeHandTracking(
          videoRef.current!,
          handleGestureResults
        );
        cameraRef.current = camera;
        await camera.start();
        setIsCameraActive(true);
      } catch (error) {
        console.error('Failed to initialize camera:', error);
        setIsCameraActive(false);
      } finally {
        setIsCameraLoading(false);
      }
    };

    initCamera();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, [isLoading, handleGestureResults]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
      if (e.key >= '1' && e.key <= '5') {
        const models: ModelType[] = ['heart', 'flower', 'saturn', 'buddha', 'fireworks'];
        setSelectedModel(models[parseInt(e.key) - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  if (isLoading) {
    return <LoadingScreen message="初始化粒子系统..." />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="hidden"
        playsInline
        autoPlay
        muted
      />

      <ParticleCanvas
        model={selectedModel}
        color={particleColor}
        scale={gestureData.scale}
        isActive={isCameraActive}
      />

      <WebcamIndicator 
        isActive={isCameraActive} 
        isLoading={isCameraLoading} 
      />

      <ControlPanel
        isOpen={isPanelOpen}
        onToggle={() => setIsPanelOpen(!isPanelOpen)}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        color={particleColor}
        onColorChange={setParticleColor}
        isHandDetected={gestureData.isDetected}
        handCount={gestureData.handCount}
        scale={gestureData.scale}
      />

      <FullscreenButton
        isFullscreen={isFullscreen}
        onToggle={toggleFullscreen}
      />

      <div className="fixed bottom-6 left-6 z-50 text-white/30 text-xs">
        <p>按 1-5 快速切换模型</p>
        <p>按 ESC 退出全屏</p>
      </div>
    </div>
  );
}
