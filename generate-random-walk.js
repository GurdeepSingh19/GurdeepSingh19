const fs = require('fs');

const WIDTH = 30;   // grid width
const HEIGHT = 30;  // grid height
const CELL_SIZE = 20;
const STEPS = 400;
const DELAY = 50; // ms per step

// Colors
const BACKGROUND_COLOR = '#ffffff';
const SNAKE_COLOR = '#00cc00';
const TRAIL_OPACITY_STEP = 0.02;

function getSvgHeader(width, height) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${BACKGROUND_COLOR}" />
`;
}

function getSvgFooter() {
  return '</svg>';
}

// Returns x,y key string
function posKey(x, y) {
  return `${x},${y}`;
}

// Return SVG rect with opacity and fill
function rect(x, y, size, opacity, color) {
  return `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" fill-opacity="${opacity}" />\n`;
}

async function generateRandomWalk() {
  const totalWidth = WIDTH * CELL_SIZE;
  const totalHeight = HEIGHT * CELL_SIZE;

  // Track visited cells and their opacity (fade out)
  let visited = new Map();

  // Start roughly center
  let x = Math.floor(WIDTH / 2);
  let y = Math.floor(HEIGHT / 2);

  // Keep trail of positions
  let trail = [];

  // We'll generate frames as SVG <g> elements with animation
  // But since GitHub README does not support <animate>, we'll generate a single static SVG showing the trail gradually

  // Instead, generate one frame showing the final trail

  // Build rects for all visited points with opacity based on trail order
  // Move randomly STEPS times
  for (let step = 0; step < STEPS; step++) {
    // Mark current position visited
    trail.push({x, y});

    // Random move: up/down/left/right with boundary checks
    let moves = [];
    if (x > 0) moves.push([-1, 0]);
    if (x < WIDTH -1) moves.push([1, 0]);
    if (y > 0) moves.push([0, -1]);
    if (y < HEIGHT -1) moves.push([0, 1]);

    let [dx, dy] = moves[Math.floor(Math.random() * moves.length)];
    x += dx;
    y += dy;
  }

  // Create SVG content
  let svgContent = getSvgHeader(totalWidth, totalHeight);

  // Draw trail with fading opacity, latest step most opaque
  trail.forEach((pos, i) => {
    let opacity = 0.1 + (i / trail.length) * 0.9; // from 0.1 to 1
    svgContent += rect(pos.x * CELL_SIZE, pos.y * CELL_SIZE, CELL_SIZE, opacity, SNAKE_COLOR);
  });

  svgContent += getSvgFooter();

  // Save SVG
  fs.writeFileSync('dist/random-walk.svg', svgContent);
  console.log('Random walk SVG generated at dist/random-walk.svg');
}

generateRandomWalk().catch(console.error);
