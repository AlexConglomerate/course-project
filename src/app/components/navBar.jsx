import React from "react";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div className="d-flex flex-row">
            <Link className="p-1" to='/'>Main</Link>
            <Link className="p-1" to='/login'>Login</Link>
            <Link className="p-1" to='/users'>Users</Link>
        </div>

        // <ul>
        //     <li>
        //         <Link to='/'>Main</a>
        //     </li>
        //     <li>
        //         <Link to='/login'>Login</a>
        //     </li>
        //     <li>
        //         <Link to='/users'>Users</a>
        //     </li>
        // </ul>
        // <ul>
        //     <li>
        //         <Link to="/">Home</Link>
        //     </li>
        //     <li>
        //         <Link to="/login">Login</Link>
        //     </li>
        //     <li>
        //         <Link to="/posts">Posts</Link>
        //     </li>
        //     <li>
        //         <Link to="/dashboard">Dashboard</Link>
        //     </li>
        // </ul>
    )
        ;
};

export default NavBar;
