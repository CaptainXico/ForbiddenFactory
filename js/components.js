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
    speed: { default: 2 }
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

    let gp = null;
    for (const gamepad of gamepads) {
      if (gamepad && gamepad.axes && gamepad.axes.length >= 2) {
        gp = gamepad;
        break;
      }
    }
    if (!gp) return;

    const x = gp.axes[0] || 0;
    const y = -gp.axes[1] || 0;

    // Deadzone
    if (Math.abs(x) < 0.15 && Math.abs(y) < 0.15) return;

    const deltaSec = delta / 1000;

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

