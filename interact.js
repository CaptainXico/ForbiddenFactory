const isVR = AFRAME.utils.device.checkHeadsetConnected();

AFRAME.registerComponent('hover-effect', {
  init() {
    const box = this.el.querySelector('.interactive');
    if (!box) return;

    const isVR = AFRAME.utils.device.checkHeadsetConnected();

    const highlight = () => {
      box.setAttribute('color', '#00ffcc');
    };

    const unhighlight = () => {
      box.setAttribute('color', '#222');
    };

    if (isVR) {
      // VR CONTROLLERS ONLY
      box.addEventListener('raycaster-intersected', highlight);
      box.addEventListener('raycaster-intersected-cleared', unhighlight);

    } else {
      // DESKTOP ONLY
      box.addEventListener('mouseenter', highlight);
      box.addEventListener('mouseleave', unhighlight);
    }
  }
});


AFRAME.registerComponent('desktop-cursor-only', {
  init() {
    if (!AFRAME.utils.device.isMobile() && !AFRAME.utils.device.checkHeadsetConnected()) {
      this.el.setAttribute('visible', true);
    }
  }
});

