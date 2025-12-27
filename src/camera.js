/**
 * camera.js
 * Camera system for panning and viewport control
 */

export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.easing = 0.1;
  }

  /**
   * Pan camera by delta
   */
  pan(dx, dy) {
    this.targetX += dx;
    this.targetY += dy;
  }

  /**
   * Set camera position directly
   */
  setPosition(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  /**
   * Update camera with smooth easing
   */
  update() {
    this.x += (this.targetX - this.x) * this.easing;
    this.y += (this.targetY - this.y) * this.easing;
  }

  /**
   * Apply camera transform to canvas context
   */
  applyTransform(ctx, viewportWidth, viewportHeight) {
    ctx.translate(
      viewportWidth / 2 - this.x,
      viewportHeight / 2 - this.y
    );
  }

  /**
   * Get current camera position
   */
  getPosition() {
    return { x: this.x, y: this.y };
  }
}
