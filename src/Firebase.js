import * as firebase from 'firebase';
const config = {
	apiKey: "AIzaSyCu--ZltoQSc5cVGUxN3P9zSGCO3mGoiGw",
	authDomain: "newreact-7c26e.firebaseapp.com",
	databaseURL: "https://newreact-7c26e.firebaseio.com",
	projectId: "newreact-7c26e",
	storageBucket: "newreact-7c26e.appspot.com",
	messagingSenderId: "230485247599"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('posts/');
export const users = firebase.database().ref('users/');
export const auth = firebase.auth();
export const rootRef = firebase.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();

