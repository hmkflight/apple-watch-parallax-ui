/**
 * renderer.js
 * Canvas rendering system
 */

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;
    this.width = 0;
    this.height = 0;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  /**
   * Handle canvas resize with DPI scaling
   */
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    // Set actual canvas size with DPI scaling
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;

    // Scale context to handle DPI
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  /**
   * Clear canvas
   */
  clear() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Draw honeycomb nodes
   */
  drawNodes(nodes, nodeRadius) {
    nodes.forEach(node => {
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#fff';
      this.ctx.fill();
      this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });
  }

  /**
   * Get viewport dimensions
   */
  getViewport() {
    return {
      width: this.width,
      height: this.height
    };
  }

  /**
   * Get canvas context
   */
  getContext() {
    return this.ctx;
  }
}
