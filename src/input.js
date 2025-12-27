/**
 * input.js
 * Mouse, wheel, and touch input handling
 */

export class InputHandler {
  constructor(canvas, camera) {
    this.canvas = canvas;
    this.camera = camera;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.cameraStartX = 0;
    this.cameraStartY = 0;

    this.setupEventListeners();
  }

  /**
   * Set up all input event listeners
   */
  setupEventListeners() {
    // Mouse drag to pan
    this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.addEventListener('mouseup', () => this.onMouseUp());
    this.canvas.addEventListener('mouseleave', () => this.onMouseUp());

    // Wheel scroll to pan
    this.canvas.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });

    // Prevent context menu on right click
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  /**
   * Handle mouse down - start drag
   */
  onMouseDown(e) {
    this.isDragging = true;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    const pos = this.camera.getPosition();
    this.cameraStartX = pos.x;
    this.cameraStartY = pos.y;
    this.canvas.style.cursor = 'grabbing';
  }

  /**
   * Handle mouse move - pan camera
   */
  onMouseMove(e) {
    if (!this.isDragging) return;

    const dx = e.clientX - this.dragStartX;
    const dy = e.clientY - this.dragStartY;

    this.camera.setPosition(
      this.cameraStartX - dx,
      this.cameraStartY - dy
    );
  }

  /**
   * Handle mouse up - end drag
   */
  onMouseUp() {
    this.isDragging = false;
    this.canvas.style.cursor = 'grab';
  }

  /**
   * Handle wheel scroll - pan camera
   */
  onWheel(e) {
    e.preventDefault();
    const scrollSpeed = 0.8;
    this.camera.pan(
      e.deltaX * scrollSpeed,
      e.deltaY * scrollSpeed
    );
  }
}
