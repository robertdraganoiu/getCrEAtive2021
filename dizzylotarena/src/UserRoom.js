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
                .then(() => {
                    console.log("User successfully written!");
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

    const [roomId, setRoomId] = useState("");

    const createRoom = () => {
        const roomId = generateId(roomIdLen);
        joinRoom(roomId);
    };

    const joinRoom = (roomId) => {
        const roomRef = firestore.collection("rooms").doc(roomId);
        roomRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Room data:", doc.data());
            } else {
                roomRef.set({
                    id: roomId
                })
                .then(() => {
                    console.log("Room successfully created!");
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
            }).then(() => {
                console.log("Player in room status successfully updated");
            }).catch((error) => {
                console.log("Error updating player document:", error);
            });
        })
        .catch((error) => {
            console.log("Error getting room document:", error);
        });
    }

    const exitRoom = () => {
        docRef.update({
            inRoom: false,
            roomId: "" 
        }).then(() => {
            console.log("Player in room status successfully updated");
        }).catch((error) => {
            console.log("Error updating player document:", error);
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
                    <button className='btn' onClick={() => joinRoom(userData[0].roomId)}>Join Room</button>
                    <SignOut />
                </div>
                :
                <div>
                    <GameRoom roomId={userData[0].roomId} firestore={firestore} username={auth.currentUser.displayName} book={auth.currentUser.email}/>
                    <button className='btn' onClick={() => exitRoom()}>Exit Room</button>
                </div>
            }
        </div>
    );
      
  };

export default UserRoom;