import React from 'react'
import { Book } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

function Menu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <Book /> Library
            </a>
            <div>
                <a className="menu-link">
                    <Link to="/">Books</Link>
                </a>
                <a className="menu-link">
                    <Link to="/book/new">New book</Link>
                </a>
            </div>
        </nav>
    )
}

export default Menu
