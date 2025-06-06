// pages/api/hex.js

function getColorInfo(hex) {
  // Basic validation for hex code
  const sanitizedHex = hex.replace('#', '').toLowerCase();
  if (!/^([0-9a-f]{6}|[0-9a-f]{3})$/.test(sanitizedHex)) {
    return { error: "Invalid hex color code." };
  }

  // Convert 3-digit hex to 6-digit
  let fullHex = sanitizedHex;
  if (sanitizedHex.length === 3) {
    fullHex = sanitizedHex.split('').map(c => c + c).join('');
  }

  // Convert hex to RGB
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  // Determine brightness (for text color contrast, optional)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const textColor = brightness > 125 ? 'black' : 'white';

  return {
    hex: `#${fullHex}`,
    rgb: [r, g, b],
    brightness: brightness,
    textColor: textColor
  };
}

export default function handler(req, res) {
  const { hex } = req.query;

  let colorInfo;

  if (hex) {
    colorInfo = getColorInfo(hex);
  } else {
    // Generate random color
    const randomHex = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    colorInfo = getColorInfo(randomHex);
  }

  res.json({
    color: colorInfo
  });
}
