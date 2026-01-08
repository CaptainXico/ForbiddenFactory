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

    box.addEventListener('raycaster-intersected', () => {
      console.log('HOVER HIT', box);
    });


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

// Model Load 
AFRAME.registerComponent('product-button', {
  schema: {
    model: { type: 'string' }
  },

  init() {
    this.el.addEventListener('click', () => {
      const showcase = document.querySelector('#showcase');
      if (!showcase) return;

      // Clear previous model
      showcase.innerHTML = '';

      const model = document.createElement('a-entity');
      model.setAttribute('gltf-model', this.data.model);
      model.setAttribute('position', '0 0 0');
      model.setAttribute('scale', '1 1 1');
      model.setAttribute('rotation', '0 180 0');

      showcase.appendChild(model);
    });
  }
});

