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

    // create user document if it does not exits, load it otherwise
    useEffect(() => {docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("User data:", doc.data());
            } else {
                docRef.set({
                    mail: auth.currentUser.email,
                    totalWins: 0,
                    inRoom: false,
                    roomId: "",
                    position: [0, 0]
                })
                .catch((error) => {
                    console.error("Error writing user document: ", error);
                });
            }
        }).catch((error) => {
            console.log("Error getting user document:", error);
        });
    }, []);

    // hook for continuous updating of user data
    const [userData] = useCollectionData(query, {idField: auth.currentUser.email});

    // create/join/exit functions with their room updates
    const createRoom = () => {
        const roomId = generateId(roomIdLen);
        joinRoom(roomId, true);
    };

    const joinRoom = (roomId, isFromCreate) => {

        const roomRef = firestore.collection("rooms").doc(roomId);
        roomRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Room data:", doc.data().users);
                const newUsers = doc.data().users;
                newUsers.push(userData[0]);
                console.log(newUsers);
                roomRef.update({
                    users: newUsers
                })
            } else {
                // error if from join
                if (!isFromCreate) {
                    alert("Room does not exist");
                    throw new Error("Room does not exist");
                }
                
                roomRef.set({
                    id: roomId,
                    gameStarted: false,
                    controls: "wsad",
                    winScore: 3,
                    difficulty: "Easy",
                    users: [userData[0]]
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
                var newUsers = doc.data().users;
                newUsers = newUsers.filter(function(value) { return value.mail != auth.currentUser.email});
                if (newUsers.length > 0) {
                    roomRef.update({
                        users: newUsers
                    })
                } else {
                    roomRef.delete();
                }
            })
        }).catch((error) => {
            console.log("Error updating player or room document:", error);
        });
    }

    // room input text box hook
    const [joinRoomInput, setJoinRoomInput] = useState('')

    return (
        <div className='container'>
            {
                !(userData && userData[0] && userData[0].inRoom) ? 
                <div>
                    <h1>Hello, {name}</h1>
                    <h3>Your total wins: {(userData && userData[0] ? userData[0].totalWins : "Loading...")}</h3>
                    <h3>Your rank: {(userData && userData[0] ? getRank(userData[0].totalWins) : "Loading...")}</h3>
                    <div>
                        <button className='btn' onClick={() => createRoom()}>Create Room</button>
                    </div>
                    <div>
                        <input className='btn' value={joinRoomInput} onInput={e => setJoinRoomInput(e.target.value)}/>
                        <button className='btn' onClick={() => joinRoom(joinRoomInput.toUpperCase(), false)}>Join Room</button>
                    </div>
                    <SignOut />
                </div>
                :
                <div>
                    <GameRoom roomId={userData[0].roomId} firestore={firestore} exitRoom={() => exitRoom(userData[0].roomId)} playerMail={auth.currentUser.email}/>
                </div>
            }
        </div>
    );
      
  };

export default UserRoom;