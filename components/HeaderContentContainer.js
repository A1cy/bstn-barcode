import React from "react";

// Header and content container
const HeaderContentContainer = () => {
  return (
    <div className="header-content-container">
      <header>
        <div className="header-container">
          <nav className="navbar navbar-light navbar-expand-lg ">
            {/* off canva on phone view */}{" "}
            {/* <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#navbarOffcanvasLg"
              aria-controls="navbarOffcanvasLg"
            >
              {" "}
              <span className="navbar-toggler-icon" />{" "}
            </button> */}
            
            {/* search */}
            <div className="search">
              <form className="d-flex">
                {" "}
              
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
