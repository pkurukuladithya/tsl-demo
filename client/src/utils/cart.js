export const buildCartKey = (item) => {
  return [
    item.productId || item.productName || item.category,
    item.category,
    item.size,
    item.color,
    item.material,
    item.notes || ""
  ]
    .join("|")
    .toLowerCase();
};

export const mergeCartItems = (items, newItem) => {
  const key = newItem.key || buildCartKey(newItem);
  const existing = items.find((item) => item.key === key);

  if (existing) {
    return items.map((item) =>
      item.key === key
        ? { ...item, quantity: Number(item.quantity) + Number(newItem.quantity) }
        : item
    );
  }

  return [...items, { ...newItem, key }];
};

export const stripCartKey = (item) => {
  const { key, ...rest } = item;
  return rest;
};
