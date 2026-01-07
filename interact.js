AFRAME.registerComponent('hover-effect', {
  init() {
    const box = this.el.querySelector('a-box');

    const highlight = () => {
      box.setAttribute('color', '#00ffcc');
    };

    const unhighlight = () => {
      box.setAttribute('color', '#222');
    };

    // Desktop (mouse)
    this.el.addEventListener('mouseenter', highlight);
    this.el.addEventListener('mouseleave', unhighlight);

    // VR (controllers)
    this.el.addEventListener('raycaster-intersected', highlight);
    this.el.addEventListener('raycaster-intersected-cleared', unhighlight);
  }
});


AFRAME.registerComponent('desktop-cursor-only', {
  init() {
    if (!AFRAME.utils.device.isMobile() && !AFRAME.utils.device.checkHeadsetConnected()) {
      this.el.setAttribute('visible', true);
    }
  }
});

