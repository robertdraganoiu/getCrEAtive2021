import React, { useState, useEffect } from 'react'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import SignOut from './SignOut';
import GameRoom from './GameRoom';
import { auth } from './App';
import { getRank, generateId } from './utils';

const roomIdLen = 6;

const UserRoom = () => {

    const name = auth.currentUser.displayName.split(' ', 1);
    const firestore = firebase.firestore();
    const usersRef = firestore.collection('users');
    const query = usersRef.where("mail", "==", auth.currentUser.email);

    const docRef = firestore.collection("users").doc(auth.currentUser.email);
    useEffect(() => {docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("User data:", doc.data());
            } else {
                docRef.set({
                    mail: auth.currentUser.email,
                    totalWins: 0,
                    inRoom: false,
                    roomId: ""
                })
                .catch((error) => {
                    console.error("Error writing user document: ", error);
                });
            }
        }).catch((error) => {
            console.log("Error getting user document:", error);
        });
    }, []);

    const [userData] = useCollectionData(query, {idField: auth.currentUser.email});

    const createRoom = () => {
        const roomId = generateId(roomIdLen);
        joinRoom(roomId);
    };

    const joinRoom = (roomId) => {
        const roomRef = firestore.collection("rooms").doc(roomId);
        roomRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Room data:", doc.data().users);
                const newUsers = doc.data().users;
                newUsers.push(auth.currentUser.email);
                console.log(newUsers);
                roomRef.update({
                    users: newUsers
                })
            } else {
                roomRef.set({
                    id: roomId,
                    users: [auth.currentUser.email]
                })
                .catch((error) => {
                    console.error("Error creating room document: ", error);
                });
            }

            return roomId;
        })
        .then((roomId) => {
            docRef.update({
                inRoom: true,
                roomId: roomId 
            }).catch((error) => {
                console.log("Error updating player document:", error);
            });
        })
        .catch((error) => {
            console.log("Error getting room document:", error);
        });
    }

    const exitRoom = (roomId) => {
        docRef.update({
            inRoom: false,
            roomId: "" 
        }).then(() => {
            const roomRef = firestore.collection("rooms").doc(roomId);
            roomRef.get().then((doc) => {
                var newUsers = doc.data().users
                newUsers = newUsers.filter(function(value) { return value != auth.currentUser.email});
                roomRef.update({
                    users: newUsers
                })
            })
        }).catch((error) => {
            console.log("Error updating player or room document:", error);
        });
    }

    return (
        <div className='container'>
            {
                !(userData && userData[0] && userData[0].inRoom) ? 
                <div>
                    <h1>Hello, {name}</h1>
                    <h3>Your total wins: {(userData && userData[0] ? userData[0].totalWins : "Loading...")}</h3>
                    <h3>Your rank: {(userData && userData[0] ? getRank(userData[0].totalWins) : "Loading...")}</h3>
                    <button className='btn' onClick={() => createRoom()}>Create Room</button>
                    <button className='btn' onClick={() => joinRoom("GDREOJ")}>Join Room</button>
                    <SignOut />
                </div>
                :
                <div>
                    <GameRoom roomId={userData[0].roomId} firestore={firestore} username={auth.currentUser.displayName} book={auth.currentUser.email}/>
                    <button className='btn' onClick={() => exitRoom(userData[0].roomId)}>Exit Room</button>
                </div>
            }
        </div>
    );
      
  };

export default UserRoom;