import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

const Navbar = () => {
  return (
    <nav className="navbar d-flex align-items-center justify-content-center" style={{ backgroundColor: "#FFE353", height: "55px" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        <h1 className="h4 fw-bold text-dark m-0">Movie App</h1>
        <a href="#" className="text-dark text-decoration-none d-flex align-items-center gap-2">
          <i className="fas fa-heart text-dark"></i>
          <span className="fw-medium">Watchlist</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
