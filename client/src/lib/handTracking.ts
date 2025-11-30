import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

export interface HandGestureData {
  isDetected: boolean;
  handCount: number;
  scale: number;
  leftHand?: {
    isOpen: boolean;
    position: { x: number; y: number };
    landmarks: { x: number; y: number; z: number }[];
  };
  rightHand?: {
    isOpen: boolean;
    position: { x: number; y: number };
    landmarks: { x: number; y: number; z: number }[];
  };
}

export function calculateHandOpenness(landmarks: { x: number; y: number; z: number }[]): boolean {
  const wrist = landmarks[0];
  const middleTip = landmarks[12];
  const distance = Math.sqrt(
    Math.pow(middleTip.x - wrist.x, 2) +
    Math.pow(middleTip.y - wrist.y, 2)
  );
  return distance > 0.2;
}

export function calculateScale(leftHand?: HandGestureData['leftHand'], rightHand?: HandGestureData['rightHand']): number {
  if (leftHand && rightHand) {
    const distance = Math.sqrt(
      Math.pow(rightHand.position.x - leftHand.position.x, 2) +
      Math.pow(rightHand.position.y - leftHand.position.y, 2)
    );
    return Math.max(0.3, Math.min(3, distance * 3));
  }
  
  if (leftHand) {
    return leftHand.isOpen ? 1.5 : 0.8;
  }
  if (rightHand) {
    return rightHand.isOpen ? 1.5 : 0.8;
  }
  
  return 1;
}

export function initializeHandTracking(
  videoElement: HTMLVideoElement,
  onResults: (data: HandGestureData) => void
): { hands: Hands; camera: Camera } {
  const hands = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    },
  });

  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.5,
  });

  hands.onResults((results: Results) => {
    const data: HandGestureData = {
      isDetected: results.multiHandLandmarks && results.multiHandLandmarks.length > 0,
      handCount: results.multiHandLandmarks?.length || 0,
      scale: 1,
    };

    if (results.multiHandLandmarks && results.multiHandedness) {
      results.multiHandLandmarks.forEach((landmarks, index) => {
        const handedness = results.multiHandedness[index].label;
        const isOpen = calculateHandOpenness(landmarks);
        const palmCenter = landmarks[9];
        
        const handData = {
          isOpen,
          position: { x: palmCenter.x, y: palmCenter.y },
          landmarks: landmarks.map(l => ({ x: l.x, y: l.y, z: l.z })),
        };

        if (handedness === 'Left') {
          data.rightHand = handData;
        } else {
          data.leftHand = handData;
        }
      });
    }

    data.scale = calculateScale(data.leftHand, data.rightHand);
    onResults(data);
  });

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480,
  });

  return { hands, camera };
}
