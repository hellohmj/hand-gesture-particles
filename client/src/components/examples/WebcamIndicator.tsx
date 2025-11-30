import WebcamIndicator from '../WebcamIndicator';

export default function WebcamIndicatorExample() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-[200px] relative p-8 space-y-16">
      <div className="relative h-16">
        <WebcamIndicator isActive={true} isLoading={false} />
      </div>
      <div className="relative h-16" style={{ top: 0, left: 0 }}>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 w-fit">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-medium text-amber-400">初始化摄像头...</span>
        </div>
      </div>
      <div className="relative h-16">
        <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 w-fit">
          <div className="w-3 h-3 rounded-full bg-white/30" />
          <span className="text-xs font-medium text-white/50">摄像头未开启</span>
        </div>
      </div>
    </div>
  );
}
