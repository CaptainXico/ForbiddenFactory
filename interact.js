AFRAME.registerComponent('hover-effect', {
  init() {
    const box = this.el.querySelector('.interactive');
    if (!box) return;

    const highlight = () => {
      box.setAttribute('color', '#00ffcc');
    };

    const unhighlight = () => {
      box.setAttribute('color', '#222');
    };

    // Works for BOTH mouse cursor and VR controllers
    box.addEventListener('raycaster-intersected', highlight);
    box.addEventListener('raycaster-intersected-cleared', unhighlight);
  }
});

AFRAME.registerComponent('desktop-cursor-only', {
  init() {
    if (!AFRAME.utils.device.isMobile() && !AFRAME.utils.device.checkHeadsetConnected()) {
      this.el.setAttribute('visible', true);
    }
  }
});
