import React, { useContext } from 'react';
import './Header.css';
import logo from '../../assets/images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Header = () => {

    const {user, logout} = useContext(AuthContext);

    const handleLogout = () => {
        logout()
        .then(result => {})
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <nav className='header'>
            <img src={logo} alt="logo" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">SignUp</Link>
            </div>
                {
                    user && <span className='text-white'>{user.email} <button onClick={handleLogout}>Logout</button></span>
                }
        </nav>
    );
};

export default Header;