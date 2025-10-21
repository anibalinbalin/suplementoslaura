# Web Interface Guidelines - Suplementos+

This document defines the UI/UX standards for the Suplementos+ application based on Vercel's Web Interface Guidelines.

---

## 1. Interactions

### Keyboard Navigation
- ✅ All interactive elements must be keyboard accessible
- ✅ Visible focus rings on all focusable elements (already implemented via `focus-visible:ring-2`)
- ✅ Focus management on page transitions and form submissions
- ⚠️ TODO: Implement WAI-ARIA APG patterns for complex widgets

### Touch Targets
- ✅ Minimum 44px touch targets on mobile (buttons use `h-11` = 44px)
- ✅ Visual elements smaller than 24px have expanded hit areas via padding
- ✅ Forms use 16px+ font sizes to prevent iOS zoom
- ✅ `touch-action: manipulation` prevents double-tap zoom delays

### Form Behaviors
**Current Implementation:**
- ✅ Inputs are hydration-safe (controlled components)
- ✅ No paste blocking
- ✅ Loading states preserve button labels
- ✅ Text fields submit on Enter
- ✅ Validation appears inline (error messages below inputs)
- ✅ Proper input types (`type="number"` for age)

**TODO:**
- ⚠️ Add autocomplete attributes for better password manager support
- ⚠️ Implement unsaved changes warning
- ⚠️ Add scroll restoration on navigation

---

## 2. Animation

### Current Implementation
- ✅ CSS-based animations (keyframes in `globals.css`)
- ✅ Reduced motion support implemented
- ✅ Compositor-friendly properties only (`transform`, `opacity`)
- ✅ Smooth transitions on interactive elements (200-500ms)
- ✅ Easing functions defined in `lib/animations.ts`

### Animation Patterns
```css
/* Good - Uses transform/opacity */
.animate-in {
  animation: animate-in 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Avoid - Layout triggering */
/* width, height, margin, padding animations */
```

**Rules:**
- Only animate `transform` and `opacity`
- Use `cubic-bezier(0.16, 1, 0.3, 1)` for smooth easing
- Respect `prefers-reduced-motion`
- Keep animations under 500ms
- All animations are interruptible

---

## 3. Layout

### Grid & Alignment
**Current Implementation:**
- ✅ Deliberate grid alignment using Tailwind's spacing scale
- ✅ Optical centering for icons and text
- ✅ Responsive breakpoints: mobile, tablet (sm), desktop (md), wide (lg)

**Viewport Testing:**
- Mobile: 375px (iPhone SE)
- Tablet: 768px
- Desktop: 1440px
- Ultra-wide: 1920px+

**Rules:**
- ✅ Icons and text balanced in size and weight
- ✅ Safe area insets respected (iOS notch)
- ✅ No unwanted scrollbars
- ✅ Consistent spacing scale (4px base unit)

---

## 4. Content & Accessibility

### Current Implementation
**Typography:**
- ✅ Font family: Inter (sans), Inter Display (headings)
- ✅ Tabular numbers for data comparison (font-feature-settings)
- ✅ Proper hierarchy (5xl for h1, down to sm for body)
- ✅ Line heights optimized for readability

**Content Patterns:**
- ✅ Inline help text (muted text below inputs)
- ✅ Loading states with preserved layout
- ✅ Page titles reflect context
- ✅ Empty states designed
- ✅ Non-breaking spaces in units: `"18 años"` → `"18&nbsp;años"`
- ✅ Proper ellipsis character: `…` not `...`

**Accessibility:**
- ✅ ARIA labels where needed
- ✅ Status indicators use multiple cues (not color alone)
- ✅ Semantic HTML (proper heading hierarchy)
- ✅ Alt text for meaningful images

**TODO:**
- ⚠️ Add skip-to-content links
- ⚠️ Implement keyboard shortcuts with proper labeling
- ⚠️ Add aria-live regions for dynamic content

---

## 5. Performance

### Measurement Standards
**Test with:**
- Chrome DevTools → Network: Fast 3G
- CPU: 4x slowdown
- Disable extensions
- Use React DevTools to track re-renders

**Current Implementation:**
- ✅ Image optimization via Next.js Image component
- ✅ Font loading optimized (`display: swap`)
- ✅ Code splitting via Next.js automatic bundling
- ✅ Animations use `will-change` sparingly

**Performance Budgets:**
- Mutations complete in < 500ms
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1

**TODO:**
- ⚠️ Implement virtualization for long lists (recommendations page)
- ⚠️ Add image preloading for above-fold content
- ⚠️ Implement proper loading skeletons
- ⚠️ Add explicit dimensions to prevent CLS

**Optimization Checklist:**
```typescript
// Good - Prevents layout shift
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority
/>

// Good - Virtualizes long lists
import { useVirtualizer } from '@tanstack/react-virtual'

// Avoid - Causes layout shifts
<img src="/hero.jpg" /> // No dimensions
```

---

## 6. Design System

### Colors
**Primary Palette:**
- Primary: `hsl(168 76% 20%)` - Deep Forest Green
- Accent: `hsl(28 84% 44%)` - Warm Amber
- Background: Warm stone grays
- Foreground: `hsl(210 11% 15%)` - Rich charcoal

**Color Usage:**
- ✅ Color-blind friendly (tested with simulators)
- ✅ Sufficient contrast ratios (WCAG AA minimum)
- ✅ Semantic colors (success: emerald, destructive: red)
- ✅ Increased contrast on hover/active/focus

### Shadows & Depth
**Current Implementation:**
```css
/* Layered shadows - ambient + directional */
shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05)
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
```

**Rules:**
- Use layered shadows for depth
- Semi-transparent borders create crisp edges
- Child border-radius ≤ parent radius

### Border Radius
```typescript
// Consistent radius scale
--radius: 0.75rem (12px)
rounded-lg: 12px
rounded-xl: 16px
rounded-2xl: 24px

// Rule: Child ≤ Parent
<Card className="rounded-2xl"> {/* 24px */}
  <CardContent className="rounded-xl"> {/* 16px ≤ 24px ✓ */}
</Card>
```

---

## 7. Component Patterns

### Buttons
```typescript
// ✓ Correct
<Button
  size="lg"
  className="group"
  disabled={isLoading}
>
  {isLoading ? "Guardando..." : "Guardar"}
  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
</Button>

// ✗ Avoid
<Button disabled={isLoading}>
  <Spinner /> {/* No label preservation */}
</Button>
```

### Form Inputs
```typescript
// ✓ Correct
<div className="space-y-3">
  <Label htmlFor="age" className="text-base font-medium">
    Edad (años)
  </Label>
  <Input
    id="age"
    type="number"
    autoComplete="age"
    inputMode="numeric"
    aria-invalid={!!error}
    aria-describedby={error ? "age-error" : undefined}
  />
  {error && (
    <p id="age-error" className="text-sm text-destructive">
      {error}
    </p>
  )}
</div>
```

### Cards
```typescript
// ✓ Correct - Proper hierarchy
<Card className="hover-lift">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Loading States
```typescript
// ✓ Correct - Layout preserved
{isLoading ? (
  <div className="space-y-4">
    <Skeleton className="h-20 w-full" />
    <Skeleton className="h-20 w-full" />
  </div>
) : (
  <div className="space-y-4">
    {items.map(item => <ItemCard key={item.id} {...item} />)}
  </div>
)}
```

---

## 8. Implementation Checklist

### Critical (Must Do)
- [x] Keyboard navigation
- [x] Focus indicators
- [x] Touch target sizes
- [x] Form validation
- [x] Loading states
- [x] Reduced motion
- [x] Semantic HTML
- [x] Color contrast

### High Priority (Should Do)
- [ ] Autocomplete attributes
- [ ] Unsaved changes warning
- [ ] Scroll restoration
- [ ] List virtualization
- [ ] Image preloading
- [ ] Loading skeletons
- [ ] Skip links

### Nice to Have
- [ ] Keyboard shortcuts
- [ ] Haptic feedback
- [ ] Offline support
- [ ] Advanced animations

---

## 9. Testing Checklist

### Manual Testing
- [ ] Keyboard navigation through entire flow
- [ ] Tab order is logical
- [ ] Focus visible on all interactive elements
- [ ] Forms submit on Enter
- [ ] Touch targets work on mobile
- [ ] No horizontal scroll on mobile
- [ ] Dark mode works properly
- [ ] Reduced motion works

### Automated Testing
- [ ] Lighthouse (Performance, Accessibility, Best Practices)
- [ ] axe DevTools (Accessibility)
- [ ] React DevTools (Re-renders)
- [ ] Chrome DevTools (Network, Performance)

### Accessibility Testing
- [ ] Screen reader (VoiceOver/NVDA)
- [ ] Color blindness simulator
- [ ] Contrast checker
- [ ] Keyboard-only navigation

---

## 10. Resources

**Tools:**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Who Can Use](https://www.whocanuse.com/) - Color contrast simulator

**References:**
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines)

---

## Changelog

**v1.0.0** - Initial guidelines based on Vercel standards
- Established color palette
- Defined animation patterns
- Set accessibility standards
- Created component patterns
