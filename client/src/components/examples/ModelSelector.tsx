import { useState } from 'react';
import ModelSelector from '../ModelSelector';
import { ModelType } from '@/lib/particleModels';

export default function ModelSelectorExample() {
  const [selected, setSelected] = useState<ModelType>('heart');
  
  return (
    <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl w-80">
      <ModelSelector 
        selectedModel={selected} 
        onSelectModel={setSelected} 
      />
    </div>
  );
}
