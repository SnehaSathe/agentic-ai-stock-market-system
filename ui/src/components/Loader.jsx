function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div
        style={{
          border: "4px solid #ddd",
          borderTop: "4px solid #3498db",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          margin: "auto",
          animation: "spin 1s linear infinite",
        }}
      ></div>

      <style>
        {`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      `}
      </style>
    </div>
  );
}

export default Loader;
