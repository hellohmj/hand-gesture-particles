import { Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export default function FullscreenButton({ isFullscreen, onToggle }: FullscreenButtonProps) {
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={onToggle}
      data-testid="button-fullscreen"
      className={cn(
        "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full",
        "bg-black/40 backdrop-blur-md border border-white/20",
        "text-white/90 transition-all duration-300"
      )}
    >
      {isFullscreen ? (
        <Minimize className="w-6 h-6" />
      ) : (
        <Maximize className="w-6 h-6" />
      )}
    </Button>
  );
}
