// BAD: Massive utility file with side effects

console.log('🚨 Loading massive utility with side effects!');

// BAD: Huge data structures that get loaded even if not used
const MASSIVE_CONFIG = {
  themes: new Array(1000).fill(0).map((_, i) => ({
    id: i,
    name: `theme-${i}`,
    colors: {
      primary: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      secondary: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      tertiary: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    },
    fonts: [`font-${i}-regular`, `font-${i}-bold`, `font-${i}-italic`],
    sizes: Array.from({ length: 20 }, (_, j) => `${j + 8}px`),
  })),
  animations: new Array(500).fill(0).map((_, i) => ({
    name: `animation-${i}`,
    duration: Math.random() * 5000,
    easing: ['ease', 'ease-in', 'ease-out', 'ease-in-out'][Math.floor(Math.random() * 4)],
    keyframes: Array.from({ length: 10 }, () => ({
      transform: `translate(${Math.random() * 100}px, ${Math.random() * 100}px)`,
      opacity: Math.random(),
    })),
  })),
  layouts: new Array(200).fill(0).map((_, i) => ({
    id: i,
    grid: Array.from({ length: 12 }, (_, j) => ({
      column: j + 1,
      width: Math.random() * 100,
      height: Math.random() * 200,
    })),
  })),
};

// BAD: Heavy computations that run immediately
const computeExpensiveData = () => {
  console.log('🚨 Computing expensive data...');
  const result = [];
  for (let i = 0; i < 50000; i++) {
    result.push({
      id: i,
      hash: btoa(Math.random().toString()).substring(0, 16),
      timestamp: Date.now() + Math.random() * 1000000,
      data: new Array(100).fill(0).map(() => Math.random()),
    });
  }
  return result;
};

// This runs immediately when the module is imported
const EXPENSIVE_DATA = computeExpensiveData();

// BAD: Side effect - modify global objects (only if window exists)
if (typeof window !== 'undefined') {
  (window as any).BAD_UI_GLOBAL_DATA = EXPENSIVE_DATA;
}

export class MassiveUtility {
  // BAD: Static initialization with side effects
  static {
    console.log('🚨 MassiveUtility static block executing!');
    // Pollute the global namespace (only if window exists)
    if (typeof window !== 'undefined') {
      (window as any).massiveUtilityLoaded = true;
    }
  }

  // BAD: Method that does way more than needed
  static generateRandomStyle() {
    // Do unnecessary work
    const theme = MASSIVE_CONFIG.themes[Math.floor(Math.random() * 1000)];
    const animation = MASSIVE_CONFIG.animations[Math.floor(Math.random() * 500)];
    
    // Log unnecessary information
    console.log('🚨 Generating style with theme:', theme.name, 'and animation:', animation.name);
    
    return {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
      fontSize: theme.sizes[Math.floor(Math.random() * theme.sizes.length)],
      animation: `${animation.name} ${animation.duration}ms ${animation.easing}`,
    };
  }

  // BAD: Utility methods that import the whole config even if only one is needed
  static getAllThemes() {
    return MASSIVE_CONFIG.themes;
  }

  static getAllAnimations() {
    return MASSIVE_CONFIG.animations;
  }

  static getAllLayouts() {
    return MASSIVE_CONFIG.layouts;
  }

  static getRandomTheme() {
    return MASSIVE_CONFIG.themes[Math.floor(Math.random() * MASSIVE_CONFIG.themes.length)];
  }

  static processData(input: any) {
    // BAD: Use the expensive data even for simple operations
    console.log('🚨 Processing with expensive data length:', EXPENSIVE_DATA.length);
    return { processed: input, timestamp: Date.now() };
  }

  // BAD: Method with unnecessary complexity
  static formatText(text: string) {
    const theme = this.getRandomTheme();
    const layout = MASSIVE_CONFIG.layouts[0];
    
    // Do way more work than necessary
    for (const item of EXPENSIVE_DATA.slice(0, 100)) {
      item.hash; // Access unnecessary data
    }
    
    return `${text} (formatted with theme: ${theme.name})`;
  }
}

// BAD: Export everything, making tree shaking impossible
export const AllThemes = MASSIVE_CONFIG.themes;
export const AllAnimations = MASSIVE_CONFIG.animations;
export const AllLayouts = MASSIVE_CONFIG.layouts;
export const ExpensiveData = EXPENSIVE_DATA;

// BAD: Default export of everything
export default {
  MassiveUtility,
  AllThemes,
  AllAnimations,
  AllLayouts,
  ExpensiveData,
  MASSIVE_CONFIG,
}; 