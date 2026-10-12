// Solderless - fills the header with a breadboard: holes, a few parts, jumper wires and blinking
// LEDs. Positions are seeded, so it looks the same every visit.

"use strict";

function seeded(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PITCH = 16;                     // breadboard hole spacing, px (0.1" scaled up)
const WIRE_COLOURS = ["#d8423a", "#2f6fd6", "#2fa84f", "#f0b429", "#8a4fd6", "#1d1d1f"];
const LED_COLOURS = ["#ff3b2f", "#2aff5a", "#2a72ff", "#ffd21a"];

function buildBoard() {
  const board = document.getElementById("board");
  if (!board) return;
  const rand = seeded(14);
  const w = board.clientWidth, h = board.clientHeight;
  const cols = Math.floor((w - 32) / PITCH);
  const add = (cls, style) => {
    const el = document.createElement("div");
    el.className = cls;
    Object.assign(el.style, style);
    board.appendChild(el);
    return el;
  };

  // rails: two rows at the top and bottom
  for (const y of [16, 30, h - 36, h - 22])
    for (let c = 1; c < cols; c++)
      if (c % 6 !== 0) add("hole", { left: `${16 + c * PITCH}px`, top: `${y}px` });

  // the main field, split down the middle by the channel
  const rowsTop = [60, 76, 92, 108, 124], rowsBottom = [h - 140, h - 124, h - 108, h - 92, h - 76];
  for (const y of [...rowsTop, ...rowsBottom])
    for (let c = 1; c < cols; c++) add("hole", { left: `${16 + c * PITCH}px`, top: `${y}px` });

  // a few parts: resistors (beige bodies) and caps (blue / grey)
  for (let i = 0; i < Math.floor(cols / 7); i++) {
    const c = 2 + Math.floor(rand() * (cols - 6));
    const top = rand() < 0.5;
    const y = top ? rowsTop[Math.floor(rand() * 5)] : rowsBottom[Math.floor(rand() * 5)];
    const kind = rand();
    if (kind < 0.5) add("part", { left: `${16 + c * PITCH}px`, top: `${y - 2}px`, width: `${PITCH * 3}px`, height: "11px", background: "#d9c08a" });
    else if (kind < 0.8) add("part", { left: `${16 + c * PITCH - 2}px`, top: `${y - 4}px`, width: "13px", height: "15px", background: "#2f6fd6", borderRadius: "50%" });
    else add("part", { left: `${16 + c * PITCH - 2}px`, top: `${y - 3}px`, width: "26px", height: "13px", background: "#8f8f8f" });
  }

  // jumper wires from rail to field
  for (let i = 0; i < Math.floor(cols / 5); i++) {
    const c = 1 + Math.floor(rand() * (cols - 2));
    const fromTop = rand() < 0.5;
    const x1 = 19 + c * PITCH, y1 = fromTop ? 33 : h - 19;
    const x2 = x1 + (Math.floor(rand() * 7) - 3) * PITCH;
    const y2 = (fromTop ? rowsTop : rowsBottom)[Math.floor(rand() * 5)] + 3;
    const len = Math.hypot(x2 - x1, y2 - y1);
    add("wire", {
      left: `${x1}px`, top: `${y1}px`, width: `${len}px`,
      background: WIRE_COLOURS[Math.floor(rand() * WIRE_COLOURS.length)],
      transform: `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`,
    });
  }

  // LEDs, blinking out of step
  for (let i = 0; i < 5; i++) {
    const c = 2 + Math.floor(rand() * (cols - 4));
    const y = (rand() < 0.5 ? rowsTop : rowsBottom)[Math.floor(rand() * 5)];
    const colour = LED_COLOURS[i % LED_COLOURS.length];
    const led = add("led-glow", { left: `${12 + c * PITCH}px`, top: `${y - 4}px`, background: colour, color: colour });
    led.style.animationDelay = `${(rand() * 2).toFixed(2)}s`;
  }
}

buildBoard();
