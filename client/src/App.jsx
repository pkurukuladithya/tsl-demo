import { useEffect, useState } from "react";

export default function App() {
  const [health, setHealth] = useState(null);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/health").then(r => r.json()).then(setHealth);
    fetch("/api/items").then(r => r.json()).then(setItems);
  }, []);

  const addItem = async () => {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    const newItem = await res.json();
    setItems([newItem, ...items]);
    setName("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>tsl-demo</h1>

      <p>Health: {health ? health.msg : "Loading..."}</p>

      <div style={{ display: "flex", gap: 8 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" />
        <button onClick={addItem}>Add</button>
      </div>

      <ul>
        {items.map((i) => (
          <li key={i._id}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
}
