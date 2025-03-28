import { useState } from "react";

function Calculator() {
  const [numberType, setNumberType] = useState("");
  const [data, setData] = useState({ numbers: [], avg: 0 });
  const [error, setError] = useState("");


  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Fetch Numbers</h1>

      <input 
        type="text" 
        value={numberType} 
        onChange={(e) => setNumberType(e.target.value.trim())} 
        placeholder="Enter p, f, e, or r"
      />
      <button onClick={fetchNumbers} disabled={!numberType}>Get Numbers</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Numbers:</h3>
      <p>{data.numbers.length > 0 ? data.numbers.join(", ") : "No numbers yet"}</p>

      <h3>Average:</h3>
      <p>{data.avg}</p>
    </div>
  );
}

export default Calculator;
