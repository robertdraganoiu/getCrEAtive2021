import React, { useState, useEffect } from 'react'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth } from './App'
import { getRank, generateId } from './utils';

const GameRoom = ({roomId, firestore, exitRoom}) => {

    const roomsRef = firestore.collection('rooms');
    const query = roomsRef.where("id", "==", roomId);

    const [roomData] = useCollectionData(query, {idField: roomId});

    const docRef = firestore.collection("rooms").doc(roomId);
    const startGame = () => {
        docRef.update({
            gameStarted: true
        }).then(() => {
            console.log("Game started successfully")
        }).catch((error) => {
            console.error("Error starting game: ", error);
        });
    }

    const exitGame = () => {
        docRef.update({
            gameStarted: false
        });
    }

    return (
        (!roomData || !roomData[0] || !roomData[0].gameStarted) ?
        <div>
            <h1>Room #{roomId}</h1>
            <h2>Users in room:</h2>
            <div>
                {roomData && roomData[0]? 
                <ul>
                    {roomData[0].users.map((user) => {
                        return <h3 key={user.mail}>
                            {user.mail.split('@', 1) + ' --- Total wins: ' + user.totalWins + ' --- Rank: ' + getRank(user.totalWins)}
                        </h3>
                    })}
                </ul>
                :
                <h3>Loading...</h3>
            }
            </div>
            <button className='btn' onClick={() => startGame()}>Start Game</button>
            <button className='btn' onClick={() => exitRoom()}>Exit Room</button>
        </div>
        :
        <div>
            <h1>TODO game arena</h1>
            <button className='btn' onClick={() => exitGame()}>Exit Game</button>
        </div>
    );

}

export default GameRoom;