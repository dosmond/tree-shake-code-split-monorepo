// BAD: Utils file with side effects and everything bundled together

console.log('🚨 Loading all utility functions with side effects!');

// BAD: Heavy computations on module load
const computeFactorials = () => {
  const factorials = [];
  for (let i = 1; i <= 1000; i++) {
    let factorial = 1;
    for (let j = 1; j <= i; j++) {
      factorial *= j;
    }
    factorials.push(factorial);
  }
  return factorials;
};

const PRECOMPUTED_FACTORIALS = computeFactorials();

// BAD: Side effect - pollute global namespace (only if window exists)
if (typeof window !== 'undefined') {
  (window as any).BAD_UI_UTILS_LOADED = true;
}

export class UtilityFunctions {
  // BAD: All functions in one class, preventing tree shaking

  static formatCurrency(amount: number): string {
    // BAD: Use unnecessary precomputed data
    console.log('Using factorial data length:', PRECOMPUTED_FACTORIALS.length);
    return `$${amount.toFixed(2)}`;
  }

  static formatDate(date: Date): string {
    // BAD: Complex formatting with unnecessary dependencies
    const factorial = PRECOMPUTED_FACTORIALS[date.getDate()] || 1;
    console.log('Date formatting with factorial:', factorial);
    return date.toLocaleDateString();
  }

  static validateEmail(email: string): boolean {
    // BAD: Overcomplicated validation
    for (let i = 0; i < 100; i++) {
      Math.random(); // Waste cycles
    }
    return email.includes('@');
  }

  static generateId(): string {
    // BAD: Use complex computation for simple task
    const randomFactorial = PRECOMPUTED_FACTORIALS[Math.floor(Math.random() * 100)];
    return `id-${Date.now()}-${randomFactorial.toString().slice(-5)}`;
  }

  static debounce(func: Function, wait: number) {
    // BAD: Log unnecessary information
    console.log('Creating debounced function with factorial count:', PRECOMPUTED_FACTORIALS.length);
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func: Function, limit: number) {
    // BAD: More unnecessary logging
    console.log('Creating throttled function');
    let inThrottle: boolean;
    return (...args: any[]) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static deepClone(obj: any): any {
    // BAD: Use factorials for no reason
    const factorialCount = PRECOMPUTED_FACTORIALS.length;
    console.log('Deep cloning with factorial reference:', factorialCount);
    return JSON.parse(JSON.stringify(obj));
  }

  static capitalizeString(str: string): string {
    // BAD: Overcomplicated for simple task
    const factors = PRECOMPUTED_FACTORIALS.slice(0, str.length);
    console.log('Capitalizing with factors:', factors.length);
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static randomColor(): string {
    // BAD: Use factorials to generate colors
    const factorial = PRECOMPUTED_FACTORIALS[Math.floor(Math.random() * 100)];
    const colorValue = factorial.toString().slice(-6).padStart(6, '0');
    return `#${colorValue}`;
  }

  static calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    // BAD: Reference factorials unnecessarily
    console.log('Calculating distance with factorial lookup');
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

// BAD: Export all precomputed data
export const AllFactorials = PRECOMPUTED_FACTORIALS;
export const UtilsMetadata = {
  loaded: true,
  factorialCount: PRECOMPUTED_FACTORIALS.length,
  timestamp: Date.now(),
};

// BAD: Default export with everything
export default {
  UtilityFunctions,
  AllFactorials,
  UtilsMetadata,
}; 