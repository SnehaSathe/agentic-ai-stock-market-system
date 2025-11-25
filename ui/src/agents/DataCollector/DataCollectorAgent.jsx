import { useState } from "react";
import Loader from "../../components/Loader";

function DataCollectorAgent() {
  const [symbol, setSymbol] = useState("");
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // SORT STATES
  const [sortField, setSortField] = useState("Date");
  const [sortOrder, setSortOrder] = useState("asc");

  // PAGINATION STATES
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const fetchData = async () => {
    if (!symbol) {
      alert("Enter stock symbol");
      return;
    }

    setLoading(true);

    try {
      const url = `http://localhost:8000/data/history?symbol=${symbol}&days=${days}`;
      const res = await fetch(url);
      const json = await res.json();

      console.log("RESPONSE:", json);
      setData(json);
      setPage(1); // reset pagination
    } catch (err) {
      console.error("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // SORT FUNCTION
  const sortData = (field) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";

    setSortField(field);
    setSortOrder(newOrder);

    const sorted = [...data.data].sort((a, b) => {
      const x = a[field];
      const y = b[field];

      if (
        field.toLowerCase().includes("date") &&
        !isNaN(Date.parse(x)) &&
        !isNaN(Date.parse(y))
      ) {
        return newOrder === "asc"
          ? new Date(x) - new Date(y)
          : new Date(y) - new Date(x);
      }

      if (!isNaN(x) && !isNaN(y)) {
        return newOrder === "asc" ? x - y : y - x;
      }

      return newOrder === "asc"
        ? String(x).localeCompare(String(y))
        : String(y).localeCompare(String(x));
    });

    setData({ ...data, data: sorted });
    setPage(1);
  };

  // PAGINATION
  const totalPages = Math.ceil((data?.data?.length || 1) / rowsPerPage);
  const currentRows = data?.data?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // DIVIDENDS
  const dividendRows =
    data?.data?.filter((row) => Number(row["Dividends"]) > 0) || [];

  const downloadCSV = () => {
    if (!data?.data) return;

    const rows = data.data;
    const header = Object.keys(rows[0]).join(",");
    const csvRows = rows.map((row) => Object.values(row).join(","));
    const csvContent = [header, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${symbol}_history.csv`;
    a.click();
  };

  return (
    <div
    style={{
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "40px",
  }}
  >

      
      {/* ================== CENTERED TOP HEADER ================== */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          📊 Data Collector Agent
        </h2>

        {/* INPUTS CENTERED */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Enter Symbol (e.g. TCS)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            style={{ padding: "8px", width: "200px" }}
          />

          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            style={{ padding: "8px", width: "80px" }}
          />

          <button onClick={fetchData} style={{ padding: "8px 15px" }}>
            Fetch Data
          </button>
        </div>
      </div>

      {/* LOADER */}
      {loading && <Loader />}

      {data && !data.data && (
        <p style={{ color: "red" }}>No data received from backend</p>
      )}

      {/* =================== MAIN CONTENT =================== */}
      {data?.data && !loading && (
        <>
          <h3>📥 Collected Data for {symbol}</h3>

          <div style={{ display: "flex", gap: "20px" }}>
            {/* ------------ MAIN TABLE ------------- */}
            <div style={{ width: "70%" }}>
              <table
                border="1"
                cellPadding="8"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    {Object.keys(data.data[0]).map((key) => (
                      <th
                        key={key}
                        onClick={() => sortData(key)}
                        style={{
                          cursor: "pointer",
                          background: "#f4f4f4",
                        }}
                      >
                        {key}{" "}
                        {sortField === key
                          ? sortOrder === "asc"
                            ? "▲"
                            : "▼"
                          : ""}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {currentRows.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, j) => (
                        <td key={j}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION */}
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Prev
                </button>
                <span>
                  Page {page} / {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>

            {/* ------------ DIVIDEND TABLE ------------- */}
            <div style={{ width: "30%" }}>
              <h4>🏦 Dividend History</h4>

              {dividendRows.length === 0 ? (
                <p>No dividend records found.</p>
              ) : (
                <table
                  border="1"
                  cellPadding="8"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Dividend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dividendRows.map((row, i) => (
                      <tr key={i}>
                        <td>{row.Date}</td>
                        <td>{row.Dividends}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <button style={{ marginTop: "20px" }} onClick={downloadCSV}>
            ⬇ Download CSV
          </button>
        </>
      )}
    </div>
  );
}

export default DataCollectorAgent;
