import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { ButtonGroup, DropdownButton } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../features/userSlice";

const Header = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
    
    const logout = async () => {
        try {
            const response = await axiosInstance.get("/user/logout")
            dispatch(userActions.reset());
            toast.success("Logged out successfully!", {
                position: "top-right",
            });
            navigate("/auth/login");
        } catch (err: any) {
            console.log(err);
            toast.error(err.response.data, {
                position: "top-right",
            });
        }
    }

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
                                        <DropdownButton
                                            as={ButtonGroup}
                                            drop="down-centered"
                                            align="end"
                                            variant="secondary"
                                            title={userIcon}
                                        >
                                            <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item eventKey="4" onClick={logout}>Logout</Dropdown.Item>
                                        </DropdownButton>
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
