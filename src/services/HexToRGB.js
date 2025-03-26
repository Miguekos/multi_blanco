function hexToRgbLight(hex) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the r, g, b values
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // return JSON.parse(`{"dark": "rgb(${r}, ${g}, ${b},0.8)", "light": "rgb(${r}, ${g}, ${b},0.1)"}`);
  return `rgb(${r}, ${g}, ${b}, 0.1)`;
}

function hexToRgbDark(hex) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the r, g, b values
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return `rgb(${r}, ${g}, ${b}, 0.8)`;
  // return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgbMiddle(hex) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the r, g, b values
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return `rgb(${r}, ${g}, ${b}, 0.2)`;
  // return `rgb(${r}, ${g}, ${b})`;
}

export {hexToRgbDark, hexToRgbLight, hexToRgbMiddle};
