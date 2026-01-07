export const formatPrice = (value) => {
  if (typeof value !== "number") {
    return "";
  }
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0
  }).format(value);
};
