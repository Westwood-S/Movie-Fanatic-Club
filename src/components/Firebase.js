import firebase from 'firebase';

const fire = firebase.initializeApp({
    apiKey: "AIzaSyBAiPt_zuhTaKnFil-h6G7-OghzLB0B4h4",
    authDomain: "movie-fanatic-club.firebaseapp.com",
    databaseURL: "https://movie-fanatic-club.firebaseio.com",
    projectId: "movie-fanatic-club",
    storageBucket: "movie-fanatic-club.appspot.com",
    messagingSenderId: "574114777977",
    appId: "1:574114777977:web:d861d1649cbd06e45b3da8",
    measurementId: "G-D27DHGSFS4"
});

export const auth = firebase.auth();
export const database = firebase.database();
export default fire;