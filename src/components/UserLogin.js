import React, { useEffect } from 'react';
import firebase, { firebaseUI, firebaseUIConfig } from '../data/status/Firebase';


const UserLogin = (props) => {
	
	const firebaseUIRef = React.createRef();

	const firebaseUIStarter = (elem) => {
		console.log('firebaseUIStarter ', elem);
		firebaseUI.start(elem, firebaseUIConfig);
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				props.userUpdate(user);
			} else {
				console.log('no user');
			};
		});
	}

	useEffect(() => {
		firebaseUIStarter(firebaseUIRef.current);
	}, 
	// eslint-disable-next-line
	[]);

	return (
		<section id='UserLogin-section' className={'positionabs displayflex'}>
			<article id='UserLogin-card' className='displayflex flexcol marginauto'>
				<section id='FirebaseUI-container' className='displayflex' ref={firebaseUIRef}></section>
				<div id='UserLogin-close-container' className='displayflex'>
					<button id='UserLogin-close' className='solid-button red-button smallerfont' onClick={props.closeClick}>Cancel</button>
				</div>
			</article>
		</section>
	);
}

export default UserLogin;