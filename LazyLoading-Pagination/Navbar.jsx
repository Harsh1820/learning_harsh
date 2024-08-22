import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure this path matches the location of your CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li className="navbar-item">   
                    <Link to="/products" className="navbar-link">Products</Link>
                    <Link to="/users" className="navbar-link">Users</Link> 
                    <Link to="/role" className="navbar-link">Roles</Link>
                    <Link to="/addcategories" className="navbar-link">Category</Link>
                </li>
                {/* <li className="navbar-item">   
                    <Link to="/show" className="navbar-link">Show</Link>
                </li> */}
            </ul>
        </nav>
    );
};

export default Navbar;
