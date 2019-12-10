import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';


/* Check for cookie here */
/* let initUserId = '00000001'; */
let initUser = null;


const gpsAvailable = ("geolocation" in navigator) ? true : false;

let themeCache = localStorage.getItem("themeCache") || 'light-theme';


ReactDOM.render(
	<App theme={themeCache} user={initUser} gpsAvailable={gpsAvailable} />, 
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
