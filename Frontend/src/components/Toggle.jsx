import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Toggle = ({ setIsAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(true);

  const switchMode = () => {
    setIsSignUp((val) => !val);
  };

  return (
    <>
      {isSignUp ? (
        <SignUp switchMode={switchMode} />
      ) : (
        <SignIn switchMode={switchMode} setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default Toggle;
