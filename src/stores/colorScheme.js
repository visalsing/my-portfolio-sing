// import { ref } from 'vue';

// const THEME_CLASSES = {
//   'Blue-Cyan':     'theme-blue-cyan',
//   'Red-Scarlet':   'theme-red-scarlet',
//   'Purple-Pink':   'theme-purple-pink',
//   'Green-Dark':    'theme-green-dark',
//   'Orange-Yellow': 'theme-orange-yellow',
//   'Black-Charcoal': 'theme-black-charcoal',
//   'White-Smoke': 'theme-white-smoke',
//   'Rainbow': 'theme-rainbow',

//   // 'Indigo-Purple': 'theme-indigo-purple',
//   // 'Lime-Green':    'theme-lime-green',
//   // 'Rose-Orange':   'theme-rose-orange',
//   // 'Sky-Teal':      'theme-sky-teal',
// };

// const saved = localStorage.getItem('colorScheme') || 'Blue-Cyan';
// export const currentScheme = ref(saved);

// export function setColorScheme(name) {
//   // Remove all theme classes from <html>
//   Object.values(THEME_CLASSES).forEach(cls =>
//     document.documentElement.classList.remove(cls)
//   );
//   // Apply the new theme class
//   const cls = THEME_CLASSES[name];
//   if (cls) document.documentElement.classList.add(cls);
//   currentScheme.value = name;
//   localStorage.setItem('colorScheme', name);
// }

// // Apply saved theme immediately on import
// setColorScheme(saved);


import { ref } from 'vue';

const THEME_CLASSES = {
    'Blue-Cyan':      'theme-blue-cyan',
    'Red-Scarlet':    'theme-red-scarlet',
    'Purple-Pink':    'theme-purple-pink',
    'Green-Dark':     'theme-green-dark',
    'Orange-Yellow':  'theme-orange-yellow',
    'Black-Charcoal': 'theme-black-charcoal',
    'White-Smoke':    'theme-white-smoke',
    'Rainbow':        'theme-rainbow',
    'Bloody-Red':     'theme-bloody-red',
    'Midnight-Blue':  'theme-midnight-blue',
};

const logoSchemeMap = {
    'Blue-Cyan':      'logo-portfolio-blue-cyan.png',
    'Red-Scarlet':    'logo-portfolio-red-scarlet.png',
    'Purple-Pink':    'logo-portfolio-pink-purple.png',
    'Green-Dark':     'logo-portfolio-green-darkgreen.png',
    'Orange-Yellow':  'logo-portfolio-orange-yellow.png',
    'Black-Charcoal': 'logo-portfolio-black-charcoal-darkBg.png',
    'White-Smoke':    'logo-portfolio-white-smoke.png',
    'Rainbow':        'logo-portfolio-rainbow.png',
    'Bloody-Red':     'logo-portfolio-bloody-red.png',
    'Midnight-Blue':  'logo-portfolio-midnight-blue.png',
};

// function updateFavicon(name) {
//     const file = logoSchemeMap[name] ?? logoSchemeMap['Blue-Cyan'];
//     const favicon = document.getElementById('favicon');
//     if (favicon) favicon.href = `/logos/${file}`;
// }


function updateFavicon(name) {
    const file = logoSchemeMap[name] ?? logoSchemeMap['Blue-Cyan'];
    const img = new Image();
    img.src = `/logos/${file}`;
    img.onload = () => {
        const size = 64;
        const radius = 14; // roughly rounded-xl equivalent
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Draw rounded rect clip
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(size - radius, 0);
        ctx.quadraticCurveTo(size, 0, size, radius);
        ctx.lineTo(size, size - radius);
        ctx.quadraticCurveTo(size, size, size - radius, size);
        ctx.lineTo(radius, size);
        ctx.quadraticCurveTo(0, size, 0, size - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(img, 0, 0, size, size);

        const favicon = document.getElementById('favicon');
        if (favicon) favicon.href = canvas.toDataURL('image/png');
    };
}

// Add this below your logoSchemeMap inside colorSchemes.js
export const robotSchemeMap = {
    'Blue-Cyan':      'robot-blue-cyan-rmbg.png',
    'Red-Scarlet':    'robot-red-scarlet-rmbg.png',
    'Purple-Pink':    'robot-pink-purple-rmbg.png',      // Rename to match your file names
    'Green-Dark':     'robot-green-darkgreen-rmbg.png', // Rename to match your file names
    'Orange-Yellow':  'robot-orange-yellow-rmbg.png',   // Rename to match your file names
    'Black-Charcoal': 'robot-black-charcoal-rmbg.png',  // Rename to match your file names
    'White-Smoke':    'robot-white-smoke-rmbg.png',     // Rename to match your file names
    'Rainbow':        'robot-rainbow-rmbg.png',         // Rename to match your file names
    'Bloody-Red':     'robot-bloody-red-rmbg.png',
    'Midnight-Blue':  'robot-midnight-blue-rmbg.png',
};

const saved = localStorage.getItem('colorScheme') || 'Blue-Cyan';
export const currentScheme = ref(saved);

export function setColorScheme(name) {
    Object.values(THEME_CLASSES).forEach(cls =>
        document.documentElement.classList.remove(cls)
    );
    const cls = THEME_CLASSES[name];
    if (cls) document.documentElement.classList.add(cls);
    currentScheme.value = name;
    localStorage.setItem('colorScheme', name);
    updateFavicon(name); // ✅ update favicon on every scheme change
}

// Apply saved theme + favicon immediately on import
setColorScheme(saved);