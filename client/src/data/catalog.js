export const categories = [
  {
    id: "tshirt",
    name: "T-Shirt",
    description: "Classic tees with endless style options."
  },
  {
    id: "trouser",
    name: "Trouser",
    description: "Tailored fits for modern everyday wear."
  },
  {
    id: "cap",
    name: "Cap",
    description: "Signature caps with bold embroidery."
  },
  {
    id: "tie",
    name: "Tie",
    description: "Sharper looks in rich custom fabrics."
  },
  {
    id: "sports",
    name: "Sports Jersey",
    description: "Team-ready jerseys with performance fabrics."
  }
];

export const categoryLabelMap = categories.reduce((acc, category) => {
  acc[category.id] = category.name;
  return acc;
}, {});

export const getCategoryLabel = (slug) => categoryLabelMap[slug] || slug;

export const sizeOptions = ["XS", "S", "M", "L", "XL"];

export const colorSwatches = {
  Ivory: "#F5EFE6",
  Sand: "#E7DED1",
  Teal: "#1F7A7A",
  Coral: "#F25C3B",
  Ink: "#1E1B1A",
  Navy: "#1F2A44",
  Olive: "#5A6B48",
  White: "#F7F6F2",
  Black: "#1E1B1A"
};

export const getColorValue = (colorName) => {
  return colorSwatches[colorName] || "#E7DED1";
};

export const materialOptions = ["Cotton", "Polyester", "Blend"];
