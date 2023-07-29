import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
    const user = useAppSelector((state) => state.user);
    const userIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            fill="#0d4648"
        >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
    );
    return (
        <>
            <ToastContainer style={{ fontSize: "20px" }} />
            {["lg"].map((expand) => (
                <Navbar
                    key={expand}
                    expand={expand}
                    className="bg-body-tertiary header"
                >
                    <Container fluid>
                        <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
                        <Navbar.Toggle className="header__toggler" />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title
                                    id={`offcanvasNavbarLabel-expand-${expand}`}
                                >
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link
                                        href="#action1"
                                        className="header__navLink"
                                    >
                                        Home
                                    </Nav.Link>
                                    {!user.isLoggedIn && (
                                        <Nav.Link
                                            href="/auth/login"
                                            className="header__navLink"
                                        >
                                            Login
                                        </Nav.Link>
                                    )}
                                    {user.isLoggedIn && (
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                variant="success"
                                                id="dropdown-basic"
                                                className="header__dropdown"
                                            >
                                                {userIcon}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">
                                                    Action
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">
                                                    Another action
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">
                                                    Something else
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
};

export default Header;
