AFRAME.registerComponent('ui-panel-animate', {
  schema: {
    hiddenPosition: { type: 'vec3' },
    visiblePosition: { type: 'vec3' },
    duration: { type: 'number', default: 400 }
  },

  init() {
    this.el.object3D.position.copy(this.data.hiddenPosition);
  },

  show() {
    this.el.setAttribute('animation__in', {
      property: 'position',
      to: this.data.visiblePosition,
      dur: this.data.duration,
      easing: 'easeOutCubic'
    });
  },

  hide() {
    this.el.setAttribute('animation__out', {
      property: 'position',
      to: this.data.hiddenPosition,
      dur: this.data.duration,
      easing: 'easeInCubic'
    });
  }
});
