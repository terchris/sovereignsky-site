[UI] Mobile responsiveness issues on homepage

## What needs improvement?

The homepage has multiple display issues on mobile devices:

1. **Fixed-width cards overflow** - Database cards (280px) and persona cards (240px) are too wide for mobile screens
2. **Low color contrast** - "Join Us" section uses `rgba(255,255,255,0.1)` which is nearly invisible
3. **Touch targets too small** - Action icons (📊 💡 📢 💬) are only 140px wide boxes
4. **Events table overflows** - Table doesn't adapt to narrow screens
5. **Content stacking issues** - Flex layouts don't properly collapse to single column

## Current behavior

- Cards overflow horizontally or leave awkward gaps
- Text in gradient sections is hard to read
- Buttons/links are hard to tap accurately
- Horizontal scrolling required on some sections

## Expected behavior

- Cards should be full-width on mobile, grid on desktop
- All text should meet WCAG AA contrast (4.5:1)
- Touch targets should be minimum 44×44px
- Events should display as cards on mobile
- No horizontal scrolling

## Device/Screen info

- Device type: mobile
- Screen width: 375px (iPhone SE), 390px (iPhone 14)
- Browser: All
- Dark/Light mode: Both affected

## Screenshots

<!-- Test with Chrome DevTools device emulation -->

## Page(s) affected

- [x] Homepage
- [ ] Other pages may have similar issues

## Suggested fix

See implementation plan: `docs/plans/backlog/PLAN-mobile-responsiveness.md`

Key changes:
1. Replace inline `style="width: Npx"` with responsive Tailwind classes
2. Use CSS Grid with responsive columns instead of flex with fixed widths
3. Increase contrast in gradient sections
4. Add mobile-specific event card layout

## CSS/Layout files involved

- [x] assets/css/custom.css
- [x] layouts/partials/home/custom.html
- [x] layouts/partials/footer.html
- [ ] Theme CSS (Blowfish)
- [x] DaisyUI classes
