import React, { useState, useEffect } from 'react'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth } from './App'

const GameRoom = ({roomId, firestore, username, usermail}) => {

    const usersRef = firestore.collection('rooms');
    const query = usersRef.where("roomId", "==", roomId);

    const [roomData] = useCollectionData(query, {idField: roomId});

    return (
        <div>
            <h1>Room #{roomId}</h1>
        </div>
    );

}

export default GameRoom;