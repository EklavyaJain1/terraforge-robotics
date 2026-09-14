/** Update a spotlight card's --spot-x/--spot-y custom properties from the
    pointer position. Shared by ProductCard and the Home pillar/bento cards. */
export function trackSpotlight(event: { currentTarget: HTMLElement; clientX: number; clientY: number }) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}
