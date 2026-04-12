#!/usr/bin/env node

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const colors = {
  bg: "#F0F7F4",
  card: "#FFFFFF",
  accent: "#3B8A7A",
  accentLight: "#E0F0EC",
  indigo: "#4A6FA5",
  indigoLight: "#E4EDF7",
  navy: "#1A3C32",
  gold: "#C49A3C",
  goldLight: "#FBF2DE",
  teal: "#2E9E8E",
  tealLight: "#DDF2EE",
  green: "#4E9960",
  greenLight: "#E5F3E8",
  rose: "#C46060",
  roseLight: "#FCF0F0",
  text: "#1A3C32",
  textLight: "#5A7A6E",
  border: "#CEDED6",
};

const serif = "Georgia, serif";
const sans = "'Helvetica Neue', Arial, sans-serif";
const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getArg(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1 || index === process.argv.length - 1) return fallback;
  return process.argv[index + 1];
}

function wrapText(text, maxChars) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];

  const lines = [];
  let current = words[0];
  for (const word of words.slice(1)) {
    if (`${current} ${word}`.length <= maxChars) {
      current = `${current} ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  lines.push(current);
  return lines;
}

function textBlock({
  lines,
  x,
  y,
  size,
  lineHeight,
  color,
  weight = 600,
  anchor = "start",
  family = sans,
}) {
  if (!lines.length) return "";
  return [
    `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="${family}" font-size="${size}" font-weight="${weight}">`,
    ...lines.map((line, index) =>
      `  <tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`,
    ),
    "</text>",
  ].join("\n");
}

function frame({ title, subtitle, body, caption, viewBox = "0 0 1600 900" }) {
  const titleLines = wrapText(title, 40);
  const subtitleLines = wrapText(subtitle, 76);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="1600" height="900" fill="none">
  <defs>
    <linearGradient id="panelBg" x1="140" y1="80" x2="1460" y2="820" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#F8FCFA"/>
    </linearGradient>
    <filter id="shadow" x="0" y="0" width="1600" height="900" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#1A3C32" flood-opacity="0.08"/>
    </filter>
  </defs>
  <rect width="1600" height="900" fill="${colors.bg}"/>
  <rect x="110" y="72" width="1380" height="756" rx="28" fill="url(#panelBg)" stroke="${colors.border}" stroke-width="2" filter="url(#shadow)"/>
  <rect x="160" y="118" width="210" height="34" rx="17" fill="${colors.accentLight}"/>
  <text x="192" y="141" fill="${colors.accent}" font-family="${sans}" font-size="20" font-weight="700" letter-spacing="2">RL FIELD NOTES</text>
  ${textBlock({
    lines: titleLines,
    x: 160,
    y: 210,
    size: 42,
    lineHeight: 50,
    color: colors.navy,
    weight: 700,
    family: serif,
  })}
  ${textBlock({
    lines: subtitleLines,
    x: 160,
    y: 270 + Math.max(0, titleLines.length - 1) * 50,
    size: 24,
    lineHeight: 34,
    color: colors.textLight,
    weight: 500,
  })}
  ${body}
  <text x="800" y="786" text-anchor="middle" fill="${colors.textLight}" font-family="${sans}" font-size="20" font-style="italic">${escapeXml(caption)}</text>
</svg>`;
}

function figure1() {
  const items = [
    {
      x: 235,
      circleFill: colors.accentLight,
      circleStroke: colors.accent,
      title: "Looking",
      color: colors.accent,
      description: "Where babies direct their gaze",
      icon: `
        <ellipse cx="235" cy="415" rx="48" ry="30" stroke="${colors.accent}" stroke-width="8"/>
        <circle cx="235" cy="415" r="17" fill="${colors.accent}"/>
        <circle cx="243" cy="408" r="5" fill="#FFFFFF"/>
      `,
    },
    {
      x: 565,
      circleFill: colors.goldLight,
      circleStroke: colors.gold,
      title: "Anticipating",
      color: colors.gold,
      description: "When babies predict what comes next",
      icon: `
        <circle cx="565" cy="415" r="42" stroke="${colors.gold}" stroke-width="8"/>
        <circle cx="548" cy="401" r="5" fill="${colors.gold}"/>
        <circle cx="582" cy="401" r="5" fill="${colors.gold}"/>
        <path d="M548 436c6 10 13 14 17 14s11-4 17-14" stroke="${colors.gold}" stroke-width="6" stroke-linecap="round"/>
      `,
    },
    {
      x: 895,
      circleFill: colors.tealLight,
      circleStroke: colors.teal,
      title: "Kicking",
      color: colors.teal,
      description: "How babies learn cause and effect",
      icon: `
        <path d="M881 384c-4 16-8 29-5 45 4 18 14 30 22 42" stroke="${colors.teal}" stroke-width="8" stroke-linecap="round"/>
        <ellipse cx="907" cy="470" rx="17" ry="10" fill="${colors.teal}" opacity="0.24"/>
        <ellipse cx="907" cy="470" rx="15" ry="8" stroke="${colors.teal}" stroke-width="5"/>
        <path d="M918 423l20-16" stroke="${colors.teal}" stroke-width="6" stroke-linecap="round" stroke-dasharray="9 9"/>
      `,
    },
    {
      x: 1225,
      circleFill: colors.indigoLight,
      circleStroke: colors.indigo,
      title: "Copying",
      color: colors.indigo,
      description: "What babies can reproduce",
      icon: `
        <path d="M1189 428c8-20 20-32 36-32s28 12 36 32" stroke="${colors.indigo}" stroke-width="8" stroke-linecap="round"/>
        <circle cx="1208" cy="443" r="10" stroke="${colors.indigo}" stroke-width="5"/>
        <circle cx="1242" cy="443" r="10" stroke="${colors.indigo}" stroke-width="5"/>
        <path d="M1208 394v-16M1242 394v-16" stroke="${colors.indigo}" stroke-width="5" stroke-linecap="round"/>
      `,
    },
  ];

  const body = `
    ${items
      .map(
        (item) => `
      <g>
        <circle cx="${item.x}" cy="415" r="74" fill="${item.circleFill}" stroke="${item.circleStroke}" stroke-width="6"/>
        ${item.icon}
        <text x="${item.x}" y="550" text-anchor="middle" fill="${item.color}" font-family="${serif}" font-size="30" font-weight="700">${item.title}</text>
        ${textBlock({
          lines: wrapText(item.description, 22),
          x: item.x,
          y: 590,
          size: 20,
          lineHeight: 28,
          color: colors.textLight,
          weight: 500,
          anchor: "middle",
        })}
      </g>`,
      )
      .join("\n")}
  `;

  return frame({
    title: "What Infant Experiments Measure",
    subtitle:
      "Four basic infant responses map onto the home experiments in this guide.",
    body,
    caption:
      "Figure 1 - The four basic responses measured in infant developmental studies",
  });
}

function figure2() {
  const body = `
    <g>
      <rect x="245" y="340" width="1110" height="310" rx="28" fill="${colors.accentLight}" stroke="${colors.border}" stroke-width="3"/>
      <circle cx="800" cy="410" r="56" fill="${colors.accent}"/>
      <text x="800" y="419" text-anchor="middle" fill="#FFFFFF" font-family="${sans}" font-size="24" font-weight="700">Parent</text>
      <text x="800" y="493" text-anchor="middle" fill="${colors.textLight}" font-family="${sans}" font-size="22">Parent</text>

      <circle cx="800" cy="590" r="48" fill="${colors.gold}"/>
      <text x="800" y="598" text-anchor="middle" fill="#FFFFFF" font-family="${sans}" font-size="22" font-weight="700">Baby</text>
      <text x="800" y="666" text-anchor="middle" fill="${colors.textLight}" font-family="${sans}" font-size="22">Baby (in bouncer)</text>

      <line x1="870" y1="462" x2="870" y2="548" stroke="${colors.navy}" stroke-width="4" stroke-dasharray="10 8"/>
      <text x="912" y="514" fill="${colors.navy}" font-family="${sans}" font-size="24" font-weight="700">~60 cm</text>

      <rect x="1110" y="488" width="150" height="96" rx="18" fill="${colors.indigoLight}" stroke="${colors.indigo}" stroke-width="4"/>
      <text x="1185" y="540" text-anchor="middle" fill="${colors.indigo}" font-family="${sans}" font-size="32">Camera</text>
      <text x="1185" y="620" text-anchor="middle" fill="${colors.textLight}" font-family="${sans}" font-size="20">Observer / side angle</text>
    </g>
  `;

  return frame({
    title: "Peekaboo Room Layout",
    subtitle:
      "Face the baby at eye level, keep the camera off to the side, and leave the centerline uncluttered.",
    body,
    caption: "Figure 2 - Face-to-face setup, camera off to the side",
  });
}

function figure4() {
  const cards = [
    {
      x: 230,
      fill: colors.greenLight,
      color: colors.green,
      title: "Standard",
      note: "Cloth drops center",
      body: `
        <rect x="320" y="392" width="110" height="86" rx="8" fill="${colors.border}" opacity="0.55"/>
        <circle cx="375" cy="435" r="28" fill="${colors.accent}"/>
        <circle cx="365" cy="429" r="3.5" fill="#FFFFFF"/>
        <circle cx="385" cy="429" r="3.5" fill="#FFFFFF"/>
        <path d="M366 447c4 5 16 5 20 0" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
        <path d="M375 488v38" stroke="${colors.green}" stroke-width="6" stroke-linecap="round"/>
        <path d="M360 512l15 15 15-15" stroke="${colors.green}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="375" y="565" text-anchor="middle" fill="${colors.green}" font-family="${sans}" font-size="24" font-weight="700">yes</text>
      `,
    },
    {
      x: 610,
      fill: colors.goldLight,
      color: colors.gold,
      title: "Delayed",
      note: "Extra pause - watch for smile",
      body: `
        <rect x="700" y="392" width="110" height="86" rx="8" fill="${colors.border}" opacity="0.55"/>
        <circle cx="755" cy="435" r="28" fill="${colors.gold}" opacity="0.22"/>
        <circle cx="755" cy="435" r="24" stroke="${colors.gold}" stroke-width="4"/>
        <path d="M755 420v18l11 7" stroke="${colors.gold}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M700 540c18-22 37-34 55-34" stroke="${colors.gold}" stroke-width="4" stroke-dasharray="8 7" stroke-linecap="round"/>
        <text x="755" y="564" text-anchor="middle" fill="${colors.gold}" font-family="${sans}" font-size="20" font-weight="700">anticipation</text>
      `,
    },
    {
      x: 990,
      fill: colors.indigoLight,
      color: colors.indigo,
      title: "Wrong-Side",
      note: "Peek from side - watch gaze",
      body: `
        <rect x="1080" y="392" width="110" height="86" rx="8" fill="${colors.border}" opacity="0.55"/>
        <circle cx="1135" cy="435" r="24" fill="${colors.indigo}" opacity="0.14" stroke="${colors.indigo}" stroke-width="2" stroke-dasharray="7 6"/>
        <text x="1135" y="441" text-anchor="middle" fill="${colors.indigo}" font-family="${sans}" font-size="14" opacity="0.66">expected</text>
        <circle cx="1030" cy="435" r="20" fill="${colors.indigo}"/>
        <circle cx="1022" cy="429" r="2.5" fill="#FFFFFF"/>
        <circle cx="1038" cy="429" r="2.5" fill="#FFFFFF"/>
        <path d="M1110 438c-24 0-45 0-64 0" stroke="${colors.indigo}" stroke-width="4" stroke-dasharray="8 7" marker-end="url(#arrowIndigo)"/>
        <text x="1090" y="560" text-anchor="middle" fill="${colors.indigo}" font-family="${sans}" font-size="20" font-weight="700">gaze shifts?</text>
      `,
    },
  ];

  const body = `
    <defs>
      <marker id="arrowIndigo" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M0 0L10 5L0 10" fill="${colors.indigo}"/>
      </marker>
    </defs>
    ${cards
      .map(
        (card) => `
      <g>
        <rect x="${card.x}" y="332" width="300" height="286" rx="22" fill="${card.fill}"/>
        <text x="${card.x + 150}" y="390" text-anchor="middle" fill="${card.color}" font-family="${serif}" font-size="30" font-weight="700">${card.title}</text>
        ${card.body}
        ${textBlock({
          lines: wrapText(card.note, 24),
          x: card.x + 150,
          y: 600,
          size: 18,
          lineHeight: 26,
          color: colors.textLight,
          weight: 500,
          anchor: "middle",
        })}
      </g>`,
      )
      .join("\n")}
  `;

  return frame({
    title: "Peekaboo Test-Trial Comparison",
    subtitle:
      "Hold the baseline steady, then vary one thing and watch whether the baby's expectations become visible.",
    body,
    caption:
      "Figure 4 - What to watch: does baby's gaze go where they expect you to be?",
  });
}

function figure6() {
  const notes = [
    {
      x: 445,
      lines: wrapText("Warm, responsive play. Keep your normal voice and expression.", 28),
    },
    {
      x: 805,
      lines: wrapText("Go neutral briefly. No talking, smiling, or touching.", 24),
    },
    {
      x: 1160,
      lines: wrapText("Reconnect right away. Smile, talk, and comfort if needed.", 28),
    },
  ];

  const body = `
    <defs>
      <clipPath id="stillFaceStrip">
        <rect x="210" y="408" width="1180" height="132" rx="66"/>
      </clipPath>
    </defs>
    <g>
      <rect x="745" y="332" width="430" height="54" rx="27" fill="${colors.roseLight}" stroke="${colors.rose}" stroke-width="3"/>
      <text x="960" y="366" text-anchor="middle" fill="${colors.rose}" font-family="${sans}" font-size="22" font-weight="700">Optional. Stop early if baby shows distress.</text>
      <path d="M960 388v18" stroke="${colors.rose}" stroke-width="3" stroke-linecap="round"/>

      <rect x="210" y="408" width="1180" height="132" rx="66" fill="${colors.card}" stroke="${colors.border}" stroke-width="3"/>
      <g clip-path="url(#stillFaceStrip)">
        <rect x="210" y="408" width="470" height="132" fill="${colors.greenLight}"/>
        <rect x="680" y="408" width="250" height="132" fill="${colors.roseLight}"/>
        <rect x="930" y="408" width="460" height="132" fill="${colors.greenLight}"/>
      </g>
      <line x1="680" y1="430" x2="680" y2="518" stroke="${colors.card}" stroke-width="4" opacity="0.75"/>
      <line x1="930" y1="430" x2="930" y2="518" stroke="${colors.card}" stroke-width="4" opacity="0.75"/>

      <circle cx="275" cy="474" r="18" fill="${colors.green}"/>
      <text x="275" y="481" text-anchor="middle" fill="#FFFFFF" font-family="${sans}" font-size="18" font-weight="700">1</text>
      <text x="325" y="452" fill="${colors.green}" font-family="${sans}" font-size="16" font-weight="700" letter-spacing="1.8">PHASE ONE</text>
      <text x="325" y="490" fill="${colors.green}" font-family="${serif}" font-size="32" font-weight="700">Play</text>
      <text x="325" y="520" fill="${colors.textLight}" font-family="${sans}" font-size="21" font-weight="600">about 60 seconds</text>

      <circle cx="745" cy="474" r="18" fill="${colors.rose}"/>
      <text x="745" y="481" text-anchor="middle" fill="#FFFFFF" font-family="${sans}" font-size="18" font-weight="700">2</text>
      <text x="792" y="452" fill="${colors.rose}" font-family="${sans}" font-size="16" font-weight="700" letter-spacing="1.8">PHASE TWO</text>
      <text x="792" y="490" fill="${colors.rose}" font-family="${serif}" font-size="29" font-weight="700">Still-Face</text>
      <text x="792" y="520" fill="${colors.textLight}" font-family="${sans}" font-size="21" font-weight="600">up to 30 seconds</text>

      <circle cx="995" cy="474" r="18" fill="${colors.green}"/>
      <text x="995" y="481" text-anchor="middle" fill="#FFFFFF" font-family="${sans}" font-size="18" font-weight="700">3</text>
      <text x="1042" y="452" fill="${colors.green}" font-family="${sans}" font-size="16" font-weight="700" letter-spacing="1.8">PHASE THREE</text>
      <text x="1042" y="490" fill="${colors.green}" font-family="${serif}" font-size="32" font-weight="700">Reunion</text>
      <text x="1042" y="520" fill="${colors.textLight}" font-family="${sans}" font-size="21" font-weight="600">immediate repair</text>

      <line x1="445" y1="556" x2="445" y2="584" stroke="${colors.border}" stroke-width="3" stroke-linecap="round"/>
      <line x1="805" y1="556" x2="805" y2="584" stroke="${colors.border}" stroke-width="3" stroke-linecap="round"/>
      <line x1="1160" y1="556" x2="1160" y2="584" stroke="${colors.border}" stroke-width="3" stroke-linecap="round"/>
      ${notes
        .map((note) =>
          textBlock({
            lines: note.lines,
            x: note.x,
            y: 612,
            size: 20,
            lineHeight: 28,
            color: colors.textLight,
            weight: 500,
            anchor: "middle",
          }),
        )
        .join("\n")}
    </g>
  `;

  return frame({
    title: "Still-Face Timeline",
    subtitle:
      "Three phases only: warm play, a very brief neutral face, and immediate repair.",
    body,
    caption:
      "Figure 6 - Maximum 30 seconds of still-face. End sooner if baby shows distress.",
  });
}

function figure7() {
  const safetyCards = [
    {
      x: 190,
      y: 378,
      fill: colors.tealLight,
      stroke: colors.teal,
      title: "Soft ribbon",
      lines: wrapText("Use a wide, soft ribbon that can slide free easily.", 24),
    },
    {
      x: 190,
      y: 504,
      fill: colors.goldLight,
      stroke: colors.gold,
      title: "Clear effect",
      lines: wrapText("Choose a lightweight toy so a kick makes motion visible.", 24),
    },
    {
      x: 190,
      y: 630,
      fill: colors.roseLight,
      stroke: colors.rose,
      title: "Parent nearby",
      lines: wrapText("Stay within arm's reach. Never tie the ribbon or leave baby alone.", 25),
    },
  ];

  const body = `
    <defs>
      <marker id="kickArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M0 0L10 5L0 10" fill="${colors.teal}"/>
      </marker>
      <marker id="toyArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M0 0L10 5L0 10" fill="${colors.gold}"/>
      </marker>
    </defs>
    <g>
      ${safetyCards
        .map(
          (card) => `
        <g>
          <rect x="${card.x}" y="${card.y}" width="320" height="102" rx="22" fill="${card.fill}" stroke="${card.stroke}" stroke-width="3"/>
          <text x="${card.x + 30}" y="${card.y + 38}" fill="${card.stroke}" font-family="${serif}" font-size="28" font-weight="700">${card.title}</text>
          ${textBlock({
            lines: card.lines,
            x: card.x + 30,
            y: card.y + 66,
            size: 18,
            lineHeight: 24,
            color: colors.textLight,
            weight: 500,
          })}
        </g>`,
        )
        .join("\n")}

      <rect x="560" y="358" width="810" height="344" rx="30" fill="${colors.accentLight}" stroke="${colors.border}" stroke-width="3"/>
      <rect x="1112" y="382" width="208" height="48" rx="24" fill="${colors.roseLight}" stroke="${colors.rose}" stroke-width="3"/>
      <text x="1216" y="413" text-anchor="middle" fill="${colors.rose}" font-family="${sans}" font-size="20" font-weight="700">Stay within arm's reach</text>

      <rect x="618" y="640" width="650" height="18" rx="9" fill="${colors.border}"/>
      <path d="M680 640Q700 492 860 434Q1040 366 1252 430" stroke="${colors.accent}" stroke-width="11" fill="none" stroke-linecap="round"/>
      <rect x="668" y="618" width="24" height="40" rx="8" fill="${colors.accent}"/>
      <rect x="1240" y="618" width="24" height="40" rx="8" fill="${colors.accent}"/>

      <line x1="1008" y1="462" x2="1008" y2="520" stroke="${colors.gold}" stroke-width="4"/>
      <circle cx="1008" cy="540" r="24" fill="${colors.goldLight}" stroke="${colors.gold}" stroke-width="4"/>
      <text x="1008" y="548" text-anchor="middle" fill="${colors.gold}" font-family="${sans}" font-size="26">★</text>
      <path d="M1038 520Q1072 500 1090 470" stroke="${colors.gold}" stroke-width="4" marker-end="url(#toyArrow)" fill="none"/>
      <text x="1114" y="462" fill="${colors.gold}" font-family="${sans}" font-size="20" font-weight="700">toy moves</text>

      <ellipse cx="1090" cy="646" rx="185" ry="24" fill="#F7FBF9" stroke="${colors.accent}" stroke-width="3"/>
      <ellipse cx="1008" cy="587" rx="172" ry="62" fill="${colors.tealLight}" stroke="${colors.teal}" stroke-width="5"/>
      <circle cx="886" cy="568" r="44" fill="${colors.tealLight}" stroke="${colors.teal}" stroke-width="5"/>
      <circle cx="874" cy="562" r="4" fill="${colors.navy}"/>
      <circle cx="898" cy="562" r="4" fill="${colors.navy}"/>
      <path d="M1166 588Q1206 614 1252 632" stroke="${colors.teal}" stroke-width="6" stroke-linecap="round"/>

      <line x1="1102" y1="592" x2="1192" y2="548" stroke="${colors.teal}" stroke-width="6" marker-end="url(#kickArrow)"/>
      <text x="1210" y="546" fill="${colors.teal}" font-family="${sans}" font-size="20" font-weight="700">kick</text>

      <path d="M1192 548Q1180 500 1128 484Q1082 470 1032 506" stroke="${colors.rose}" stroke-width="5" stroke-dasharray="12 10" fill="none"/>
      <text x="1182" y="500" fill="${colors.rose}" font-family="${sans}" font-size="20" font-weight="700">loose ribbon</text>

      <path d="M1286 598Q1324 544 1324 478" stroke="${colors.textLight}" stroke-width="3" stroke-dasharray="9 8" fill="none"/>
      <text x="1330" y="474" fill="${colors.textLight}" font-family="${sans}" font-size="18">observe close by</text>
    </g>
  `;

  return frame({
    title: "Kick-to-Move Setup Diagram",
    subtitle:
      "Use a floor play gym, a soft ribbon, and stay within arm's reach the entire time.",
    body,
    caption:
      "Figure 7 - Play gym setup with soft ribbon connection. Parent stays within arm's reach at all times.",
  });
}

function figure8() {
  const columns = [360, 660, 960, 1260];
  const rowY = [370, 444, 518, 592, 666, 740];
  const rowHeight = 74;
  const labels = [
    ["", "Variant A", "Variant B", "Variant C"],
    ["Type", "Immediate Object", "Short-Delay Deferred", "Puppet-Style"],
    ["Best age", "4-5 months", "5-6 months", "5-6 months"],
    ["Demos", "3 repetitions", "3 repetitions", "3 repetitions"],
    ["Delay", "None", "10+ minutes", "10+ minutes"],
    ["Success", "Any part of action", "Any part after delay", "Reaches & makes sound"],
    ["Difficulty", "★", "★★", "★★★"],
  ];

  const bodyRows = [
    {
      y: rowY[0],
      fill: colors.card,
      labelWeight: 700,
      sizes: [0, 24, 24, 24],
      colorsByColumn: [colors.navy, colors.gold, colors.teal, colors.indigo],
    },
    {
      y: rowY[1],
      fill: colors.card,
      labelWeight: 600,
      sizes: [22, 22, 22, 22],
      colorsByColumn: [colors.navy, colors.text, colors.text, colors.text],
    },
    {
      y: rowY[2],
      fill: colors.bg,
      labelWeight: 600,
      sizes: [22, 22, 22, 22],
      colorsByColumn: [colors.navy, colors.text, colors.text, colors.text],
    },
    {
      y: rowY[3],
      fill: colors.card,
      labelWeight: 600,
      sizes: [22, 22, 22, 22],
      colorsByColumn: [colors.navy, colors.text, colors.text, colors.text],
    },
    {
      y: rowY[4],
      fill: colors.bg,
      labelWeight: 600,
      sizes: [22, 22, 22, 22],
      colorsByColumn: [colors.navy, colors.text, colors.text, colors.text],
    },
    {
      y: rowY[5],
      fill: colors.card,
      labelWeight: 600,
      sizes: [22, 20, 20, 20],
      colorsByColumn: [colors.navy, colors.text, colors.text, colors.text],
    },
    {
      y: rowY[6],
      fill: colors.bg,
      labelWeight: 600,
      sizes: [22, 30, 30, 30],
      colorsByColumn: [colors.navy, colors.text, colors.text, colors.text],
    },
  ];

  const table = bodyRows
    .map((row, rowIndex) => {
      const values = labels[rowIndex];
      return `
      <rect x="240" y="${row.y}" width="1120" height="${rowHeight}" fill="${row.fill}" ${rowIndex === 0 ? `rx="18"` : ""}/>
      ${values
        .map((value, columnIndex) => {
          if (columnIndex === 0 && rowIndex === 0) return "";
          const x = columns[columnIndex];
          const anchor = columnIndex === 0 ? "start" : "middle";
          const lines = wrapText(value, columnIndex === 0 ? 12 : 18);
          return textBlock({
            lines,
            x,
            y:
              row.y +
              (rowIndex === 0 ? 44 : lines.length > 1 ? 28 : 46),
            size: row.sizes[columnIndex],
            lineHeight: 24,
            color: row.colorsByColumn[columnIndex],
            weight: columnIndex === 0 ? row.labelWeight : 700,
            anchor,
          });
        })
        .join("\n")}
      `;
    })
    .join("\n");

  const body = `
    <g>
      <rect x="240" y="340" width="1120" height="470" rx="22" fill="${colors.card}" stroke="${colors.border}" stroke-width="2"/>
      <rect x="240" y="340" width="1120" height="74" rx="22" fill="${colors.accentLight}"/>
      <line x1="480" y1="340" x2="480" y2="810" stroke="${colors.border}" stroke-width="2"/>
      <line x1="780" y1="340" x2="780" y2="810" stroke="${colors.border}" stroke-width="2"/>
      <line x1="1080" y1="340" x2="1080" y2="810" stroke="${colors.border}" stroke-width="2"/>
      <line x1="240" y1="444" x2="1360" y2="444" stroke="${colors.border}" stroke-width="2"/>
      <line x1="240" y1="518" x2="1360" y2="518" stroke="${colors.border}" stroke-width="2"/>
      <line x1="240" y1="592" x2="1360" y2="592" stroke="${colors.border}" stroke-width="2"/>
      <line x1="240" y1="666" x2="1360" y2="666" stroke="${colors.border}" stroke-width="2"/>
      <line x1="240" y1="740" x2="1360" y2="740" stroke="${colors.border}" stroke-width="2"/>
      ${table}
    </g>
  `;

  return frame({
    title: "Imitation Variant Comparison",
    subtitle:
      "Three progressively harder versions, matched to age window and the amount of delay involved.",
    body,
    caption: "Figure 8 - Three imitation variants compared",
  });
}

function figure9() {
  const fields = [
    ["Experiment", "e.g., Peekaboo - Delayed Reveal"],
    ["Date", "YYYY-MM-DD"],
    ["Baby's age", "e.g., 5 months, 2 weeks"],
    ["Mood / state", "e.g., Alert, calm, middle of wake window"],
    ["Setup notes", "e.g., Living room, morning light, dad observing"],
    ["What baby did", "Describe observable behaviors only"],
    ["Surprising observations", "Anything unexpected"],
    ["Notes", "Timing, ideas for next session, etc."],
  ];

  const body = `
    <g>
      <rect x="205" y="326" width="1190" height="442" rx="22" fill="#F8FAF9" stroke="${colors.accent}" stroke-opacity="0.28" stroke-width="4"/>
      <text x="250" y="382" fill="${colors.navy}" font-family="${serif}" font-size="34" font-weight="700">Observation Record</text>
      <rect x="1086" y="344" width="250" height="50" rx="14" fill="${colors.accent}"/>
      <text x="1211" y="377" text-anchor="middle" fill="#FFFFFF" font-family="${sans}" font-size="22" font-weight="700">Copy to Clipboard</text>
      ${fields
        .map((field, index) => {
          const y = 418 + index * 40;
          const boxHeight =
            field[0] === "What baby did" || field[0] === "Notes" ? 54 : 34;
          const boxY = y - 20;
          return `
          <text x="250" y="${y + 4}" fill="${colors.navy}" font-family="${sans}" font-size="20" font-weight="700">${escapeXml(field[0])}:</text>
          <rect x="490" y="${boxY}" width="820" height="${boxHeight}" rx="10" fill="#FFFFFF" stroke="${colors.border}" stroke-width="2"/>
          ${textBlock({
            lines: wrapText(field[1], 54),
            x: 520,
            y: boxY + 24,
            size: 18,
            lineHeight: 22,
            color: colors.textLight,
            weight: 500,
          })}`;
        })
        .join("\n")}
    </g>
  `;

  return frame({
    title: "Observation Template",
    subtitle:
      "Use concrete notes, not conclusions, so repeated sessions become comparable over time.",
    body,
    caption: "Figure 9 - Copy this template and fill it in after each session",
  });
}

function writeSvg(outputPath, contents) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, contents, "utf8");
}

function rasterizeSvg(svgPath, outputDir) {
  const result = spawnSync(
    "qlmanage",
    ["-t", "-s", "2400", "-o", outputDir, svgPath],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    return {
      ok: false,
      reason: result.stderr || result.stdout || "Unknown qlmanage failure",
    };
  }

  const thumbnailPath = join(outputDir, `${basename(svgPath)}.png`);
  if (!existsSync(thumbnailPath)) {
    return { ok: false, reason: "qlmanage completed but thumbnail file was missing" };
  }

  const finalPath = join(outputDir, `${basename(svgPath, ".svg")}.png`);
  if (existsSync(finalPath)) rmSync(finalPath);
  renameSync(thumbnailPath, finalPath);
  return { ok: true, outputPath: finalPath };
}

const outputDir = resolve(
  getArg(
    "output-dir",
    "video/infant-experiments/flagship-en/assets/article-figures",
  ),
);

mkdirSync(outputDir, { recursive: true });

const generated = [
  ["figure-1-four-response-types.svg", figure1()],
  ["figure-2-room-layout.svg", figure2()],
  ["figure-4-test-trial-comparison.svg", figure4()],
  ["figure-6-still-face-timeline.svg", figure6()],
  ["figure-7-play-gym-setup.svg", figure7()],
  ["figure-8-imitation-matrix.svg", figure8()],
  ["figure-9-observation-template.svg", figure9()],
];

for (const [name, contents] of generated) {
  writeSvg(join(outputDir, name), contents);
}

const reused = [
  [
    resolve(ROOT, "public/images/guides/infant-experiments/fig-3-peekaboo-sequence.png"),
    join(outputDir, "figure-3-peekaboo-sequence.png"),
  ],
  [
    resolve(ROOT, "public/images/guides/infant-experiments/fig-5-parent-behavior-strip.png"),
    join(outputDir, "figure-5-parent-behavior-strip.png"),
  ],
];

for (const [source, target] of reused) {
  copyFileSync(source, target);
}

const rasterResults = [];
for (const [name] of generated) {
  rasterResults.push(rasterizeSvg(join(outputDir, name), outputDir));
}

const pngCount = readdirSync(outputDir).filter((file) => file.endsWith(".png")).length;
console.log(`Generated ${generated.length} SVG figures and copied ${reused.length} existing PNG figures.`);
console.log(`Article-native figure PNGs currently available: ${pngCount}`);

const failed = rasterResults.filter((result) => !result.ok);
if (failed.length) {
  console.log("PNG rasterization fallback: SVG files were created, but PNG export did not complete in this environment.");
  for (const result of failed) {
    console.log(`- ${result.reason}`);
  }
}
