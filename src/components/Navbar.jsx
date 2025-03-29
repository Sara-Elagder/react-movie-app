import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishList";
import { useLanguage } from "../context/LanguageContext";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = () => {
    const { wishList } = useWishlist();
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value); // Update the selected language
    };

    return (
        <nav className="navbar d-flex align-items-center justify-content-center" style={{ backgroundColor: "#FFE353", height: "55px" }}>
            <div className="container-fluid d-flex justify-content-between align-items-center px-4">
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <Link className="navbar-brand h4 fw-bold text-dark m-0 align-self-start" to="/">
                        Movie App
                    </Link>
                    <Dropdown>
                        <Dropdown.Toggle
                            as="a" // Render as an anchor tag
                            href="#"
                            className="text-dark text-decoration-none nav-link dropdown-toggle"
                            id="dropdown-basic"
                        >
                            Movies
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/nowplaying">
                                Now Playing
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/popular">
                                Popular
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Link to="/tvShows" className="text-dark text-decoration-none nav-link">
                        <span className="">TV Shows</span>
                    </Link>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <select className="form-select" value={language} onChange={handleLanguageChange} style={{ width: "100px" }}>
                        <option value="en">English</option>
                        <option value="ar">Arabic</option>
                        <option value="fr">French</option>
                        <option value="zh">Chinese</option>
                    </select>
                    <Link to="/watchlist" className="text-dark text-decoration-none d-flex align-items-center gap-2">
                        <i className="fas fa-heart text-dark fs-4"></i>
                        <span className="fw-medium">Watchlist</span>

                        {wishList.length > 0 && <span className="badge text-bg-light">{wishList.length}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
