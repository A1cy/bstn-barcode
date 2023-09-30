import React from 'react';
 

const LoginPage = ({ onLogin }) => {
   const handleLoginSubmit = () => {
     // Perform login logic here, then call onLogin
     onLogin();
   };
  return (
   <div>
  {/* <HeaderContentContainer /> */}
<div className="content-container bstn-login">
  <div className="blurred-box">
    <div className="user-login-box">
      <span className="user-icon" />
      <label>
      Username:
      <input placeholder="" className="user-name" type="text" required/>
     </label>
      <br />
      <label>
      Password:
      <input placeholder="" className="user-password" type="text" required/>
      </label>

      <br />
      <button className="user-log" onClick={handleLoginSubmit}>Login</button>
    </div>
  </div>
</div>




 
    {/* <form>
      <h1>Login</h1>
      <label>
        Username:
        <input type="text" name="username" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      
      <button onClick={handleLoginSubmit}>Login</button>
    </form>
      <Footer /> */}
      </div>

  );
};

export default LoginPage;
