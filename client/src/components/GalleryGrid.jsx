const galleryItems = [
  "Monochrome set",
  "Contrast stitching",
  "Street jersey",
  "Minimal cap",
  "Tailored trouser",
  "Signature tie"
];

export default function GalleryGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {galleryItems.map((label, index) => (
        <div
          key={label}
          className="relative flex h-44 items-end justify-between rounded-2xl border border-clay bg-white/80 p-5"
        >
          <div>
            <p className="text-sm font-semibold text-ink">{label}</p>
            <p className="text-xs text-ink/60">TSL Studio</p>
          </div>
          <div
            className="h-10 w-10 rounded-full"
            style={{
              background:
                index % 2 === 0
                  ? "linear-gradient(135deg, #F25C3B, #F7B194)"
                  : "linear-gradient(135deg, #1F7A7A, #90D5D1)"
            }}
          />
        </div>
      ))}
    </div>
  );
}
