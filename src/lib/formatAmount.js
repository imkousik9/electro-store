export function formatAmountForDisplay(amount) {
  const numberFormat = new Intl.NumberFormat(['en-IN']);
  return numberFormat.format(amount);
}

export const INDIAN_RUPEE = `\u20B9`;
