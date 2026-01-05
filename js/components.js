/* =========================
   PRODUCT COMPONENT
   ========================= */
AFRAME.registerComponent("product", {
  schema: { type: "string" },

  init() {
    this.el.addEventListener("click", () => {
      const product = products[this.data];
      if (product) {
        showProduct(product);
      }
    });
  }
});


/* =========================
   JOYSTICK MOVEMENT (PICO 4)
   ========================= */
AFRAME.registerComponent("joystick-move", {
  schema: {
    speed: { default: 2 } // meters per second
  },

  init() {
    this.rig = document.getElementById("rig");
    this.direction = new THREE.Vector3();
    this.rotation = new THREE.Euler(0, 0, 0, "YXZ");
  },

  tick(time, delta) {
    if (!this.el.sceneEl.is("vr-mode")) return;

    const gamepads = navigator.getGamepads();
    if (!gamepads) return;

    const gp = gamepads[0]; // Pico left controller
    if (!gp || !gp.axes) return;

    const x = gp.axes[2] || 0; // left / right
    const y = gp.axes[3] || 0; // forward / back

    // Deadzone
    if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) return;

    const deltaSec = delta / 1000;

    // Head-relative movement
    const camera = this.el.sceneEl.camera;
    this.rotation.setFromQuaternion(camera.quaternion);

    this.direction.set(x, 0, y).normalize();
    this.direction.applyEuler(this.rotation);

    this.rig.object3D.position.addScaledVector(
      this.direction,
      this.data.speed * deltaSec
    );
  }
});
