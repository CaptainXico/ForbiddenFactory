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
   Pico-Specific Safety Check
   ========================= */
document.querySelector("a-scene").addEventListener("enter-vr", () => {
  console.log("Entered VR — Pico input ready");
});

/* =========================
   JOYSTICK MOVEMENT (PICO 4)
   ========================= */
// movement.js — Pico 4 compatible smooth locomotion

AFRAME.registerComponent("pico-move", {
  schema: {
    speed: { default: 2.0 }
  },

  init() {
    this.rig = document.getElementById("camera-rig");
    this.camera = document.getElementById("camera");

    this.direction = new THREE.Vector3();
    this.rotation = new THREE.Euler(0, 0, 0, "YXZ");

    console.log("Pico movement component initialized");
  },

  tick(time, delta) {
    if (!this.el.sceneEl.is("vr-mode")) return;

    const gamepads = navigator.getGamepads();
    if (!gamepads) return;

    let gp = null;
    for (const pad of gamepads) {
      if (pad && pad.axes && pad.axes.length >= 2) {
        gp = pad;
        break;
      }
    }
    if (!gp) return;

    // Pico joystick axes
    const x = gp.axes[0] || 0;
    const y = -gp.axes[1] || 0;

    console.log("tick running", x, y);

    // Deadzone
    if (Math.abs(x) < 0.15 && Math.abs(y) < 0.15) return;

    const deltaSec = delta / 1000;

    // Head-relative movement
    this.rotation.setFromQuaternion(this.camera.object3D.quaternion);
    this.direction.set(x, 0, y).normalize();
    this.direction.applyEuler(this.rotation);

    this.rig.object3D.position.addScaledVector(
      this.direction,
      this.data.speed * deltaSec
    );
  }
});
