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
    product: { type: 'string' }
  },

  init() {
    this.el.addEventListener('click', () => {
      const showcase = document.querySelector('#showcase');
      if (!showcase) return;

      const product = products[this.data.product];
      if (!product) return;

      const current = showcase.querySelector('[gltf-model]');

      // TOGGLE
      if (
        current &&
        current.dataset.product === this.data.product
      ) {
        showcase.innerHTML = '';
        return;
      }

      // Clear previous model
      showcase.innerHTML = '';

      const model = document.createElement('a-entity');
      model.setAttribute('gltf-model', product.model);
      model.setAttribute('scale', product.scale);
      model.setAttribute('rotation', product.rotation || '0 0 0');
      model.setAttribute('position', '0 0 0');

      // 🔒 Track which product is shown
      model.dataset.product = this.data.product;

      showcase.appendChild(model);
    });
  }
});

AFRAME.registerComponent('input-mode-manager', {
  init() {
    const scene = this.el.sceneEl;
    const cursor = document.querySelector('#desktop-cursor');

    if (!cursor) return;

    // Desktop mode (default)
    cursor.setAttribute('raycaster', 'objects: .interactive');

    scene.addEventListener('enter-vr', () => {
      // Disable desktop cursor raycasting in VR
      cursor.removeAttribute('raycaster');
    });

    scene.addEventListener('exit-vr', () => {
      // Re-enable desktop cursor raycasting
      cursor.setAttribute('raycaster', 'objects: .interactive');
    });
  }
});

