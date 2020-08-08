export const isPricingComplete = subSSPTypes => {
  for (let i = 0; i < subSSPTypes.length; i++) {
    if (subSSPTypes[i].prices.length < 1) {
      return false;
    }
  }
  return true;
};

