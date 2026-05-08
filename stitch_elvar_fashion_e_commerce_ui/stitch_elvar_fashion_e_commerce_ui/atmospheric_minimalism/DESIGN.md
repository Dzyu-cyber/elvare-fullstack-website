---
name: Atmospheric Minimalism
colors:
  surface: '#0e150e'
  surface-dim: '#0e150e'
  surface-bright: '#333b33'
  surface-container-lowest: '#091009'
  surface-container-low: '#161d16'
  surface-container: '#1a221a'
  surface-container-high: '#242c24'
  surface-container-highest: '#2f372e'
  on-surface: '#dce5d9'
  on-surface-variant: '#bccbb9'
  inverse-surface: '#dce5d9'
  inverse-on-surface: '#2a322a'
  outline: '#869585'
  outline-variant: '#3d4a3d'
  surface-tint: '#4ae176'
  primary: '#4be277'
  on-primary: '#003915'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#006e2f'
  secondary: '#4de082'
  on-secondary: '#003919'
  secondary-container: '#00b55d'
  on-secondary-container: '#003e1c'
  tertiary: '#ffb5ab'
  on-tertiary: '#60130d'
  tertiary-container: '#ff8b7c'
  on-tertiary-container: '#76231b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#6dfe9c'
  secondary-fixed-dim: '#4de082'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#005227'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#410001'
  on-tertiary-fixed-variant: '#7f2a21'
  background: '#0e150e'
  on-background: '#dce5d9'
  surface-variant: '#2f372e'
typography:
  display-lg:
    fontFamily: ebGaramond
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: ebGaramond
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: ebGaramond
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: dmSans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: dmSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: dmSans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is anchored in the concept of "Quiet Luxury." It merges the raw, organic ethos of sustainable fashion with a high-end, Scandinavian-inspired digital execution. The aesthetic is defined by an atmospheric dark mode that prioritizes focus, intentionality, and prestige.

The style is a sophisticated blend of **Minimalism** and **Glassmorphism**. It utilizes expansive black space to allow high-fidelity photography to breathe, punctuated by sharp, functional UI elements. The emotional response should be one of calm, exclusivity, and environmental consciousness—avoiding the "crunchy" tropes of sustainability in favor of a sleek, future-facing "Forest-Tech" vibe.

## Colors

The palette is rooted in deep, obsidian neutrals with a singular, high-vibrancy accent. 

- **The Void:** The background and surfaces use a near-black base with subtle green undertones to prevent a "flat" digital black.
- **Neon Chlorophyll:** The primary green (#22C55E) is used as a tactical tool for conversion and focus. It represents the "pulse" of the brand—life within the dark.
- **Lichen Neutrals:** Secondary text and borders utilize muted, desaturated greens to maintain a cohesive monochromatic foundation that feels softer than pure greyscale.
- **Off-White Tint:** Main text is slightly warmed with a green tint to reduce eye strain and harmonize with the accent color.

## Typography

The typographic hierarchy relies on the tension between classical editorial elegance and modern functionalism. 

**ebGaramond** is used for all headlines and display copy. It should be typeset with generous leading and occasional italicization to mimic luxury print magazines. 

**dmSans** provides a clean, low-contrast counterpoint for all functional UI, body text, and navigational elements. By using a geometric sans-serif for the UI, this design system maintains a sense of modern efficiency. For labels and micro-copy, use increased letter-spacing and uppercase styling to provide a technical, "spec-sheet" feel.

## Layout & Spacing

This design system utilizes a **Fixed Grid** for desktop and a **Fluid Grid** for mobile. The layout is inspired by high-end fashion lookbooks, prioritizing asymmetric compositions and "negative space" to create a sense of premium airiness.

- **Grid:** 12-column structure with 24px gutters.
- **Margins:** Oversized desktop margins (64px+) are encouraged to "frame" the content like a gallery piece.
- **Rhythm:** An 8px linear scale governs all padding and margin increments, ensuring mathematical harmony across the clean interface.

## Elevation & Depth

Depth in this design system is achieved through light and transparency rather than traditional shadows.

1.  **Glassmorphism:** Secondary surfaces and overlays (like navigation bars or modals) should use a backdrop blur (12px to 20px) with a semi-transparent fill of the background color (approx. 70% opacity).
2.  **Fine Borders:** Instead of drop shadows, use 1px solid borders (`#2A2E2A`) to define edges. On "active" glass elements, the border may take on a very subtle green tint at 20% opacity.
3.  **Luminous Glows:** Primary buttons and active states should emit a soft, diffused green outer glow (`box-shadow: 0 0 20px rgba(34, 197, 94, 0.2)`). This simulates a "bioluminescent" effect against the dark background.

## Shapes

The shape language is "Architectural Soft." To maintain a premium, editorial feel, the design system avoids overly bubbly or circular forms in favor of subtle, precise radii.

- **Primary Radius:** 0.25rem (4px) for most UI components (buttons, input fields).
- **Secondary Radius:** 0.5rem (8px) for larger cards and glass containers.
- **Imagery:** Photography should always remain sharp-edged (0px) to maintain the "editorial window" aesthetic, contrasting against the slightly softened UI elements.

## Components

### Buttons
- **Primary:** Solid `#22C55E` background with `#0C0D0C` text. On hover, apply a subtle glow.
- **Secondary/Ghost:** Transparent background with a 1px border of `#F0FDF4` (at 30% opacity). Text in `#F0FDF4`.
- **Tertiary:** Text-only with a 1px underline that expands from the center on hover.

### Cards
Cards use the `Surface` color with a 1px border. For featured content, use the glassmorphic treatment: semi-transparent surface with a backdrop blur to let background imagery or colors bleed through softly.

### Inputs
Minimalist style. A dark background (`Surface-2`) with a subtle bottom border. On focus, the border transitions to the Primary Accent green with a faint "glow" line.

### Chips & Tags
Small, 4px rounded containers. For sustainability badges, use a low-opacity green background with solid green text to denote "organic" status without over-powering the primary CTA.

### Navigation
The header should be a glassmorphic bar that sits at the top of the viewport. Use thin, high-spaced `dmSans` for links to maintain a high-fashion, minimalist aesthetic.