import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import { getSettings } from './status/SettingsHandler';
import './index.css';
import firebase from './status/Firebase';
//import * as serviceWorker from './serviceWorker';


/* Check for cookie here */
/* let initUserId = '00000001'; */
/* console.log(process.env); */
let user = null;
/* let myFirestore = null; */
let myFireDatabase = null;
firebase.auth().onAuthStateChanged(function(userCheck) {
	if (userCheck) {
		user = userCheck;
		/* myFirestore = firebase.firestore(); */
		myFireDatabase = firebase.database().ref(`/users/${user.uid}`);
		/* console.log(myFirestore.ref()); */
	} else {
		console.log('no userCheck found');
	}

	/* let initSettings = JSON.parse(localStorage.getItem("userSettings")) || getSettings();
	try {
		localStorage.setItem('userSettings', JSON.stringify(initSettings));
	} catch(err) {
		console.log('Writing to local Storage error for userSettings: ', initSettings);
	}
	userSettings={initSettings} */

	const gpsAvailable = ("geolocation" in navigator) ? true : false;

	ReactDOM.render(
		<App user={user} db={myFireDatabase} gpsAvailable={gpsAvailable} />, 
		document.getElementById('root')
	);

});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
