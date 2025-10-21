/**
 * Premium Animation System
 * Reusable animation configurations and utilities
 */

// Easing functions - premium cubic-bezier curves
export const easings = {
  // Apple-style easing
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Smooth entry
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  // Snappy entry
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // Spring-like
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  // Subtle spring
  softSpring: "cubic-bezier(0.16, 1.11, 0.3, 1.02)",
} as const

// Duration presets (in ms)
export const durations = {
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 500,
} as const

// Stagger delays for list animations
export const stagger = {
  quick: 50,
  normal: 100,
  slow: 150,
} as const

// Animation class helpers
export const animations = {
  // Fade in animation
  fadeIn: "fade-in",
  // Scale and fade in
  scaleIn: "animate-in",
  // Slide from bottom
  slideInBottom: "slide-in-from-bottom",
  // Slide from top
  slideInTop: "slide-in-from-top",
  // Hover lift effect
  hoverLift: "hover-lift",
} as const

/**
 * Create a staggered animation delay style
 * Usage: <div style={getStaggerDelay(index)} className="animate-in">
 */
export function getStaggerDelay(
  index: number,
  delay: keyof typeof stagger = "normal"
): React.CSSProperties {
  return {
    animationDelay: `${index * stagger[delay]}ms`,
  }
}

/**
 * Create a custom transition style
 */
export function createTransition(
  duration: keyof typeof durations = "normal",
  easing: keyof typeof easings = "easeOut",
  properties: string[] = ["all"]
): React.CSSProperties {
  return {
    transition: properties
      .map((prop) => `${prop} ${durations[duration]}ms ${easings[easing]}`)
      .join(", "),
  }
}

/**
 * Debounce scroll events for better performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Get animation duration based on user preference
 */
export function getAnimationDuration(
  duration: keyof typeof durations = "normal"
): number {
  return prefersReducedMotion() ? 0 : durations[duration]
}

/**
 * Smooth scroll to element with premium easing
 */
export function smoothScrollTo(
  element: HTMLElement | null,
  options?: ScrollIntoViewOptions
) {
  if (!element) return

  const defaultOptions: ScrollIntoViewOptions = {
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
    inline: "nearest",
  }

  element.scrollIntoView({ ...defaultOptions, ...options })
}

/**
 * Intersection Observer hook configuration for scroll animations
 */
export const scrollAnimationConfig = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
} as const
