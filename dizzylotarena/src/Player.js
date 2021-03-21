import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Player = ({roomId, firestore, docRef, playerMail}) => {

    const roomsRef = firestore.collection('rooms');
    const query = roomsRef.where("id", "==", roomId);

    const [roomData] = useCollectionData(query, {idField: roomId});

    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    React.useEffect(() => {
        window.addEventListener('keydown', function(event) {
            if (roomData && roomData[0]) {
                var user = roomData[0].users.filter(function(value) { return value.mail != playerMail})
                // var [x, y] = roomData[0].position;
                // switch(event.key) {
                //     case 'w': y++;
                //         break;
                //     case 's': y--;
                //         break;
                //     case 'a': x--;
                //         break;
                //     case 'd': x++;
                //         break;            
                // }
                // docRef.update({

                // })
                console.log(user);
            } else {
                console.log(roomData);
            }
            return () => {
                window.removeEventListener('keydown', event);
            };
        });
    }, []);
    return (
        <div className="player" style={{top:`${45 + top}vh`, left:`${45 + left}vh`}}> 
            <h3></h3> 
        </div>
    );
}

export default Player;