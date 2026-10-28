---
name: image-to-animated-svg
description: Turn a raster mascot/character/illustration (webp/png) into a layered, interactive React SVG component split into parts (head, eyes, antenna, etc.) with idle, hover, typing and click animations. Use when asked to "make this image alive", "animate this avatar/mascot", or split an image into parts as a component.
---

# Image to animated SVG component

Reference implementation: `src/components/ui/chat/agent-avatar.tsx` (robot from `src/assets/images/agent-avatar.webp`).

## 1. Analyze the image (don't eyeball it)

- `Read` the image, then measure with `sharp` (already in node_modules) from a throwaway script outside the repo (scratchpad):
  - image size, bounding box of the subject (trim background)
  - sample colors at the center and edges of each part (light/mid/dark for shading)
  - exact coordinates of features (eyes, mouth, ring, antenna ball)
- Write down the viewpoint (front, 3/4 turn). Preserve it: shift and skew the face, don't flatten it.

## 2. Split into parts, back to front

List parts as a tree with a transform origin for each. Group by how they move, not by color:

```
root            float, bounce on click, squash
  antenna       sway (origin: bottom-center)
    stalk, base, glow, ball
  head          tilt toward cursor
    shell (base gradient + shade overlay)
    ear (body, glow, inner, ring)
    face
      screen
      features  clipped to the screen; moves to follow cursor
        eyes (left, right)   blink via scaleY
        mouth                grows on hover
```

Use the image's pixel coordinates as the SVG viewBox (crop with margin) so measurements map 1:1.

## 3. Build the SVG

- Hand-author shapes with `<linearGradient>`/`<radialGradient>` using the sampled colors. No embedded raster.
- Glow = a duplicate shape with a blur `<filter>`, kept in its own group so it can pulse independently.
- Clip moving face features with a `<clipPath>` of the screen.
- Give every part an `id`/`data-part` so it is easy to animate and inspect.
- Set `transform-box: fill-box; transform-origin` per part, or framer's `style={{ originX, originY }}`.

## 4. Animate (framer-motion, already installed)

- **Idle:** float, antenna sway, blink every 2-5s (random), sometimes look left/right.
- **Pointer tracking:** one global `pointermove` listener throttled with `requestAnimationFrame`, writing to `useMotionValue`s. Never `setState` per move. Map the cursor to a small head tilt and a larger feature offset.
- **Hover:** extra tilt, harder antenna wiggle, bigger mouth.
- **State prop** (`"idle" | "typing" | "thinking"`): typing = nod, eyes look down, ear pulses; thinking = antenna glows, eyes look up.
- **Click:** short bounce + squash.
- Respect `prefers-reduced-motion`: disable tracking, loops and bounces; keep static poses.

## 5. Integrate

- Props: `state`, `size`, `className`. Export the state type.
- Derive state from the UI (input focused + non-empty = typing; request in flight = thinking), computed in the parent, not inside the avatar.
- Keep the original raster in place until the SVG is visually checked.

## 6. Verify

- `bun run build` (bun only, never pnpm/npm). `bunx tsc --noEmit` for types.
- Open the page and compare against the original image side by side, then exercise every state.
