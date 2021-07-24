async function getCount(): Promise<number> {
  const response = await fetch('/count.json');
  const countText = await response.text();
  return Number(countText);
}

export default {
  getCount,
};
