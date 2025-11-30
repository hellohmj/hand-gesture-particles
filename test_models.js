
import { getModelPoints } from './client/src/lib/particleModels';
import * as THREE from 'three';

// Mock THREE.Vector3 since we are running in node
global.THREE = {
    Vector3: class {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }
};

const models = ['heart', 'flower', 'saturn', 'buddha', 'fireworks'];
const count = 2000;

models.forEach(model => {
    try {
        const points = getModelPoints(model, count);
        console.log(`Model: ${model}, Points: ${points.length}`);
        if (points.length > 0) {
            console.log(`  First point: ${JSON.stringify(points[0])}`);
        }
    } catch (e) {
        console.error(`Error generating points for ${model}:`, e);
    }
});
