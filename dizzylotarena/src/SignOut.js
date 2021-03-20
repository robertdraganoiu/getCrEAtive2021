import React from 'react'
import { auth } from './App'

const SignOut = () => {
    return auth.currentUser && (
      <>
      <button className='btn' onClick={() => auth.signOut()} >Sign out</button>
      </>
    );
};

export default SignOut;