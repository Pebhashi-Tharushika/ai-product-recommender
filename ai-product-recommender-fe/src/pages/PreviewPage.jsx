import React, { useState } from "react";
import { getRecommendations } from "../api/productApi";

export default function RecommendationPage() {
  const [productId, setProductId] = useState("");
  const [recs, setRecs] = useState([]);

  const fetchRecommendations = async () => {
    const res = await getRecommendations(productId);
    setRecs(res.data);
  };

  return (
    <div>
      <h2>🤖 Product Recommendations</h2>
      <input
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={fetchRecommendations}>Show Recommendations</button>

      <ul>
        {recs.map((r) => (
          <li key={r.id}>{r.name} (${r.price})</li>
        ))}
      </ul>
    </div>
  );
}
