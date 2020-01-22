import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

console.log(process.env.FIREBASE_APIKEY);
const firebaseConfig = {
	apiKey: 'AIzaSyD8LP5CySz_KrrgaLiO3-OM-EUpYhFhXQA',
	authDomain: "wearweather-jxd.firebaseapp.com",
	databaseURL: "https://wearweather-jxd.firebaseio.com",
	projectId: "wearweather-jxd",
	storageBucket: "wearweather-jxd.appspot.com",
	messagingSenderId: "143283944775",
	appId: "1:143283944775:web:a84402617d08b0f05ee062",
	measurementId: "G-PBMCYQXTEG"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;



export const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());

export const firebaseUIConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			return true;
		},
		uiShown: function() {
			// The widget is rendered.
			// Hide the loader.
			//document.getElementById('loader').style.display = 'none';
		}
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	signInSuccessUrl: 'localhost:3000',
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: '<your-tos-url>',
	// Privacy policy url.
	privacyPolicyUrl: '<your-privacy-policy-url>'
};