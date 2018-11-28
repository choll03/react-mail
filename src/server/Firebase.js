var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");


const config = {
	apiKey: "AIzaSyCu--ZltoQSc5cVGUxN3P9zSGCO3mGoiGw",
	authDomain: "newreact-7c26e.firebaseapp.com",
	databaseURL: "https://newreact-7c26e.firebaseio.com",
	projectId: "newreact-7c26e",
	storageBucket: "newreact-7c26e.appspot.com",
	messagingSenderId: "230485247599"
};

firebase.initializeApp(config);

module.exports = {
	rootRef: firebase.database(),
};