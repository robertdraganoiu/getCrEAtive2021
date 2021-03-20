import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const getRank = (totalWins) => {
    if (totalWins < 1) {
        return "Grandmaster";
    } else if (totalWins < 5) {
        return "Master";
    } else if (totalWins < 10) {
        return "Good Player";
    } else if (totalWins < 20) {
        return "Decent";
    } else {
        return "Garbage";
    }
}

export const generateId = (length) => {
    var result = "";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}