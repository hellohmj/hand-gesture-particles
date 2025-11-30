import { Camera, CameraOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WebcamIndicatorProps {
  isActive: boolean;
  isLoading: boolean;
}

export default function WebcamIndicator({ isActive, isLoading }: WebcamIndicatorProps) {
  return (
    <div 
      className={cn(
        "fixed top-6 left-6 z-50",
        "flex items-center gap-2 px-4 py-2",
        "bg-black/40 backdrop-blur-md rounded-full",
        "border border-white/10 transition-all duration-300"
      )}
      data-testid="webcam-indicator"
    >
      {isLoading ? (
        <>
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-medium text-amber-400">
            初始化摄像头...
          </span>
        </>
      ) : isActive ? (
        <>
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping opacity-75" />
          </div>
          <Camera className="w-4 h-4 text-white/80" />
          <span className="text-xs font-medium text-white/80">
            摄像头已开启
          </span>
        </>
      ) : (
        <>
          <div className="w-3 h-3 rounded-full bg-white/30" />
          <CameraOff className="w-4 h-4 text-white/50" />
          <span className="text-xs font-medium text-white/50">
            摄像头未开启
          </span>
        </>
      )}
    </div>
  );
}
