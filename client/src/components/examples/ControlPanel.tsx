import { useState } from 'react';
import ControlPanel from '../ControlPanel';
import { ModelType } from '@/lib/particleModels';

export default function ControlPanelExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [model, setModel] = useState<ModelType>('heart');
  const [color, setColor] = useState('#ff6b9d');
  
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-[600px] relative">
      <ControlPanel
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        selectedModel={model}
        onSelectModel={setModel}
        color={color}
        onColorChange={setColor}
        isHandDetected={true}
        handCount={2}
        scale={1.35}
      />
    </div>
  );
}
