import React from "react";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css"; // You can update this to your custom CSS

const IndexPage = () => {
  const router = useRouter();

  const handleLoginSubmit = () => {
    // Perform login logic here
    // If login is successful, you can navigate the user to another page
    router.push("/home"); // Navigating to home page after login. Update this to your destination page.
  };

  return (
    <div className={styles.container}>
      {/* You can replace the below with your Header component */}
      {/* <HeaderContentContainer /> */}
      <div className="content-container bstn-login">
        <div className="blurred-box">
          <div className="user-login-box">
            <span className="user-icon" />
            <label>
              Username:
              <input
                placeholder=""
                className="user-name"
                type="text"
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                placeholder=""
                className="user-password"
                type="text"
                required
              />
            </label>
            <br />
            <button className="user-log" onClick={handleLoginSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
      {/* You can replace the below with your Footer component */}
      {/* <Footer /> */}
    </div>
  );
};

export default IndexPage;
