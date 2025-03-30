import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishList";
import { useLanguage } from "../context/LanguageContext";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { Navbar as BootstrapNavbar, Nav, Container, Offcanvas } from "react-bootstrap";

const Navbar = () => {
    const { wishList } = useWishlist();
    const { language, setLanguage } = useLanguage();
    const [showMenu, setShowMenu] = useState(false);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleClose = () => setShowMenu(false);
    const handleShow = () => setShowMenu(true);

    return (
        <BootstrapNavbar expand="md" style={{ backgroundColor: "#FFE353" }} className="py-2 sticky-top shadow-sm">
            <Container className="px-3 px-md-4">
                {/* Logo/Brand */}
                <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold text-dark">
                    Movie App
                </BootstrapNavbar.Brand>

                {/* Hamburger menu for mobile */}
                <BootstrapNavbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={handleShow}
                    className="border-0 shadow-none d-md-none"
                />

                {/* Desktop/Tablet navigation - ONLY visible on md and up */}
                <div className="d-none d-md-block w-100">
                    <BootstrapNavbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                        <Nav className="">
                            <Dropdown className="mx-2">
                                <Dropdown.Toggle
                                    as="a"
                                    className="text-dark fw-medium cursor-pointer text-decoration-none nav-link dropdown-toggle"
                                    id="dropdown-basic"
                                >
                                    Movies
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/">
                                        Now Playing
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/popular">
                                        Popular
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Nav.Link as={Link} to="/tvShows" className="text-dark fw-medium mx-2">
                                TV Shows
                            </Nav.Link>
                        </Nav>

                        <div className="d-flex align-items-center">
                            <select
                                className="form-select me-3"
                                value={language}
                                onChange={handleLanguageChange}
                                style={{ width: "100px" }}
                            >
                                <option value="en">English</option>
                                <option value="ar">Arabic</option>
                                <option value="fr">French</option>
                                <option value="zh">Chinese</option>
                            </select>
                            <Link to="/watchlist" className="text-dark text-decoration-none d-flex align-items-center">
                                <i className="fas fa-heart text-dark me-2"></i>
                                <span className="fw-medium me-1">Watchlist</span>
                                {wishList.length > 0 && <span className="badge bg-dark text-light">{wishList.length}</span>}
                            </Link>
                        </div>
                    </BootstrapNavbar.Collapse>
                </div>

                {/* Mobile off-canvas menu - completely separate from desktop menu */}
                <Offcanvas
                    show={showMenu}
                    onHide={handleClose}
                    placement="end"
                    className="d-md-none"
                    backdrop={true}
                    scroll={false}
                >
                    <Offcanvas.Header closeButton className="border-bottom">
                        <Offcanvas.Title>Movie App</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column mb-3 gap-2">
                            <Nav.Link as={Link} to="/" onClick={handleClose} className="ps-0">
                                Now Playing
                            </Nav.Link>
                            <Nav.Link as={Link} to="/popular" onClick={handleClose} className="ps-0">
                                Popular
                            </Nav.Link>
                            <Nav.Link as={Link} to="/tvShows" onClick={handleClose} className="ps-0">
                                TV Shows
                            </Nav.Link>
                        </Nav>

                        <div className="d-flex flex-column gap-3 mt-3">
                            <div className="form-group">
                                <label htmlFor="language-select" className="mb-1">Language</label>
                                <select
                                    id="language-select"
                                    className="form-select"
                                    value={language}
                                    onChange={handleLanguageChange}
                                >
                                    <option value="en">English</option>
                                    <option value="ar">Arabic</option>
                                    <option value="fr">French</option>
                                    <option value="zh">Chinese</option>
                                </select>
                            </div>

                            <Link
                                to="/watchlist"
                                className="text-dark text-decoration-none d-flex align-items-center gap-2"
                                onClick={handleClose}
                            >
                                <i className="fas fa-heart text-dark"></i>
                                <span>Watchlist</span>
                                {wishList.length > 0 && <span className="badge bg-dark text-light">{wishList.length}</span>}
                            </Link>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
