const ink = "#2a241c";

const sheetShell = (drawing, meta) => `
<svg class="sheet-svg" viewBox="0 0 420 297" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${meta.title}">
  <rect width="420" height="297" fill="#f6f0e4"/>
  <rect x="10" y="10" width="400" height="277" fill="none" stroke="${ink}" stroke-width="0.7"/>
  <rect x="14" y="14" width="392" height="269" fill="none" stroke="${ink}" stroke-width="0.3"/>
  <text x="20" y="26" fill="${ink}" font-size="6" letter-spacing="1.4" font-family="Outfit, sans-serif">${meta.code}</text>
  <text x="400" y="26" text-anchor="end" fill="${ink}" font-size="6" font-family="Outfit, sans-serif">M 1:100</text>
  ${drawing}
  <g transform="translate(268,236)">
    <rect width="132" height="42" fill="#f6f0e4" stroke="${ink}" stroke-width="0.4"/>
    <line x1="0" y1="14" x2="132" y2="14" stroke="${ink}" stroke-width="0.3"/>
    <line x1="88" y1="0" x2="88" y2="42" stroke="${ink}" stroke-width="0.3"/>
    <text x="6" y="9" fill="${ink}" font-size="5.2" font-family="Outfit, sans-serif">MEMAR STUDIO · ESKİZ</text>
    <text x="6" y="26" fill="${ink}" font-size="7.2" font-family="Cormorant Garamond, serif">${meta.project}</text>
    <text x="6" y="36" fill="${ink}" font-size="5.5" font-family="Outfit, sans-serif">${meta.title}</text>
    <text x="94" y="18" fill="${ink}" font-size="5" font-family="Outfit, sans-serif">VƏRƏQ</text>
    <text x="94" y="34" fill="${ink}" font-size="12" font-family="Cormorant Garamond, serif">${meta.page}</text>
  </g>
</svg>
`;

const north = `<g transform="translate(34 250)" fill="${ink}">
  <polygon points="0,-13 4.5,4 -4.5,4"/>
  <text y="14" text-anchor="middle" font-size="6" font-family="Outfit, sans-serif">Ş</text>
</g>`;

const stairs = (x, y, dir = 1) => `
  <g stroke="${ink}" fill="none" stroke-width="0.55" transform="translate(${x} ${y})">
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 5.2}" x2="28" y2="${i * 5.2}"/>`).join("")}
    <path d="M4 2 v${dir > 0 ? 36 : -4}" stroke-width="0.7"/>
  </g>
`;

export const plans = [
  {
    id: "a1",
    name: "İki mərtəbəli ev",
    place: "Masazır tipi · 148 m²",
    tag: "Yeni tikinti",
    blurb: "3 yataq, açıq qonaq-mətbəx, daxili nərdivan.",
    pages: [
      {
        title: "Sahə planı",
        svg: sheetShell(
          `${north}
          <rect x="68" y="44" width="220" height="174" fill="none" stroke="${ink}" stroke-width="0.55" stroke-dasharray="3.2 2"/>
          <rect x="118" y="74" width="122" height="98" fill="#efe6d4" stroke="${ink}" stroke-width="1.15"/>
          <rect x="118" y="156" width="26" height="16" fill="none" stroke="${ink}" stroke-width="0.8"/>
          <path d="M86 206h184" stroke="${ink}" stroke-width="0.7"/>
          <circle cx="230" cy="92" r="10" fill="none" stroke="${ink}" stroke-width="0.45"/>
          <text x="148" y="126" fill="${ink}" font-size="9" font-family="Cormorant Garamond, serif">EV</text>
          <text x="78" y="58" fill="${ink}" font-size="6" font-family="Outfit, sans-serif">12.00 × 8.40</text>
          <text x="250" y="214" fill="${ink}" font-size="6" font-family="Outfit, sans-serif">küçə</text>
          <text x="74" y="160" fill="${ink}" font-size="6" font-family="Outfit, sans-serif">həyət</text>`,
          { code: "A1-01", project: "A1 · 148 m²", title: "Sahə planı", page: "01" },
        ),
      },
      {
        title: "1-ci mərtəbə",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <rect x="70" y="42" width="186" height="172" stroke-width="1.35"/>
            <path d="M70 118h108M178 42v172M178 118h78" stroke-width="0.95"/>
            <rect x="196" y="132" width="42" height="48" stroke-width="0.7"/>
            <path d="M96 118a12 12 0 0 1 12-12" stroke-width="0.65"/>
            <path d="M178 96a14 14 0 0 0 14 14" stroke-width="0.65"/>
            <path d="M196 180a12 12 0 0 1 12-12" stroke-width="0.55"/>
            <path d="M118 214v-10M214 42v12M70 70h10M256 88h-10" stroke-width="1.5"/>
            <rect x="84" y="56" width="52" height="22" stroke-width="0.45"/>
            <rect x="86" y="148" width="36" height="18" stroke-width="0.45"/>
            <rect x="196" y="56" width="40" height="22" stroke-width="0.45"/>
          </g>
          ${stairs(182, 168)}
          <text x="96" y="92" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Qonaq</text>
          <text x="88" y="188" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Mətbəx</text>
          <text x="192" y="92" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Kabinet</text>
          <text x="202" y="158" fill="${ink}" font-size="6.5" font-family="Cormorant Garamond, serif">S/q</text>
          <text x="54" y="130" fill="${ink}" font-size="5.5" font-family="Outfit, sans-serif">8.40</text>
          <text x="140" y="36" fill="${ink}" font-size="5.5" font-family="Outfit, sans-serif">12.00</text>`,
          { code: "A1-02", project: "A1 · 148 m²", title: "1-ci mərtəbə", page: "02" },
        ),
      },
      {
        title: "2-ci mərtəbə",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <rect x="70" y="42" width="186" height="172" stroke-width="1.35"/>
            <path d="M70 128h186M164 42v86M164 128v86" stroke-width="0.95"/>
            <rect x="182" y="148" width="52" height="42" stroke-width="0.7"/>
            <path d="M164 188c18 0 32-14 32-32" stroke-width="0.65"/>
            <path d="M94 128a12 12 0 0 1 12-12" stroke-width="0.6"/>
            <path d="M164 86a14 14 0 0 0 14 14" stroke-width="0.6"/>
            <rect x="84" y="58" width="48" height="28" stroke-width="0.45"/>
            <rect x="186" y="58" width="48" height="28" stroke-width="0.45"/>
            <rect x="84" y="150" width="44" height="26" stroke-width="0.45"/>
            <path d="M96 42v10M214 42v10M70 72h10" stroke-width="1.5"/>
          </g>
          ${stairs(168, 168, -1)}
          <text x="92" y="108" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Yataq 1</text>
          <text x="190" y="108" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Yataq 2</text>
          <text x="92" y="198" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Uşaq</text>
          <text x="190" y="174" fill="${ink}" font-size="7" font-family="Cormorant Garamond, serif">Hamam</text>`,
          { code: "A1-03", project: "A1 · 148 m²", title: "2-ci mərtəbə", page: "03" },
        ),
      },
      {
        title: "Kəsik A–A",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <path d="M58 214h268" stroke-width="1.05"/>
            <path d="M84 214v-98h76v-50h96v148" stroke-width="1.2"/>
            <path d="M84 164h76M160 116h96" stroke-width="0.7"/>
            <path d="M108 164v-32M200 116v-28" stroke-width="0.55"/>
            <path d="M84 116h0M160 66l96 0" stroke-width="0.45"/>
            <path d="M72 214v-98M268 214v-148" stroke="${ink}" stroke-width="0.35" stroke-dasharray="2 2"/>
          </g>
          <text x="104" y="152" fill="${ink}" font-size="7" font-family="Outfit, sans-serif">+3.20</text>
          <text x="196" y="104" fill="${ink}" font-size="7" font-family="Outfit, sans-serif">+6.40</text>
          <text x="64" y="228" fill="${ink}" font-size="6" font-family="Outfit, sans-serif">±0.00</text>`,
          { code: "A1-04", project: "A1 · 148 m²", title: "Kəsik A–A", page: "04" },
        ),
      },
      {
        title: "Cənub fasadı",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <path d="M62 210h250" stroke-width="1.05"/>
            <path d="M86 210v-112h44v-30h132v142" stroke-width="1.2"/>
            <rect x="104" y="134" width="38" height="50" stroke-width="0.7"/>
            <rect x="164" y="98" width="34" height="42" stroke-width="0.7"/>
            <rect x="210" y="98" width="34" height="42" stroke-width="0.7"/>
            <rect x="164" y="152" width="80" height="58" stroke-width="0.7"/>
            <path d="M86 98h44" stroke-width="0.5"/>
          </g>
          <text x="164" y="228" fill="${ink}" font-size="7" font-family="Outfit, sans-serif">Cənub fasadı</text>`,
          { code: "A1-05", project: "A1 · 148 m²", title: "Cənub fasadı", page: "05" },
        ),
      },
    ],
  },
  {
    id: "a2",
    name: "Təkmərtəbəli ev",
    place: "Binə tipi · 96 m²",
    tag: "Məlumatlandırma",
    blurb: "Kompakt plan: 2 yataq, bir həcmli qonaq.",
    pages: [
      {
        title: "Sahə planı",
        svg: sheetShell(
          `${north}
          <rect x="84" y="52" width="204" height="156" fill="none" stroke="${ink}" stroke-width="0.55" stroke-dasharray="3.2 2"/>
          <rect x="116" y="86" width="138" height="80" fill="#efe6d4" stroke="${ink}" stroke-width="1.15"/>
          <path d="M116 150h24" stroke="${ink}" stroke-width="1"/>
          <text x="164" y="130" fill="${ink}" font-size="9" font-family="Cormorant Garamond, serif">EV</text>
          <text x="94" y="68" fill="${ink}" font-size="6" font-family="Outfit, sans-serif">torpaq 4.2 sot</text>
          <text x="248" y="204" fill="${ink}" font-size="6" font-family="Outfit, sans-serif">küçə</text>`,
          { code: "A2-01", project: "A2 · 96 m²", title: "Sahə planı", page: "01" },
        ),
      },
      {
        title: "Mərtəbə planı",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <rect x="60" y="50" width="228" height="152" stroke-width="1.35"/>
            <path d="M60 126h140M200 50v152M200 126h88" stroke-width="0.95"/>
            <rect x="216" y="140" width="52" height="40" stroke-width="0.7"/>
            <path d="M92 126a12 12 0 0 1 12-12" stroke-width="0.65"/>
            <path d="M200 92a14 14 0 0 0 14 14" stroke-width="0.65"/>
            <path d="M216 180a12 12 0 0 1 12-12" stroke-width="0.55"/>
            <rect x="76" y="64" width="70" height="24" stroke-width="0.45"/>
            <rect x="78" y="148" width="48" height="22" stroke-width="0.45"/>
            <rect x="218" y="64" width="48" height="26" stroke-width="0.45"/>
            <path d="M108 202v-12M248 50v12M60 78h10" stroke-width="1.5"/>
          </g>
          <text x="92" y="108" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Qonaq + mətbəx</text>
          <text x="216" y="108" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Yataq</text>
          <text x="92" y="188" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Yataq 2</text>
          <text x="226" y="164" fill="${ink}" font-size="7" font-family="Cormorant Garamond, serif">S/q</text>`,
          { code: "A2-02", project: "A2 · 96 m²", title: "Mərtəbə planı", page: "02" },
        ),
      },
      {
        title: "Kəsik",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <path d="M56 204h260" stroke-width="1.05"/>
            <path d="M88 204v-90h184v90" stroke-width="1.2"/>
            <path d="M88 154h184" stroke-width="0.65"/>
            <path d="M124 154v-30M216 154v-30" stroke-width="0.55"/>
            <path d="M88 114h184" stroke-width="0.45"/>
          </g>
          <text x="168" y="142" fill="${ink}" font-size="7" font-family="Outfit, sans-serif">+3.00</text>
          <text x="60" y="218" fill="${ink}" font-size="6" font-family="Outfit, sans-serif">±0.00</text>`,
          { code: "A2-03", project: "A2 · 96 m²", title: "Kəsik", page: "03" },
        ),
      },
      {
        title: "Fasad",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <path d="M64 210h248" stroke-width="1.05"/>
            <path d="M88 210v-98h196v98" stroke-width="1.2"/>
            <rect x="108" y="142" width="46" height="68" stroke-width="0.7"/>
            <rect x="172" y="126" width="42" height="40" stroke-width="0.7"/>
            <rect x="226" y="126" width="42" height="40" stroke-width="0.7"/>
            <path d="M88 112h196" stroke-width="0.45"/>
          </g>
          <text x="164" y="228" fill="${ink}" font-size="7" font-family="Outfit, sans-serif">Küçə fasadı</text>`,
          { code: "A2-04", project: "A2 · 96 m²", title: "Küçə fasadı", page: "04" },
        ),
      },
      {
        title: "Dam planı",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <rect x="92" y="62" width="184" height="116" stroke-width="1.05"/>
            <path d="M92 120h184M184 62v116" stroke-width="0.5" stroke-dasharray="4 2"/>
            <path d="M92 62l92 58 92-58" stroke-width="0.7"/>
          </g>
          <text x="156" y="132" fill="${ink}" font-size="7" font-family="Outfit, sans-serif">mail dam</text>`,
          { code: "A2-05", project: "A2 · 96 m²", title: "Dam planı", page: "05" },
        ),
      },
    ],
  },
  {
    id: "a3",
    name: "Bağ evi",
    place: "Mərdəkan tipi · 186 m²",
    tag: "Villa eskizi",
    blurb: "Terrasa çıxış, master yataq, ayrı qonaq həcmi.",
    pages: [
      {
        title: "Sahə planı",
        svg: sheetShell(
          `${north}
          <rect x="54" y="38" width="248" height="192" fill="none" stroke="${ink}" stroke-width="0.5" stroke-dasharray="3.2 2"/>
          <rect x="84" y="70" width="136" height="90" fill="#efe6d4" stroke="${ink}" stroke-width="1.15"/>
          <rect x="220" y="94" width="52" height="42" fill="none" stroke="${ink}" stroke-width="0.7"/>
          <path d="M84 160h72" stroke="${ink}" stroke-width="0.95"/>
          <circle cx="250" cy="168" r="14" fill="none" stroke="${ink}" stroke-width="0.4"/>
          <text x="122" y="118" fill="${ink}" font-size="9" font-family="Cormorant Garamond, serif">EV</text>
          <text x="228" y="118" fill="${ink}" font-size="6.5" font-family="Outfit, sans-serif">terras</text>
          <text x="68" y="218" fill="${ink}" font-size="6" font-family="Outfit, sans-serif">bağ</text>`,
          { code: "A3-01", project: "A3 · 186 m²", title: "Sahə planı", page: "01" },
        ),
      },
      {
        title: "1-ci mərtəbə",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <rect x="52" y="46" width="204" height="156" stroke-width="1.35"/>
            <rect x="256" y="86" width="58" height="76" stroke-width="0.9"/>
            <path d="M52 118h128M180 46v156M180 118h76" stroke-width="0.9"/>
            <path d="M180 176c20 0 36-16 36-36" stroke-width="0.65"/>
            <path d="M256 124h-22" stroke-width="1.25"/>
            <path d="M96 118a12 12 0 0 1 12-12" stroke-width="0.6"/>
            <rect x="66" y="60" width="64" height="24" stroke-width="0.45"/>
            <rect x="66" y="148" width="44" height="20" stroke-width="0.45"/>
            <rect x="198" y="60" width="40" height="22" stroke-width="0.45"/>
            <path d="M100 202v-12M52 78h10M256 86v10" stroke-width="1.5"/>
          </g>
          ${stairs(184, 168)}
          <text x="76" y="98" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Qonaq</text>
          <text x="76" y="186" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Mətbəx</text>
          <text x="196" y="98" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Kabinet</text>
          <text x="266" y="128" fill="${ink}" font-size="7" font-family="Cormorant Garamond, serif">Terras</text>`,
          { code: "A3-02", project: "A3 · 186 m²", title: "1-ci mərtəbə", page: "02" },
        ),
      },
      {
        title: "2-ci mərtəbə",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <rect x="70" y="46" width="188" height="156" stroke-width="1.35"/>
            <path d="M70 126h188M168 46v80M168 126v76" stroke-width="0.9"/>
            <rect x="186" y="146" width="52" height="36" stroke-width="0.7"/>
            <rect x="84" y="60" width="52" height="30" stroke-width="0.45"/>
            <rect x="188" y="60" width="48" height="28" stroke-width="0.45"/>
            <path d="M96 126a12 12 0 0 1 12-12" stroke-width="0.6"/>
            <path d="M168 88a14 14 0 0 0 14 14" stroke-width="0.6"/>
            <path d="M96 46v10M220 46v10" stroke-width="1.5"/>
          </g>
          ${stairs(170, 164, -1)}
          <text x="92" y="110" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Master</text>
          <text x="190" y="110" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Yataq</text>
          <text x="92" y="176" fill="${ink}" font-size="8" font-family="Cormorant Garamond, serif">Geyim</text>
          <text x="192" y="168" fill="${ink}" font-size="7" font-family="Cormorant Garamond, serif">Hamam</text>`,
          { code: "A3-03", project: "A3 · 186 m²", title: "2-ci mərtəbə", page: "03" },
        ),
      },
      {
        title: "Fasad",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <path d="M48 216h308" stroke-width="1.05"/>
            <path d="M70 216v-120h58v-34h124v34h58v120" stroke-width="1.2"/>
            <rect x="90" y="142" width="30" height="46" stroke-width="0.7"/>
            <rect x="154" y="108" width="38" height="38" stroke-width="0.7"/>
            <rect x="208" y="108" width="38" height="38" stroke-width="0.7"/>
            <rect x="154" y="162" width="92" height="54" stroke-width="0.7"/>
          </g>
          <text x="168" y="234" fill="${ink}" font-size="7" font-family="Outfit, sans-serif">Bağ fasadı</text>`,
          { code: "A3-04", project: "A3 · 186 m²", title: "Bağ fasadı", page: "04" },
        ),
      },
      {
        title: "Kəsik B–B",
        svg: sheetShell(
          `<g stroke="${ink}" fill="none">
            <path d="M52 216h288" stroke-width="1.05"/>
            <path d="M84 216v-94h72v-54h112v148" stroke-width="1.2"/>
            <path d="M84 168h72M156 114h112" stroke-width="0.65"/>
            <path d="M256 216v-42h44v42" stroke-width="0.85"/>
            <path d="M108 168v-30M196 114v-28" stroke-width="0.55"/>
          </g>
          <text x="108" y="156" fill="${ink}" font-size="7" font-family="Outfit, sans-serif">+3.30</text>
          <text x="196" y="102" fill="${ink}" font-size="7" font-family="Outfit, sans-serif">+6.60</text>`,
          { code: "A3-05", project: "A3 · 186 m²", title: "Kəsik B–B", page: "05" },
        ),
      },
    ],
  },
];
