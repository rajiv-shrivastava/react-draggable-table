import React from 'react'
import './assets/css/style.css';


const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">Todo Heading</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <i className="fa fa-user"></i>
        </form>
    </div>
  </nav>
)

export default Header;