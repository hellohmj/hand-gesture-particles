import { useState } from 'react';
import FullscreenButton from '../FullscreenButton';

export default function FullscreenButtonExample() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-[200px] relative">
      <FullscreenButton 
        isFullscreen={isFullscreen} 
        onToggle={() => setIsFullscreen(!isFullscreen)} 
      />
    </div>
  );
}
