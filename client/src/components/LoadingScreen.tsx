import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = '加载中...' }: LoadingScreenProps) {
  return (
    <div 
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      data-testid="loading-screen"
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      
      <div className="mt-8 text-center">
        <Loader2 className="w-6 h-6 text-primary animate-spin mx-auto mb-4" />
        <p className="text-white/80 text-lg font-medium">{message}</p>
        <p className="text-white/40 text-sm mt-2">
          请允许摄像头访问以启用手势控制
        </p>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-white/30 text-xs">
          Hand Gesture Particles
        </p>
      </div>
    </div>
  );
}
