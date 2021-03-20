import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const getRank = (totalWins) => {
    if (totalWins < 1) {
        return "Total Noob";
    } else if (totalWins < 5) {
        return "Noob";
    } else if (totalWins < 10) {
        return "Garbage";
    } else if (totalWins < 20) {
        return "Better Garbage";
    } else {
        return "Decent";
    }
}