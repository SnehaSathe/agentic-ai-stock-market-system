import React, { useState } from "react";

const TechnicalAgent = () => {
  const [symbol, setSymbol] = useState("");
  const [indicator, setIndicator] = useState("RSI");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTA = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        symbol,
        indicator,
        analysis: `Mock ${indicator} calculation completed. Backend coming soon!`
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="agent-container">
      <h2>📈 Technical Analysis Agent</h2>
      <p>AI performs technical indicators like RSI, MACD, EMA, SMA.</p>

      <div className="input-block">
        <label>Stock Symbol:</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
      </div>

      <div className="input-block">
        <label>Select Indicator:</label>
        <select value={indicator} onChange={(e) => setIndicator(e.target.value)}>
          <option value="RSI">RSI</option>
          <option value="MACD">MACD</option>
          <option value="EMA">EMA</option>
          <option value="SMA">SMA</option>
          <option value="Bollinger Bands">Bollinger Bands</option>
        </select>
      </div>

      <button className="primary-btn" onClick={handleTA}>
        {loading ? "Analyzing..." : "Run Analysis"}
      </button>

      {result && (
        <div className="output-box">
          <h3>📉 Analysis Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TechnicalAgent;
