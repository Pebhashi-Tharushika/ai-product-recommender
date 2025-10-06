import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../api/productApi";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", category: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateProduct(editingId, form);
      setEditingId(null);
    } else {
      await addProduct(form);
    }
    setForm({ name: "", price: "", category: "", description: "" });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <h2>🛒 Product Management</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit">{editingId ? "✏️ Update" : "➕ Add"} Product</button>
      </form>

      <h3>📜 All Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} (${p.price}) — {p.category}
            <button onClick={() => handleEdit(p)}>✏️ Edit</button>
            <button onClick={() => handleDelete(p.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
