import { X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModelSelector from './ModelSelector';
import ColorPicker from './ColorPicker';
import GestureStatus from './GestureStatus';
import { ModelType } from '@/lib/particleModels';
import { cn } from '@/lib/utils';

interface ControlPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedModel: ModelType;
  onSelectModel: (model: ModelType) => void;
  color: string;
  onColorChange: (color: string) => void;
  isHandDetected: boolean;
  handCount: number;
  scale: number;
}

export default function ControlPanel({
  isOpen,
  onToggle,
  selectedModel,
  onSelectModel,
  color,
  onColorChange,
  isHandDetected,
  handCount,
  scale,
}: ControlPanelProps) {
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        onClick={onToggle}
        data-testid="button-toggle-panel"
        className={cn(
          "fixed top-6 right-6 z-50 w-12 h-12 rounded-full",
          "bg-black/40 backdrop-blur-md border border-white/20",
          "text-white/90 transition-all duration-300",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        <Settings className="w-5 h-5" />
      </Button>

      <div
        className={cn(
          "fixed top-6 right-6 z-50 w-80",
          "bg-black/60 backdrop-blur-xl rounded-2xl",
          "border border-white/10 shadow-2xl",
          "transition-all duration-500 ease-out",
          isOpen 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 translate-x-full pointer-events-none"
        )}
        data-testid="control-panel"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">控制面板</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={onToggle}
            data-testid="button-close-panel"
            className="w-8 h-8 rounded-full bg-white/10 text-white/80"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <ModelSelector 
            selectedModel={selectedModel} 
            onSelectModel={onSelectModel} 
          />
          
          <div className="border-t border-white/10 pt-6">
            <ColorPicker 
              color={color} 
              onColorChange={onColorChange} 
            />
          </div>
          
          <div className="border-t border-white/10 pt-6">
            <GestureStatus 
              isDetected={isHandDetected} 
              handCount={handCount}
              scale={scale} 
            />
          </div>
        </div>
      </div>
    </>
  );
}
