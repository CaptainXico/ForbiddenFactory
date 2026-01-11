// products.js
const products = {
  piModule01: {
    name: "Raspberry Pi Control Module",
    price: "$49",
    description: "Custom Pi-based control unit with GPIO breakout.",
    model: "#RasberryPi",
    scale: '0.1 0.1 0.1',
    rotation: '0 180 0'
  },
  piModule02: {
    name: "Pi Sensor Hub",
    price: "$69",
    description: "Multi-sensor expansion board.",
    model: "#RasberryPi",
    scale: '0.1 0.1 0.1'
  }
};

AFRAME.registerComponent('product-info-panel', {
  init() {
    const panel = this.el;
    const animator = panel.components['ui-panel-animate'];

    this.el.sceneEl.addEventListener('product-selected', (e) => {
      const product = products[e.detail.productId];
      if (!product) return;

      panel.querySelector('.title')?.setAttribute('value', product.name);
      panel.querySelector('.price')?.setAttribute('value', product.price);
      panel.querySelector('.desc')?.setAttribute('value', product.description);

    });
  }
});


AFRAME.registerComponent('product-showcase', {
  init() {
    this.modelEl = null;

    this.el.sceneEl.addEventListener('product-selected', (e) => {
      const product = products[e.detail.productId];
      if (!product) return;

      // Remove old model
      if (this.modelEl) {
        this.el.removeChild(this.modelEl);
      }

      // Create new model
      const model = document.createElement('a-entity');
      model.setAttribute('gltf-model', product.model);
      model.setAttribute('scale', product.scale);
      model.setAttribute('position', '0 0 0');

      if (product.rotation) {
        model.setAttribute('rotation', product.rotation);
      }

      // OPTIONAL AUTO-ROTATION (PUT IT HERE)
      model.setAttribute('animation', {
        property: 'rotation',
        to: '0 360 0',
        loop: true,
        dur: 12000,
        easing: 'linear'
      });

      // Attach model
      this.el.appendChild(model);
      this.modelEl = model;
    });
  }
});



