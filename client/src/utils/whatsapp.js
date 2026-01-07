import { getCategoryLabel } from "../data/catalog.js";

export const WHATSAPP_NUMBER = "94723354244";

export const buildWhatsAppMessage = ({ user, guest, items }) => {
  const name = user?.name || guest?.name || "Guest";
  const mobile = user?.mobile || guest?.mobile || "Not provided";
  const email = user?.email || guest?.email || null;
  const totalItems = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const safeValue = (value) => value || "TBD";
  const emoji = {
    sparkles: "\u2728",
    person: "\u{1F464}",
    phone: "\u{1F4F1}",
    email: "\u{1F4E7}",
    thread: "\u{1F9F5}",
    ruler: "\u{1F4CF}",
    palette: "\u{1F3A8}",
    numbers: "\u{1F522}",
    note: "\u{1F4DD}",
    box: "\u{1F4E6}",
    pray: "\u{1F64F}"
  };

  const lines = [
    `${emoji.sparkles} Hello TSL Team!`,
    "I would love to place a customization order.",
    "",
    `${emoji.person} Customer Details`,
    `${emoji.person} Name: ${name}`,
    `${emoji.phone} Mobile: ${mobile}`
  ];

  if (email) {
    lines.push(`${emoji.email} Email: ${email}`);
  }

  lines.push("", `${emoji.thread} Order Details`);

  items.forEach((item, index) => {
    const productLabel = item.productName || "Custom item";
    const categoryLabel = item.category
      ? getCategoryLabel(item.category)
      : "Custom";
    lines.push(
      `${index + 1}. ${productLabel} (${categoryLabel})`,
      `   ${emoji.ruler} Size: ${safeValue(item.size)} | ${emoji.palette} Color: ${safeValue(item.color)} | ${emoji.thread} Material: ${safeValue(item.material)} | ${emoji.numbers} Qty: ${safeValue(item.quantity)}`
    );
    if (item.notes) {
      lines.push(`   ${emoji.note} Notes: ${item.notes}`);
    }
  });

  lines.push(
    "",
    `${emoji.box} Total items: ${totalItems}`,
    `${emoji.pray} Please confirm pricing and delivery timeline. Thank you!`
  );

  return lines.join("\n");
};

export const buildWhatsAppLink = (message) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
