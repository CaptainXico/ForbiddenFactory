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
