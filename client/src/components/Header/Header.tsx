import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton } from "react-bootstrap";
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
            height="1.5em"
            viewBox="0 0 448 512"
            fill="#112b16"
        >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
    );
    const earth = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 512 512"
            style={{ color: "#0c5153" }}
        >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208.6 357.3l-39-13.5c-6.5-2.2-13.6-2.3-20.1-.3l-15.3 4.9c-18.5 5.9-38.5-2.4-47.5-19.5l-3.3-6.2c-10.6-20.1-2.3-45 18.2-54.7l35.3-16.8c2.3-1.1 4.4-2.8 5.9-4.8l5.3-7c7.2-9.6 18.6-15.3 30.6-15.3s23.4 5.7 30.6 15.3l4.6 6.1c2 2.6 4.9 4.5 8.1 5.1c7.8 1.6 15.7-1.5 20.4-7.9l10.4-14.2c2-2.8 5.3-4.4 8.7-4.4c4.4 0 8.4 2.7 10 6.8l10.1 25.9c2.8 7.2 6.7 14 11.5 20.2L311 299.8c5.8 7.4 9 16.6 9 26s-3.2 18.6-9 26L299 367.2c-8.3 10.6-21 16.8-34.4 16.8c-8.4 0-16.6-2.4-23.7-7l-25.4-16.4c-2.2-1.4-4.5-2.5-6.9-3.4zm65.2-214.8L296 164.7c10.1 10.1 2.9 27.3-11.3 27.3H254.8c-5.6 0-11.1-1.2-16.2-3.4l-42.8-19c-14.3-6.3-11.9-27.3 3.4-30.3l38.5-7.7c13.1-2.6 26.7 1.5 36.1 10.9zM248 432c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16s-7.2 16-16 16H264c-8.8 0-16-7.2-16-16zM431.2 298.9l8 24c2.8 8.4-1.7 17.4-10.1 20.2s-17.4-1.7-20.2-10.1l-8-24c-2.8-8.4 1.7-17.4 10.1-20.2s17.4 1.7 20.2 10.1zm-19.9 80.4l-32 32c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l32-32c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
        </svg>
    );
    const logout = async () => {
        try {
            const response = await axiosInstance.get("/user/logout");
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
    };

    return (
        <>
            {["lg"].map((expand) => (
                <Navbar
                    key={expand}
                    expand={expand}
                    className="bg-body-tertiary header"
                >
                    <Container fluid>
                        <Navbar.Brand href="#" className="header__brand">
                            Travel Planner {earth}
                        </Navbar.Brand>
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
                                        className="header__navLink pe-4 me-3"
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
                                            drop="down-centered"
                                            align="end"
                                            variant="secondary"
                                            title={userIcon}
                                            className="pe-3"
                                            bsPrefix="header__dropdown"
                                        >
                                            <Dropdown.Item eventKey="1">
                                                Profile
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item
                                                eventKey="4"
                                                onClick={logout}
                                            >
                                                Logout
                                            </Dropdown.Item>
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
