import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/data">Data Collector</Link>
      <Link to="/technical">Technical Analysis</Link>
      <Link to="/fundamental">Fundamental Analysis</Link>
    </nav>
  );
}

export default Navbar;
