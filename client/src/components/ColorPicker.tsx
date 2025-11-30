import { useCallback } from 'react';

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
}

const presetColors = [
  '#ff6b9d',
  '#ff9f43',
  '#feca57',
  '#48dbfb',
  '#ff6b6b',
  '#a55eea',
  '#26de81',
  '#fd79a8',
];

export default function ColorPicker({ color, onColorChange }: ColorPickerProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  }, [onColorChange]);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white/90">粒子颜色</label>
      
      <div className="flex gap-2 flex-wrap">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            onClick={() => onColorChange(presetColor)}
            data-testid={`button-preset-color-${presetColor.slice(1)}`}
            className={`w-8 h-8 rounded-full transition-all duration-200 ${
              color === presetColor 
                ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50 scale-110' 
                : 'hover:scale-105'
            }`}
            style={{ backgroundColor: presetColor }}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-lg border border-white/20"
          style={{ backgroundColor: color }}
        />
        <input
          type="color"
          value={color}
          onChange={handleChange}
          data-testid="input-color-picker"
          className="h-10 flex-1 rounded-lg cursor-pointer bg-transparent border border-white/20"
        />
      </div>
    </div>
  );
}
