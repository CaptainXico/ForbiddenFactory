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

    // Ray-based hover (PC + VR)
    box.addEventListener('raycaster-intersected', highlight);
    box.addEventListener('raycaster-intersected-cleared', unhighlight);
  }
});

    // Switch to VR when entering VR
    sceneEl.addEventListener('enter-vr', () => {
      enableVRHover();
    });
  }
});


AFRAME.registerComponent('desktop-cursor-only', {
  init() {
    if (!AFRAME.utils.device.isMobile() && !AFRAME.utils.device.checkHeadsetConnected()) {
      this.el.setAttribute('visible', true);
    }
  }
});

