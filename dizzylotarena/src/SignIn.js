import React from 'react'
import { auth, provider } from "./App"

const SignIn = () => {
    return (
      <>
      <button className='btn' onClick={() => auth.signInWithPopup(provider)}>Sign in with Google</button>
      </>
    );
};

export default SignIn;