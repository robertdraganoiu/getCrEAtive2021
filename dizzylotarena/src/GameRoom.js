import React, { useState, useEffect } from 'react'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth } from './App'

const GameRoom = ({roomId, firestore, username, usermail}) => {

    const roomsRef = firestore.collection('rooms');
    const query = roomsRef.where("id", "==", roomId);

    const [roomData] = useCollectionData(query, {idField: roomId});

    return (
        <div>
            <h1>Room #{roomId}</h1>
            <h2>Users in room:</h2>
            <div>
                {roomData && roomData[0]? 
                <ul>
                    {roomData[0].users.map((user) => {
                        return <h3 key={user}>
                            {user}
                        </h3>
                    })}
                </ul>
                :
                <h3>Loading...</h3>
            }
            </div>
            
        </div>
    );

}

export default GameRoom;