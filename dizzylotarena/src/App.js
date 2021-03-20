import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import React from 'react';
import UserRoom from './UserRoom';
import SignIn from './SignIn';

firebase.initializeApp({
  apiKey: "AIzaSyAL5dV-Vjnt9eMVqGHTxg-SLsmseaACRo8",
  authDomain: "dizzylotarena-8e56c.firebaseapp.com",
  projectId: "dizzylotarena-8e56c",
  storageBucket: "dizzylotarena-8e56c.appspot.com",
  messagingSenderId: "912379030615",
  appId: "1:912379030615:web:2bb33038268715ee95c712"
})

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <main>
      <header>
        <title>DizzyLot Arena</title>
      </header>

      <section>
        {user ? <UserRoom auth={auth} /> : <SignIn auth={auth} />}
      </section>
    </main>
  );
}

export default App;
