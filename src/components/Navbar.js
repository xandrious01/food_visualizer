import React from "react";
import { Nav, NavLink, NavItem } from "reactstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <Nav vertical>
                <NavItem>
                    <Link to='/'>
                        Home
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/foods/browse">
                        Browse Foods
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/myfoods">
                        My Saved Foods
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/compare">
                        Food Comparison
                    </Link>
                </NavItem>
            </Nav>
        </div>)

}

export default Navbar;