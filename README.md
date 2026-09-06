# Marci Metzger Homes — Home page revamp

A single-page redesign of the marcimetzger.com home page, built with React
and Tailwind CSS, no build tools required.

## File structure

```
index.html      entry point — loads fonts, Tailwind, React, and js/app.js
css/
  style.css     hover/lift effects, image fallback styling, focus states
js/
  app.js        the whole React app (JSX, compiled in the browser)
```

React and Babel are loaded from a CDN and Babel compiles the JSX in the
browser at load time, so there's nothing to install and nothing to build.
That also means this folder can be dragged straight into any static host.

## Images

This uses the same photos as the live site — the logo, the hero photo, Marci's
headshot, and the Mountain Falls photo — linked directly from the CDN that
already hosts them (img1.wsimg.com), the same way the original page does.
They're defined in one place at the top of `js/app.js` as `IMAGES`, so
swapping any of them for a higher-res or different photo later is a one-line
change. If a link ever breaks, the affected spot falls back gracefully (a
textured placeholder for photo tiles, initials for the headshot, the text
wordmark for the logo) instead of showing a broken-image icon.

## Running it locally

Any static file server works, for example:

```
python3 -m http.server 8000
```

then open http://localhost:8000. Opening index.html directly by double
clicking it also works in most browsers.

## Deploying (free hosting)

Any of these work with zero configuration since it's a static folder:

- **Netlify Drop** — netlify.com/drop, drag the project folder in
- **GitHub Pages** — push this folder to a repo, enable Pages on the main branch
- **Vercel** — `vercel` in this folder, or drag-and-drop on vercel.com/new

## What's real vs. placeholder

- All of the copy is based on the actual home page content (hero, stats,
  the "don't just list it" / "guide for buyers" blocks, the three services,
  contact info, hours), lightly rewritten so it reads as fresh copy rather
  than a copy-paste.
- All of the images, including the six stock photos used in the gallery
  carousel, are pulled from the live site's own CDN.
- The listings search is a real, working filter/sort UI, backed by a small
  sample dataset (six realistic Pahrump-area listings) — swap
  `SAMPLE_LISTINGS` in js/app.js for a live MLS/IDX feed when ready to go live.
- Clicking a listing card opens a detail card with the full specs and a
  "call to ask" button. It's intentionally a dead end otherwise (no "view
  full listing" link) — a real per-listing page would need its own URL,
  which doesn't exist on a one-page site.
- The photo gallery is a real carousel: clicking any tile opens all eight
  photos with next/prev arrows, dot indicators, a counter, and left/right
  arrow-key + Escape support.

## Design notes

Palette leans into the actual setting — desert sand, a dusk-blue for the
Spring Mountains, a clay/rust accent, and a warm gold for calls to action.
Headlines use Fraunces (serif), body text uses Public Sans.

Interactive polish: nav links get a hover underline, buttons lift and gain
shadow on hover, listing and gallery cards lift with a soft shadow, gallery
photos zoom slightly on hover, and every input/select highlights on hover
and focus. Changing a filter in "Find your next home" replays a quiet,
staggered fade-and-rise on the results rather than snapping to the new set,
and every modal (listing detail, gallery) fades and settles in rather than
popping open.
