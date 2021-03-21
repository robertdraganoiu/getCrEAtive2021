import React, { useState, useEffect } from 'react'
import Select from 'react-select';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { getRank, generateId } from './utils';
import ArenaContainer from './ArenaContainer'
import Player from './Player'

import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './App';

const GameRoom = ({roomId, firestore, exitRoom, playerMail}) => {

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

    const difficultyOptions = [
        { label: "Easy", value: "Easy" },
        { label: "Medium", value: "Medium" },
        { label: "Hard", value: "Hard" }
    ];

    const maxScoreOptions = [
        { label: "3", value: 3 },
        { label: "5", value: 5 },
        { label: "10", value: 10 }
    ];

    const setDifficulty = (diff) => {
        docRef.update({
            difficulty: diff
        }).then(() => {
            console.log("Diff set")
        }).catch((error) => {
            console.error("Error setting diff: ", error);
        });
    };

    const setMaxScore = (score) => {
        docRef.update({
            winScore: score
        }).then(() => {
            console.log("Score set")
        }).catch((error) => {
            console.error("Error setting score: ", error);
        });
    };

    // move current player
    useEffect(() => {
        window.addEventListener('keydown', function(event) {
            if (roomData && roomData[0]) {
                var users = roomData[0].users;
                var newUsers = users.filter(function(user) { return user.mail == auth.currentUser.email})
                var user = newUsers[0];
                var [x, y] = user.position;
                switch(event.key) {
                    case roomData[0].controls[0]: y--;
                        break;
                    case roomData[0].controls[1]: y++;
                        break;
                    case roomData[0].controls[2]: x--;
                        break;
                    case roomData[0].controls[3]: x++;
                        break;            
                }
                for (let i = 0; i < users.length; ++i) {
                    if (user.mail == users[i].mail) {
                        users[i].position = [x, y];
                    }
                }
                docRef.update({
                    users:users
                })  
                console.log("room data in if:");
                console.log(users);
            } else {
                console.log("room data outside if:" );
                console.log(roomData);
            }
            return () => {
                window.removeEventListener('keydown', event);
            };
        });
    }, [roomData]);

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
            <div className="container">
                <h1>Game Settings</h1>
                <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h3>{roomData && roomData[0] ? ("Difficulty: " + roomData[0].difficulty) : "Loading"}</h3>
                    <Select options={difficultyOptions} onChange={e => {setDifficulty(e.value); this.setValue(null)}} />
                    <h3>{roomData && roomData[0] ? ("Win score: " + roomData[0].winScore) : "Loading"}</h3>
                    <Select options={maxScoreOptions} onChange={e => {setMaxScore(e.value); this.setValue(null)}} />
                </div>
                <div className="col-md-4"></div>
                </div>
                </div>
                <button className='btn' onClick={() => startGame()}>Start Game</button>
            </div>
            
            <div>
                <button className='btn' onClick={() => exitRoom()}>Exit Room</button>
            </div>
        </div>
        :
        <div className='container'>
            <ArenaContainer rows={15} columns={15}/>
            <ul>
                {roomData[0].users.map((user) => {
                    return <div className="player" key={user.mail} style={{top:`${45 + user.position[1] * 6}vh`, left:`${45 + user.position[0] * 6}vh`}}> 
                    </div>
                })}
            </ul>
            
            <button className='btn' onClick={() => exitGame()}>Exit Game</button>
        </div>
    );

}

export default GameRoom;