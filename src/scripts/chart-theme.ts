// Shared look for the data snapshot charts (CLAUDE.md 4.8). Text uses ink and slate,
// never a series colour; grid lines are solid hairlines one shade off the surface.
// Series colours were checked with the dataviz palette validator (light surface):
// green, blue and gold pass every gate; gold sits below 3:1 on white, so every chart
// that uses it also shows direct labels and a data table.
export const SERIES = {
  green: '#3E8740',
  blue: '#2A78D6',
  gold: '#EDA100',
} as const;

export const INK = '#141516';
export const SLATE = '#4A5560';
export const GRID = '#DDE5E2';
export const SURFACE = '#FFFFFF';
export const FONT = { family: 'Poppins, sans-serif', size: 13 };

export const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Tooltip styling shared by every chart: dark teal box, Poppins, square swatches. */
export const tooltip = {
  backgroundColor: '#0B2A2C',
  titleColor: '#FFFFFF',
  bodyColor: '#FFFFFF',
  titleFont: { family: 'Poppins, sans-serif', size: 13, weight: 600 as const },
  bodyFont: { family: 'Poppins, sans-serif', size: 13 },
  padding: 10,
  cornerRadius: 4,
  boxPadding: 4,
  usePointStyle: false,
};

/** Draw a chart once it is near the viewport, so Chart.js loads only when needed. */
export function whenVisible(selector: string, draw: (el: HTMLCanvasElement) => void) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          draw(entry.target as HTMLCanvasElement);
        }
      }
    },
    { rootMargin: '200px' },
  );
  document.querySelectorAll<HTMLCanvasElement>(selector).forEach((el) => io.observe(el));
}
