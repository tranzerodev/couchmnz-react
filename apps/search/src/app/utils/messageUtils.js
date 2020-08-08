export const ellipseText = (text, max, trailString) => {
  const trail = (trailString) ? trailString : '...';
  if (text.length > max) {
    return ((text.slice(0, max)) + trail);
  }
  return text;
};
