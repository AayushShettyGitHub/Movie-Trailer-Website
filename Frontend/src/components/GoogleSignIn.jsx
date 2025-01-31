import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';

const id = '644051271600-l6lb9gpso1darl1ggvgt4ovckateshik.apps.googleusercontent.com';

const GoogleSignIn = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    const response = await fetch("http://localhost:8082/api/verify/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ googleToken: token }),
    });
  
    const data = await response.json();
    console.log(data);
   
  
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      setIsAuthenticated(true);
      navigate("/main");  
    } else {
      console.error("Login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId={id}>
      <div>
        <h1>Login with Google</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.error("Login failed")}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
