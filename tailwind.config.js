/** @type {import('tailwindcss').Config} */

const generateGrid = (size) => {
  const gridColumn = {};
  const gridTemplateColumns = {};
  const gridRow = {};
  const gridTemplateRows = {};
  const gridRowStart = {};
  const gridRowEnd = {};
  const gridColumnStart = {};
  const gridColumnEnd = {};
  for (let i = 1; i <= size; i++) {
    gridRow[`span-${i}`] = `span ${i} / span ${i}`;
    gridColumn[`span-${i}`] = `span ${i} / span ${i}`;
    gridTemplateColumns[i] = `repeat(${i}, minmax(0, 1fr))`;
    gridTemplateRows[i] = `repeat(${i}, minmax(0, 1fr))`;
    gridRowStart[i] = `${i}`;
    gridRowEnd[i] = `${i}`;
    gridColumnStart[i] = `${i}`;
    gridColumnEnd[i] = `${i}`;
  }
  return {
    gridColumn,
    gridTemplateColumns,
    gridRow,
    gridTemplateRows,
    gridRowStart,
    gridRowEnd,
    gridColumnStart,
    gridColumnEnd,
  };
}

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './wp-templates/**/*.{js,ts,jsx,tsx,mdx}',
    './wp-blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      ...generateGrid(24),
    },
  },
  plugins: [],
}

