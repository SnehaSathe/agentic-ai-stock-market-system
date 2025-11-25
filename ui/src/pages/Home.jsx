import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>🤖 AI Stock Market System</h1>
      <p>Select any AI Agent</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        
        <Link to="/data-collector">
          <button className="primary-btn">📊 Data Collector Agent</button>
        </Link>

        <Link to="/technical-analysis">
          <button className="primary-btn">📈 Technical Analysis Agent</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
