const fs = require('fs');

const size = 500;
let x = size / 2;
let y = size / 2;
const step = 10;
let path = `M${x},${y}`;

for (let i = 0; i < 100; i++) {
  const dir = Math.floor(Math.random() * 4);
  if (dir === 0) x += step;
  if (dir === 1) x -= step;
  if (dir === 2) y += step;
  if (dir === 3) y -= step;
  path += ` L${x},${y}`;
}

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="white"/>
  <path d="${path}" stroke="black" stroke-width="2" fill="none"/>
</svg>
`;

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/random-walk.svg', svg);
console.log('✅ random-walk.svg generated');
