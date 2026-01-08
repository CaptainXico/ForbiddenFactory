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
  const { x, y } = event.detail;

  // 🔁 USE RIG ROTATION (NOT CAMERA)
  const yaw = cameraRig.object3D.rotation.y;

  const forward = new THREE.Vector3(
    -Math.sin(yaw),
    0,
    -Math.cos(yaw)
  );

  const right = new THREE.Vector3(
    Math.cos(yaw),
    0,
    -Math.sin(yaw)
  );

  forward.multiplyScalar(y * speed * -1);
  right.multiplyScalar(x * speed);

  cameraRig.object3D.position.add(forward);
  cameraRig.object3D.position.add(right);
});

    // Scale movement by thumbstick input
    forward.multiplyScalar(-y * speed); // Forward/backward inverted
    right.multiplyScalar(x * speed);   // Left/right unchanged

    // Update camera-rig position
    const position = cameraRig.object3D.position;
    position.add(forward);
    position.add(right);

    console.log("Camera rig position updated to:", position);
  });
  
// Turn the camera left and right in the right controller
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

  // Jumping
    AFRAME.registerComponent('player-jump', {
  schema: {
    height: { type: 'number', default: 1.2 },
    gravity: { type: 'number', default: -9.8 }
  },

  init() {
    this.rig = document.querySelector('#camera-rig');
    this.velocityY = 0;
    this.isGrounded = true;

    // Desktop: SPACE
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        this.jump();
      }
    });

    // VR buttons
    this.el.addEventListener('abuttondown', () => this.jump()); // Right controller (A)
    this.el.addEventListener('xbuttondown', () => this.jump()); // Left controller (X)
  },

  jump() {
    if (!this.isGrounded || !this.rig) return;

    this.velocityY = Math.sqrt(-2 * this.data.gravity * this.data.height);
    this.isGrounded = false;
  },

  tick(time, delta) {
    if (!this.rig || this.isGrounded) return;

    const dt = delta / 1000;
    this.velocityY += this.data.gravity * dt;

    const pos = this.rig.getAttribute('position');
    pos.y += this.velocityY * dt;

    // Ground collision
    if (pos.y <= 0) {
      pos.y = 0;
      this.velocityY = 0;
      this.isGrounded = true;
    }

    this.rig.setAttribute('position', pos);
  }
});

  
});
