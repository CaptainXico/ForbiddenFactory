// movement.js

const speed = 0.05;

window.addEventListener('load', () => {
  const cameraRig = document.getElementById('camera-rig');
  const camera = document.getElementById('camera');
  const leftController = document.getElementById('left-controller');

  if (!cameraRig || !leftController) {
    console.error("Camera rig or left controller not found!");
    return;
  }

  // LEFT CONTROLLER MOVEMENT (uses rig rotation)
  leftController.addEventListener('thumbstickmoved', (event) => {
  const deadzone = 0.15;
  let { x, y } = event.detail;

  // Apply deadzone
  if (Math.abs(x) < deadzone) x = 0;
  if (Math.abs(y) < deadzone) y = 0;

  // No movement
  if (x === 0 && y === 0) return;

  // Normalize input vector
  const length = Math.sqrt(x * x + y * y);
  x /= length;
  y /= length;

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

  forward.multiplyScalar(-y * speed);
  right.multiplyScalar(x * speed);

  cameraRig.object3D.position.add(forward);
  cameraRig.object3D.position.add(right);
});

});

  
// Turn the camera left and right in the right controller
AFRAME.registerComponent('vr-smooth-turn', {
  schema: {
    speed: { type: 'number', default: 90 } // degrees per second
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

