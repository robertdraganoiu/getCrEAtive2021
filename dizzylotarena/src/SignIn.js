import React from 'react'

import { auth, provider } from "./App"

const SignIn = () => {

    const signIn = () => {
        auth.signInWithPopup(provider);
    }

    return (
    <div className='container'>
      <button className='btn' onClick={() => signIn()}>Sign in with Google</button>
    </div>
    );
};

export default SignIn;