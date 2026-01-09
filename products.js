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

this.el.sceneEl.emit('product-selected', {
  productId: this.data.product
});

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

      animator.show();
      document.querySelector('#panel-actions')
        .components['ui-panel-animate'].show();
    });
  }
});


AFRAME.registerComponent('product-showcase', {
  init() {
    this.el.sceneEl.addEventListener('product-selected', (e) => {
      const product = products[e.detail.productId];
      if (!product) return;

      this.el.setAttribute('gltf-model', product.model);
      this.el.setAttribute('scale', product.scale);
      if (product.rotation)
        this.el.setAttribute('rotation', product.rotation);
    });
  }
});


