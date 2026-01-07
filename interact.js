AFRAME.registerComponent('hover-effect', {
  init() {
    const box = this.el.querySelector('a-box');

    this.el.addEventListener('mouseenter', () => {
      box.setAttribute('color', '#00ffcc');
    });

    this.el.addEventListener('mouseleave', () => {
      box.setAttribute('color', '#222');
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

