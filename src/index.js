import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import { getSettings } from './status/SettingsHandler';
import './index.css';
import firebase from './data/status/Firebase';
//import * as serviceWorker from './serviceWorker';


/* Check for cookie here */
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

	/* const renderReact = function(loc) {
		ReactDOM.render(
			<App user={user} db={myFireDatabase} myLocation={loc} />, 
			document.getElementById('root')
		);
	}; */

	const renderReact = function(loc) {
		ReactDOM.render(
			<App user={user} db={myFireDatabase} hasLocAccess={loc} />, 
			document.getElementById('root')
		);
	};

	/* const getMyIPLocation = function() {
		console.log('getMyIPLocation');
	}; */

	/* const getMyDeviceLocation = function(clearPrompt) {
		navigator.geolocation.getCurrentPosition((pos)=>{
			const crd = pos.coords;
			if (clearPrompt) { document.getElementById('LocationAsker').classList.add('displaynone'); };
			renderReact(crd);
		},(err)=>{
			console.error(err);
			if (clearPrompt) { document.getElementById('LocationAsker').classList.add('displaynone'); };
			getMyIPLocation();
		});
	}; */
	
	if ("geolocation" in navigator) {
		navigator.permissions.query({name:'geolocation'}).then(function(result) {
			if (result.state === 'granted') {
				/* getMyDeviceLocation(); */
				renderReact(true);
			} else if (result.state === 'prompt') {
				alert('To use WearWeather, please enable location services when prompted');
				/* document.getElementById('LocationAsker').classList.remove('displaynone');
				getMyDeviceLocation(true); */
				renderReact(true);
			} else {
				alert('Please undo denial of location permission in order to use WearWeather');
				/* getMyDeviceLocation(); */
				renderReact(false);
			};
		});
	} else {
		/* getMyIPLocation(); */
		renderReact(false);
	};
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
