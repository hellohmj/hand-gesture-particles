import { Heart, Flower2, Circle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModelType } from '@/lib/particleModels';
import { cn } from '@/lib/utils';

interface ModelSelectorProps {
  selectedModel: ModelType;
  onSelectModel: (model: ModelType) => void;
}

const models: { type: ModelType; label: string; icon: typeof Heart }[] = [
  { type: 'heart', label: '爱心', icon: Heart },
  { type: 'flower', label: '花朵', icon: Flower2 },
  { type: 'saturn', label: '土星', icon: Circle },
  { type: 'buddha', label: '佛像', icon: Sparkles },
  { type: 'fireworks', label: '烟花', icon: Sparkles },
];

export default function ModelSelector({ selectedModel, onSelectModel }: ModelSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white/90">选择模型</label>
      <div className="grid grid-cols-2 gap-3">
        {models.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            variant="ghost"
            onClick={() => onSelectModel(type)}
            data-testid={`button-model-${type}`}
            className={cn(
              "flex flex-col items-center justify-center gap-2 h-20 rounded-xl transition-all duration-200",
              "bg-white/10 border border-white/20 text-white/90",
              selectedModel === type && "bg-white/25 border-white/40 ring-2 ring-white/30"
            )}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
