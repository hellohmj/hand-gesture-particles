import { Hand } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GestureStatusProps {
  isDetected: boolean;
  handCount: number;
  scale: number;
}

export default function GestureStatus({ isDetected, handCount, scale }: GestureStatusProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white/90">手势状态</label>
      
      <div className={cn(
        "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
        isDetected 
          ? "bg-emerald-500/20 border border-emerald-500/40" 
          : "bg-white/5 border border-white/10"
      )}>
        <div className={cn(
          "w-3 h-3 rounded-full transition-all duration-300",
          isDetected ? "bg-emerald-400 animate-pulse-slow" : "bg-white/30"
        )} />
        
        <Hand className={cn(
          "w-5 h-5 transition-all duration-300",
          isDetected ? "text-emerald-400" : "text-white/50"
        )} />
        
        <div className="flex-1">
          <p className={cn(
            "text-sm font-medium transition-colors duration-300",
            isDetected ? "text-emerald-400" : "text-white/50"
          )}>
            {isDetected 
              ? `检测到 ${handCount} 只手` 
              : "未检测到手势"
            }
          </p>
          {isDetected && (
            <p className="text-xs text-white/50 mt-0.5">
              缩放: {scale.toFixed(2)}x
            </p>
          )}
        </div>
      </div>
      
      <p className="text-xs text-white/40 leading-relaxed">
        张开/握拳控制缩放，双手距离控制粒子扩散
      </p>
    </div>
  );
}
