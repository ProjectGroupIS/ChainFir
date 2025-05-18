import { useState } from "react";

export default function ViewFIR() {
  const [firId, setFirId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(Submitted FIR ID: ${firId});
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>🔍 View FIR</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter FIR ID"
          value={firId}
          onChange={(e) => setFirId(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "8px 12px", marginLeft: "8px" }}>
          View
        </button>
      </form>
    </div>
  );
}