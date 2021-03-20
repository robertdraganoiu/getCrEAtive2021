import React, { useState } from 'react'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import SignOut from './SignOut';
import { auth } from './App'
import { getRank } from './utils';

const UserRoom = () => {

    const name = auth.currentUser.displayName.split(' ', 1);
    const firestore = firebase.firestore();
    const usersRef = firestore.collection('users');
    const query = usersRef.where("mail", "==", auth.currentUser.email);

    var docRef = firestore.collection("users").doc(auth.currentUser.email);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                docRef.set({
                    mail: auth.currentUser.email,
                    totalWins: 0
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    const [userData] = useCollectionData(query, {idField: auth.currentUser.email});

    return (
      <div className='container'>
      <h1>Hello, {name}</h1>
      <h3>Your total wins: {(userData && userData[0] ? userData[0].totalWins : "Loading...")}</h3>
      <SignOut />
      </div>
    );
  };

export default UserRoom;