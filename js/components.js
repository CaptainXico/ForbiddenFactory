AFRAME.registerComponent("product", {
  schema: { type: "string" },

  init() {
    this.el.addEventListener("click", () => {
      const product = products[this.data];
      if (product) {
        showProduct(product);
      }
    });
  }
});
