/**
 * hexGrid.js
 * Generates deterministic honeycomb grid positions
 */

export function generateHexGrid(nodeCount, spacing) {
  const positions = [];
  const sqrt3 = Math.sqrt(3);

  // Axial hex directions (6 neighbors)
  const dirs = [
    [1, 0], [1, -1], [0, -1],
    [-1, 0], [-1, 1], [0, 1]
  ];

  // Start with center node
  positions.push({ q: 0, r: 0 });

  // Generate concentric rings
  let ring = 1;
  while (positions.length < nodeCount) {
    let q = -ring;
    let r = 0;

    // Walk around the ring
    for (let side = 0; side < 6; side++) {
      for (let step = 0; step < ring; step++) {
        if (positions.length >= nodeCount) break;
        positions.push({ q, r });
        q += dirs[side][0];
        r += dirs[side][1];
      }
      if (positions.length >= nodeCount) break;
    }
    ring++;
  }

  // Convert axial (q,r) to pixel (x,y) - pointy-top hex
  return positions.map(({ q, r }, id) => ({
    id,
    q,
    r,
    x: spacing * sqrt3 * (q + r / 2),
    y: spacing * (3 / 2) * r
  }));
}
