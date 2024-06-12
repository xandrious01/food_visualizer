import {  Button, Container, Nav, NavItem } from "reactstrap";
import { NavLink, Outlet } from "react-router-dom";


const RootLayout = () => {
    return (
        <Container>
            <header>
                <h1>Welcome to the homepage</h1>
            </header>
            <Nav vertical>
                <NavItem>
                    <NavLink to="/">
                            Home

                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="search">
                            Search
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/">
                            My Foods
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/">
                            Browse Foods
                    </NavLink>
                </NavItem>
            </Nav>
            <main>
                <Outlet />
            </main>
        </Container>
    )
}

export default RootLayout;