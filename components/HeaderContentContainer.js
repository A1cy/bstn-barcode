import React from "react";

// Header and content container
const HeaderContentContainer = () => {
  return (
    <div className="header-content-container">
      <header>
        <div className="header-container">
          <nav className="navbar navbar-light navbar-expand-lg ">
            {/* off canva on phone view */}{" "}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#navbarOffcanvasLg"
              aria-controls="navbarOffcanvasLg"
            >
              {" "}
              <span className="navbar-toggler-icon" />{" "}
            </button>
            <div
              className="offcanvas offcanvas-start"
              tabIndex={-1}
              id="navbarOffcanvasLg"
              aria-labelledby="navbarOffcanvasLgLabel"
            >
              <div className="offcanvas-header">
                {" "}
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />{" "}
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-start flex-grow-1 pe-0">
                  <li className="nav-item flag">
                    {" "}
                    <a
                      className="nav-link"
                      id="Saudi-Flag"
                      aria-current="page"
                      href="#"
                    >
                      <img src="pics\Saudi-Flag.png" alt="country flag" />
                    </a>{" "}
                  </li>
                  <li className="nav-item padding-lang">
                    {" "}
                    <button className="nav-link lang" id="arabic">
                      العربيه
                    </button>{" "}
                    <button
                      className="nav-link lang"
                      id="english"
                      onclick="switchJS()"
                    >
                      English
                    </button>{" "}
                  </li>
                  <hr className="offcanvas-devider" />
                  <li className="nav-item">
                    {" "}
                    <a
                      className="nav-link"
                      id="shopping-cart-header"
                      aria-current="page"
                      href="#"
                    >
                      <img src="pics\shopping-cart.png" alt="List" />
                    </a>{" "}
                  </li>{" "}
                  {/* some footer emlment will show on phone view */}
                  <div className="footer-in-header">
                    <li className="nav-item">
                      {" "}
                      <a
                        className="nav-link"
                        id="list-icon-header"
                        aria-current="page"
                        href="#"
                      >
                        <img src="pics\shopping-cart.png" alt="list" />
                        <span id="list-header-text">LIST</span>
                      </a>{" "}
                    </li>
                    <hr className="offcanvas-devider" />
                    <li className="nav-item">
                      {" "}
                      <a
                        className="nav-link"
                        id="scan-icon-header"
                        aria-current="page"
                        href="#"
                      >
                        <img src="pics\scan-icon-blue.png" alt="scan" />
                        <span id="scan-header-text">SCAN A NEW PRODUCT</span>
                      </a>{" "}
                    </li>
                    <hr className="offcanvas-devider" />
                    <li className="nav-item">
                      {" "}
                      <a
                        className="nav-link"
                        id="home-icon-header"
                        aria-current="page"
                        href="#"
                      >
                        <img src="pics\home-icon-blue.png" alt="home" />
                        <span id="home-header-text">HOME</span>
                      </a>{" "}
                    </li>
                  </div>
                </ul>
              </div>
            </div>{" "}
            {/* search */}
            <div className="search">
              <form className="d-flex">
                {" "}
                <input
                  className="form-control me-2"
                  id="searchplaceholder"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />{" "}
                <button className="btn btn-outline-success" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>{" "}
              </form>
            </div>{" "}
            {/* logo */}{" "}
            <a className="navbar-brand" href="#">
              <img
                src="pics\BuildStation-logo.png"
                className="logo"
                alt="build-station logo"
              />
            </a>
          </nav>
          <hr className="divider-bottom" />
        </div>
      </header>
    </div>
  );
};

export default HeaderContentContainer;
