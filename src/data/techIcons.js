// src/data/techIcons.js
// Logos for tech names. Look one up with logoFor('Vue.js'):
//   → { src, mono }  (mono = a single-color logo that gets painted in the text color)
//   → null             (no logo: the caller shows a fallback icon)
// Names are matched ignoring case, spaces, dots and dashes ("Prisma ORM" = "PrismaORM", "Vite.js" = "Vite").
//
// Sources (all pinned to a version):
//   Devicon (MIT) and LobeHub Icons (MIT) via the jsDelivr CDN,
//   Simple Icons (CC0) and Material Design Icons (Apache-2.0) embedded below.
// Brand logos belong to their owners and are only used here to name the tools.

const DEVICON = "https://cdn.jsdelivr.net/npm/devicon@2.18.0/icons";
const LOBE =
  "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.104.0/icons";

// Prefer the checked-in SVGs so the Tech Stack chips don't depend on a CDN.
const techSvgFiles = import.meta.glob("../assets/techstack/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});
const techSvgByName = Object.fromEntries(
  Object.entries(techSvgFiles).map(([path, url]) => [
    path.split("/").pop().replace(/\.svg$/i, "").toLowerCase(),
    url,
  ]),
);
const deviconAssetNames = { html5: "html", css3: "css", react: "reactjs" };

const color = (src) => ({ src, mono: false });
const mono = (src) => ({ src, mono: true });
const assetColor = (name, fallback) =>
  techSvgByName[name] ? color(techSvgByName[name]) : fallback;
const dev = (name) => {
  const assetName = deviconAssetNames[name] || name;
  return color(
    techSvgByName[assetName.toLowerCase()] ||
      `${DEVICON}/${name}/${name}-original.svg`,
  );
};
const lobe = (name) => color(`${LOBE}/${name}.svg`);

// one-path SVG, embedded as a data URI
const svg = (path, fill = "#000") =>
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${fill}" d="${path}"/></svg>`,
  );

// Your own file (for logos that no icon library has): put it in /public/logos/ and use local('/logos/navicat.png')
const local = (url) => color(url);

/* ───────── single-color logos (painted in the text color, so they work on dark and light themes) ───────── */
const NEXTJS = mono(
  svg(
    "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z",
  ),
);
const EXPRESS = mono(
  svg(
    "M12.262 16.666h1.146l6.975-9.325H19.22zm9.778 1.441v.004l-4.334-5.706-.557.74 4.873 6.682H.945V4.173h9.505l5.026 6.7.574-.772-4.374-5.928h.003l-.719-.945H0v17.544h24zM10.917 8.705a3.8 3.8 0 0 0-1.292-1.183q-.796-.45-1.916-.45c-.746 0-1.37.14-1.906.424a3.76 3.76 0 0 0-1.31 1.12 4.9 4.9 0 0 0-.75 1.581 7.17 7.17 0 0 0 0 3.696c.148.567.402 1.101.75 1.573a3.5 3.5 0 0 0 1.31 1.066q.803.39 1.906.389 1.77 0 2.739-.868.966-.867 1.328-2.457h-1.139q-.271 1.084-.977 1.734-.704.651-1.952.65-.812 0-1.392-.342a3.1 3.1 0 0 1-.957-.869 3.5 3.5 0 0 1-.551-1.182 5 5 0 0 1-.17-1.133 9 9 0 0 0-.015-.286 4.5 4.5 0 0 1 .015-.829c.047-.418.147-.83.296-1.223A3.7 3.7 0 0 1 5.54 9.05a2.9 2.9 0 0 1 .922-.742q.541-.28 1.246-.28c.47 0 .869.093 1.23.28q.541.281.922.742.379.461.587 1.057t.225 1.246H5.625l.004.957h6.182a7.3 7.3 0 0 0-.18-1.924 4.9 4.9 0 0 0-.715-1.68z",
  ),
);
const GITHUB = mono(
  svg(
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  ),
);
const VERCEL = mono(svg("m12 1.608 12 20.784H0Z"));
const PRISMA = mono(
  svg(
    "M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z",
  ),
);
const NGROK = mono(
  svg(
    "M18.951 7.598v6.713h1.463v-1.69l1.61 1.69H24v-.08l-2.123-2.153 2.002-1.846v-.07H21.95l-1.537 1.496v-4.06zm-2.93 2.41a2.626 2.626 0 00-1.787.635 2.049 2.049 0 00-.703 1.556c-.002.75.311 1.287.7 1.643.526.478 1.221.626 1.767.623.666 0 1.34-.195 1.805-.62.521-.483.713-1.029.713-1.607 0-.73-.31-1.247-.71-1.603-.553-.475-1.202-.628-1.785-.627zm-9.062.039c-1.188-.005-2.1.977-2.104 2.25-.004 1.296.908 2.108 2.032 2.096.664.002.983-.244 1.308-.541v1.193h-1.37l-1.03 1.158v.2H9.66v-6.24H8.195v.435c-.381-.408-.772-.542-1.236-.551zm-4.805.11l-.691.786v-.771H0v4.15h1.463v-2.799c.547.002 1.023-.002 1.49-.003v2.802h1.465v-2.595c-.004-.547-.1-.819-.307-1.061a1.431 1.431 0 00-.914-.51zm8.114.005v4.15h1.468l.002-2.779h1.065l1.164-1.314v-.057h-1.598l-.635.715v-.715zm-2.946 1.115c.504 0 .96.444.948.948a.956.956 0 01-.948.945c-.523 0-.931-.403-.947-.945-.002-.52.443-.94.947-.948zm8.703.001c.525 0 .94.434.944.95-.027.544-.42.95-.944.95s-.934-.417-.95-.95a.955.955 0 01.95-.95z",
  ),
);
const JWT = mono(
  svg(
    "M10.2 0v6.456L12 8.928l1.8-2.472V0zm3.6 6.456v3.072l2.904-.96L20.52 3.36l-2.928-2.136zm2.904 2.112l-1.8 2.496 2.928.936 6.144-1.992-1.128-3.432zM17.832 12l-2.928.936 1.8 2.496 6.144 1.992 1.128-3.432zm-1.128 3.432l-2.904-.96v3.072l3.792 5.232 2.928-2.136zM13.8 17.544L12 15.072l-1.8 2.472V24h3.6zm-3.6 0v-3.072l-2.904.96L3.48 20.64l2.928 2.136zm-2.904-2.112l1.8-2.496L6.168 12 .024 13.992l1.128 3.432zM6.168 12l2.928-.936-1.8-2.496-6.144-1.992-1.128 3.432zm1.128-3.432l2.904.96V6.456L6.408 1.224 3.48 3.36Z",
  ),
);
const NOTION = mono(
  svg(
    "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z",
  ),
);
const RENDER = mono(
  svg(
    "M18.263.007c-3.121-.147-5.744 2.109-6.192 5.082-.018.138-.045.272-.067.405-.696 3.703-3.936 6.507-7.827 6.507-1.388 0-2.691-.356-3.825-.979a.2024.2024 0 0 0-.302.178V24H12v-8.999c0-1.656 1.338-3 2.987-3h2.988c3.382 0 6.103-2.817 5.97-6.244-.12-3.084-2.61-5.603-5.682-5.75",
  ),
);
const OPENAI = mono(
  svg(
    "M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z",
  ),
);

/* ───────── colored logos embedded below (not in Devicon) ───────── */
const TELEGRAM = color(
  svg(
    "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
    "#26A5E4",
  ),
);
const MAUTIC = color(
  svg(
    "M12 0C5.394 0 0 5.374 0 12s5.394 12 12 12c6.626 0 12-5.394 12-11.98a11.88 11.88 0 0 0-.727-4.12.815.815 0 0 0-1.05-.486.815.815 0 0 0-.486 1.05c.425 1.132.627 2.324.627 3.556 0 5.717-4.647 10.364-10.364 10.364-5.717 0-10.363-4.647-10.363-10.364C1.637 6.303 6.283 1.657 12 1.657c1.374 0 2.707.262 3.98.787A.843.843 0 0 0 17.05 2a.843.843 0 0 0-.444-1.07A11.588 11.588 0 0 0 12 0zm8.08 4.323-3.595.707.646.647L12 11.111 7.616 6.606 5.091 17.051h2.343l1.394-5.799L12 14.707l6.788-7.394.646.667zm-2.828 6.445-1.858 1.94 1.03 4.343h2.344z",
    "#4E5E9E",
  ),
);
const NEON = color(
  svg(
    "M24 0V24l-9.365-8.045V24H0V0ZM2.942 21.087h8.751V9.563l9.365 8.204V2.919L2.942 2.914Z",
    "#34D59A",
  ),
);
const SQL = color(
  "data:image/svg+xml," +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="13" fill="#E38C2F"/>
      <ellipse cx="32" cy="17" rx="19" ry="8" fill="#fff"/>
      <path d="M13 17v27c0 4.5 8.5 8 19 8s19-3.5 19-8V17"
        fill="none" stroke="#fff" stroke-width="4"/>
      <path d="M13 29c0 4.5 8.5 8 19 8s19-3.5 19-8"
        fill="none" stroke="#fff" stroke-width="3"/>
      <text x="32" y="27" text-anchor="middle"
        font-size="11" font-weight="bold" fill="#E38C2F">SQL</text>
    </svg>
  `),
);

const WORD = color(
  svg(
    "M21.17 3.25q.33 0 .59.25q.24.24.24.58v15.84q0 .34-.24.58q-.26.25-.59.25H7.83q-.33 0-.59-.25q-.24-.24-.24-.58V17H2.83q-.33 0-.59-.24Q2 16.5 2 16.17V7.83q0-.33.24-.59Q2.5 7 2.83 7H7V4.08q0-.34.24-.58q.26-.25.59-.25m-.8 8.09l1.2 3.94H9.6l1.31-6.56H9.53l-.78 3.88l-1.11-3.75H6.5l-1.19 3.77l-.78-3.9H3.09l1.31 6.56h1.37m14.98 4.22V17H8.25v2.5m12.5-3.75v-3.12H12v3.12m8.75-4.37V8.25H12v3.13M20.75 7V4.5H8.25V7Z",
    "#2B579A",
  ),
);
const EXCEL = color(
  svg(
    "M21.17 3.25q.33 0 .59.25q.24.24.24.58v15.84q0 .34-.24.58q-.26.25-.59.25H7.83q-.33 0-.59-.25q-.24-.24-.24-.58V17H2.83q-.33 0-.59-.24Q2 16.5 2 16.17V7.83q0-.33.24-.59Q2.5 7 2.83 7H7V4.08q0-.34.24-.58q.26-.25.59-.25M7 13.06l1.18 2.22h1.79L8 12.06l1.93-3.17H8.22L7.13 10.9l-.04.06l-.03.07q-.26-.53-.56-1.07q-.25-.53-.53-1.07H4.16l1.89 3.19L4 15.28h1.78m8.1 4.22V17H8.25v2.5m5.63-3.75v-3.12H12v3.12m1.88-4.37V8.25H12v3.13M13.88 7V4.5H8.25V7m12.5 12.5V17h-5.62v2.5m5.62-3.75v-3.12h-5.62v3.12m5.62-4.37V8.25h-5.62v3.13M20.75 7V4.5h-5.62V7Z",
    "#217346",
  ),
);
const POWERPOINT = color(
  svg(
    "M13.25 3.25q1.21 0 2.33.31q1.12.32 2.09.89q.97.55 1.77 1.36q.79.8 1.36 1.77q.58.97.89 2.09T22 12t-.31 2.33t-.89 2.09q-.57.97-1.36 1.77q-.8.81-1.77 1.36q-.97.58-2.09.89t-2.33.31q-1.07 0-2.1-.25q-1.03-.26-1.95-.74q-.92-.49-1.7-1.18q-.81-.7-1.43-1.58H2.83q-.33 0-.59-.24Q2 16.5 2 16.17V7.83q0-.33.24-.58Q2.5 7 2.83 7h3.24q.62-.88 1.43-1.58q.78-.7 1.7-1.18q.93-.48 1.95-.74q1.03-.25 2.1-.25m.63 1.28v6.84h6.84q-.12-1.37-.69-2.56T18.55 6.7q-.91-.91-2.12-1.48q-1.2-.57-2.55-.69M9.5 10.84q0-.57-.2-.97q-.19-.41-.52-.66q-.33-.26-.78-.37q-.45-.12-1-.12H4.37v6.55h1.54V13h1.03q.48 0 .93-.16q.46-.14.82-.41q.36-.26.58-.67q.23-.4.23-.92m3.75 8.66q.98 0 1.89-.24q.9-.26 1.71-.68q.81-.45 1.48-1.08q.67-.61 1.17-1.37q.5-.77.83-1.66q.31-.89.39-1.85h-8.08V4.53q-1.45.12-2.73.76T7.67 7h3.5q.33 0 .59.25q.24.25.24.58v8.34q0 .33-.24.59q-.26.24-.59.24h-3.5q.53.6 1.17 1.06q.66.44 1.35.78q.72.33 1.49.49q.77.17 1.57.17M6.85 10q.47 0 .76.19q.28.19.28.7q0 .22-.1.36t-.26.25q-.16.07-.35.1q-.18.04-.38.04h-.89V10z",
    "#D24726",
  ),
);
const OFFICE = color(
  svg(
    "M19.94 5.59v12.8q0 .67-.39 1.2q-.39.52-1.05.7l-5.73 1.65q-.12.03-.27.06h-.22q-.33 0-.6-.09t-.55-.24l-3.75-2.12q-.21-.12-.33-.31t-.12-.43q0-.36.26-.61q.25-.25.61-.25h4.86V6.14L9 7.44q-.43.16-.7.56q-.27.38-.27.85v6.73q0 .42-.21.76q-.2.34-.57.54l-1.72.94q-.24.13-.48.13q-.41 0-.7-.29t-.29-.71V7.47q0-.52.27-.97q.28-.5.73-.76l6.16-3.5q.21-.12.45-.18t.48-.06q.17 0 .31.03q.14.02.31.07l5.73 1.59q.33.09.59.27t.45.43q.2.26.3.56q.1.31.1.64m-1.32 12.8V5.59q0-.23-.12-.4q-.15-.19-.37-.23l-2.82-.78Q15 4.09 14.65 4q-.33-.11-.65-.19v16.4L18.13 19q.22-.04.37-.21q.12-.17.12-.4",
    "#D83B01",
  ),
);

const GDOCS = color(
  svg(
    "M14.727 6.727H14V0H4.91c-.905 0-1.637.732-1.637 1.636v20.728c0 .904.732 1.636 1.636 1.636h14.182c.904 0 1.636-.732 1.636-1.636V6.727h-6zm-.545 10.455H7.09v-1.364h7.09v1.364zm2.727-3.273H7.091v-1.364h9.818v1.364zm0-3.273H7.091V9.273h9.818v1.363zM14.727 6h6l-6-6v6z",
    "#4285F4",
  ),
);
const GSHEETS = color(
  svg(
    "M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z",
    "#34A853",
  ),
);
const GSLIDES = color(
  svg(
    "M16.09 15.273H7.91v-4.637h8.18v4.637zm1.728-8.523h2.91v15.614c0 .904-.733 1.636-1.637 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.068v6.75h3.841zm-.363 2.523H6.545v7.363h10.91V9.273zm-2.728-5.979V6h6.001l-6-6v3.294z",
    "#FBBC04",
  ),
);

const LOGOS = {
  // front-end
  html: dev("html5"),
  css: dev("css3"),
  javascript: dev("javascript"),
  typescript: dev("typescript"),
  vuejs: dev("vuejs"),
  vue: dev("vuejs"),
  vite: dev("vitejs"),
  vitejs: dev("vitejs"),
  reactjs: dev("react"),
  react: dev("react"),
  nextjs: dev("nextjs"),
  nuxtjs: dev("nuxtjs"),
  jquery: dev("jquery"),
  tailwindcss: dev("tailwindcss"),
  bootstrap: dev("bootstrap"),

  // back-end & programming languages
  php: dev("php"),
  python: dev("python"),
  laravel: dev("laravel"),
  nodejs: dev("nodejs"),
  node: dev("nodejs"),
  expressjs: dev("expressjs"),
  express: dev("expressjs"),
  java: dev("java"),
  "c#": dev("csharp"),
  c: dev("c"),
  "c++": dev("cplusplus"),

  // mobile
  dart: dev("dart"),
  flutter: dev("flutter"),

  // databases & ORM
  sql: dev("sql"),
  mysql: dev("mysql"),
  postgresql: dev("postgresql"),
  mongodb: dev("mongodb"),
  prismaorm: PRISMA,
  prisma: PRISMA,
  neondb: NEON,
  neon: NEON,
  firebase: dev("firebase"),

  // APIs & security
  postman: dev("postman"),
  jwt: JWT,

  // CMS & marketing tech
  wordpress: dev("wordpress"),
  mautic: MAUTIC,
  telegrambot: TELEGRAM,
  telegram: TELEGRAM,

  // DevOps & deployment
  git: dev("git"),
  github: GITHUB,
  gitlab: dev("gitlab"),
  netlify: dev("netlify"),
  vercel: VERCEL,
  render: RENDER,
  docker: dev("docker"),

  // development tools
  vscode: dev("vscode"),
  ngrok: NGROK,
  // No icon library has Navicat or WAMP. Download their logos, save them in /public/logos/,
  // then uncomment the local() helper above and these two lines:
  // navicat: local('/logos/navicat.png'),
  // wamp: local('/logos/wamp.png'),

  navicat: local("/logos/navicat.svg"),
  navicatpremium: local("/logos/navicat.svg"),
  navicatpremium16: local("/logos/navicat.svg"),

  wamp: local("/logos/wamp.svg"),
  wampserver: local("/logos/wamp.svg"),

  // design
  figma: dev("figma"),
  photoshop: dev("photoshop"),
  canva: dev("canva"),

  // productivity
  microsoftoffice: OFFICE,
  microsoft365: OFFICE,
  office365: OFFICE,
  microsoftword: assetColor("word", WORD),
  microsoftexcel: assetColor("excel", EXCEL),
  microsoftpowerpoint: assetColor("powerpoint", POWERPOINT),
  powerbi: assetColor("power-bi", null),
  tableau: assetColor("tableau", null),
  googleworkspace: dev("google"),
  googledocs: assetColor("googledocs", GDOCS),
  googlesheets: assetColor("googlesheets", GSHEETS),
  googleslides: assetColor("googleslides", GSLIDES),
  notion: assetColor("notion", NOTION),

  // LLMs & AI assistants
  claude: assetColor("claude", lobe("claude-color")),
  gemini: assetColor("gemini", lobe("gemini-color")),
  chatgpt: assetColor("chatgpt", OPENAI),
  openai: OPENAI,
  copilot: lobe("copilot-color"),
  microsoftcopilot: lobe("copilot-color"),
};

const normalize = (name) =>
  String(name)
    .toLowerCase()
    .replace(/[\s.\-_]/g, "");

export const logoFor = (name) => {
  const key = normalize(name);
  return LOGOS[key] || (techSvgByName[key] ? color(techSvgByName[key]) : null);
};
