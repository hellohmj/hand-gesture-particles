import GestureStatus from '../GestureStatus';

export default function GestureStatusExample() {
  return (
    <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl w-80 space-y-4">
      <GestureStatus isDetected={true} handCount={2} scale={1.5} />
      <div className="border-t border-white/10 pt-4">
        <GestureStatus isDetected={false} handCount={0} scale={1} />
      </div>
    </div>
  );
}
