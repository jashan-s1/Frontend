import React, { useState } from "react";
import axios from "axios";

function App() {
  document.title = "22BAI70227";

  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const API_URL = "https://qualifier-test-xiy5.vercel.app/bfhl"; 

  const handleSubmit = async () => {
    try {
      setError(""); // Reset error
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format: 'data' should be an array.");
      }

      const res = await axios.post(API_URL, parsedData);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON or API error: " + err.message);
      setResponse(null);
    }
  };

  return (
    <div className="container">
      <h1>REST API Frontend</h1>

      {/* JSON Input Field */}
      <textarea
        rows="5"
        placeholder='Enter JSON (e.g., { "data": ["A", "C", "z"] })'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Dropdown to Select Response Data */}
      {response && (
        <>
          <select multiple onChange={(e) =>
            setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))
          }>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          {/* Display Response Based on Selected Options */}
          <div className="response">
            {selectedOptions.includes("alphabets") && (
              <p><strong>Alphabets:</strong> {JSON.stringify(response.alphabets)}</p>
            )}
            {selectedOptions.includes("numbers") && (
              <p><strong>Numbers:</strong> {JSON.stringify(response.numbers)}</p>
            )}
            {selectedOptions.includes("highest_alphabet") && (
              <p><strong>Highest Alphabet:</strong> {JSON.stringify(response.highest_alphabet)}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
