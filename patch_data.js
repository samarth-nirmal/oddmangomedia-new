const fs = require('fs');
let code = fs.readFileSync('src/components/FilmsPage.tsx', 'utf8');

code = code.replace(
  "  video: string;\n}",
  "  video: string;\n  color: string;\n}"
);

const colors = [
  "bg-[#fcd34d]/90", // yellow-300
  "bg-[#f472b6]/90", // pink-400
  "bg-[#60a5fa]/90", // blue-400
  "bg-[#34d399]/90", // emerald-400
  "bg-[#a78bfa]/90", // violet-400
  "bg-[#fb923c]/90", // orange-400
  "bg-[#38bdf8]/90", // sky-400
  "bg-[#fb7185]/90", // rose-400
  "bg-[#818cf8]/90", // indigo-400
  "bg-[#2dd4bf]/90", // teal-400
  "bg-[#a3e635]/90", // lime-400
  "bg-[#fbbf24]/90"  // amber-400
];

let i = 0;
code = code.replace(/aspect: '(portrait|video)',\n\s*video: '(.*)'\n\s*}/g, (match, p1, p2) => {
  const c = colors[i++];
  return `aspect: '${p1}',\n    video: '${p2}',\n    color: '${c}'\n  }`;
});

fs.writeFileSync('src/components/FilmsPage.tsx', code);
console.log("Patched");
