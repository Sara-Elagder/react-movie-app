import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css"; 

const Navbar = () => {
  return (
    <nav className="navbar" style={{ backgroundColor: "#FFE353" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center px-4 py-3">
        <h1 className="h4 fw-bold text-dark m-0">Movie App</h1>
        <div className="d-flex align-items-center gap-4">

          <div className="dropdown">
            <button
              className="btn bg-transparent border-0 text-dark d-flex align-items-center dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              En 
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">EN</a></li>
              <li><a className="dropdown-item" href="#">AR</a></li>
              <li><a className="dropdown-item" href="#">FR</a></li>
              <li><a className="dropdown-item" href="#">ZH</a></li>
            </ul>
          </div>

          <a href="#" className="text-dark text-decoration-none d-flex align-items-center gap-2">
            <i className="fas fa-heart text-dark"></i>
            <span className="fw-medium">Watchlist</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
