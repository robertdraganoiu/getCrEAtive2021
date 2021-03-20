import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import React from 'react';

firebase.initializeApp({
  apiKey: "AIzaSyAL5dV-Vjnt9eMVqGHTxg-SLsmseaACRo8",
  authDomain: "dizzylotarena-8e56c.firebaseapp.com",
  projectId: "dizzylotarena-8e56c",
  storageBucket: "dizzylotarena-8e56c.appspot.com",
  messagingSenderId: "912379030615",
  appId: "1:912379030615:web:2bb33038268715ee95c712"
})

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <main>
      <header>

      </header>

      <section>
        {user ? <UserRoom auth={auth} /> : <SignIn auth={auth} />}
      </section>
    </main>
  );
}

const SignIn = () => {
  return (
    <>
    <button className='btn' onClick={() => auth.signInWithPopup(provider)}>Sign in with Google</button>
    </>
  );
};

const UserRoom = () => {
  return (
    <>
    <h1>User info TODO</h1>
    <SignOut />
    </>
  );
};

const SignOut = () => {

  return auth.currentUser && (
    <>
    <button className='btn' onClick={() => auth.signOut()} >Sign out</button>
    </>
  );
};

export default App;
