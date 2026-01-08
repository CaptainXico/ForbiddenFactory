// movement.js

// Set up movement variables
const speed = 0.05;

window.addEventListener('load', () => {
  const cameraRig = document.getElementById('camera-rig');
  const camera = document.getElementById('camera');
  const leftController = document.getElementById('left-controller');

  if (!cameraRig || !camera || !leftController) {
    console.error("Camera rig, camera, or left controller not found!");
    return;
  }

  console.log("Movement script initialized successfully.");

  // Listen for thumbstick movement
  leftController.addEventListener('thumbstickmoved', (event) => {
    const { x, y } = event.detail; // x = left/right, y = forward/backward

    // Get the camera's rotation
    const cameraRotation = camera.object3D.rotation;

    // Calculate movement direction relative to the camera's orientation
    const forward = new THREE.Vector3(
      -Math.sin(cameraRotation.y), // Keep forward/backward inverted
      0,
      -Math.cos(cameraRotation.y)
    );
    const right = new THREE.Vector3(
      -forward.z, // Side movement remains the same
      0,
      forward.x
    );

    // Scale movement by thumbstick input
    forward.multiplyScalar(-y * speed); // Forward/backward inverted
    right.multiplyScalar(x * speed);   // Left/right unchanged

    // Update camera-rig position
    const position = cameraRig.object3D.position;
    position.add(forward);
    position.add(right);

    console.log("Camera rig position updated to:", position);
  });

AFRAME.registerComponent('vr-smooth-turn', {
  schema: {
    speed: { type: 'number', default: 60 } // degrees per second
  },

  init() {
    this.rig = document.querySelector('#camera-rig');
    this.axisX = 0;
  },

  tick(time, delta) {
    if (!this.rig) return;

    // delta in seconds
    const dt = delta / 1000;

    if (Math.abs(this.axisX) > 0.2) {
      const rotation = this.rig.getAttribute('rotation');
      rotation.y -= this.axisX * this.data.speed * dt;
      this.rig.setAttribute('rotation', rotation);
    }
  },

  events: {
    thumbstickmoved(evt) {
      // Horizontal axis only
      this.axisX = evt.detail.x;
    }
  }
});

  
});
