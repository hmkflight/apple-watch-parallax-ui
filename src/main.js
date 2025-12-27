/**
 * main.js
 * Application entry point and render loop
 */

import { generateHexGrid } from './hexGrid.js';
import { Camera } from './camera.js';
import { Renderer } from './renderer.js';
import { InputHandler } from './input.js';

// Configuration
const CONFIG = {
  nodeCount: 220,
  nodeRadius: 6,
  gap: 10,
  get spacing() {
    return this.nodeRadius * 2 + this.gap; // 22px
  }
};

// Application state
let nodes = [];
let camera = null;
let renderer = null;
let inputHandler = null;

/**
 * Initialize application
 */
function init() {
  // Get canvas element
  const canvas = document.getElementById('canvas');
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  // Generate deterministic honeycomb grid
  nodes = generateHexGrid(CONFIG.nodeCount, CONFIG.spacing);
  console.log(`Generated ${nodes.length} nodes in honeycomb pattern`);

  // Initialize systems
  camera = new Camera();
  renderer = new Renderer(canvas);
  inputHandler = new InputHandler(canvas, camera);

  // Set cursor style
  canvas.style.cursor = 'grab';

  // Start render loop
  animate();
}

/**
 * Main animation loop
 */
function animate() {
  // Update camera with smooth easing
  camera.update();

  // Clear canvas
  renderer.clear();

  // Get context and viewport
  const ctx = renderer.getContext();
  const viewport = renderer.getViewport();

  // Save context state
  ctx.save();

  // Apply camera transform
  camera.applyTransform(ctx, viewport.width, viewport.height);

  // Draw nodes
  renderer.drawNodes(nodes, CONFIG.nodeRadius);

  // Restore context state
  ctx.restore();

  // Continue loop
  requestAnimationFrame(animate);
}

/**
 * Start application when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
