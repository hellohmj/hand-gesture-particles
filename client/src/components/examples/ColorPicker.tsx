import { useState } from 'react';
import ColorPicker from '../ColorPicker';

export default function ColorPickerExample() {
  const [color, setColor] = useState('#ff6b9d');
  
  return (
    <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl w-80">
      <ColorPicker color={color} onColorChange={setColor} />
    </div>
  );
}
