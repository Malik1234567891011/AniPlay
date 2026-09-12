# Plotbreak brand

Mark: a plot line, broken. A bar (the story as scripted, also a text cursor)
cut once on the diagonal (the moment the player types). OOC-style: one flat
glyph, one accent, no glow.

Palette: violet `#7C6CFF`, black `#0B0D12`, text `#F7F8FA`
(from `packages/ui/src/tokens.ts`).

Tagline: **THE PLAYABLE ANIME** / **L'ANIME JOUABLE** (no accent, matches app copy).

| File | Use |
|---|---|
| icon.svg / glyph.svg | Source of truth. Bar 128x680, cut at 30°, gap 32 (1024 grid). |
| icon.png, appstore-icon-1024.png | App Store / Expo icon. 1024, no alpha, square corners. |
| logo-horizontal-en.png / -fr.png | Wordmark lockups, black bg (AI render, 1536x1024). |
| logo-stacked-en.png / -fr.png | Square lockups, black bg (AI render, 1024). |

Expo assets in `apps/mobile/assets/` (icon, favicon, splash, Android adaptive
layers) are generated from the same geometry. Logos are still raster renders;
setting PLOTBREAK in a real font is the remaining step.
