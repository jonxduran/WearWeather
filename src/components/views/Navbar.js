import React, { useState } from 'react';

/* import UserLogin from '../../components/UserLogin'; */


const Navbar = (props) => {
	
	/* const [userLoginOpen, setUserLoginOpen] = useState(false);
	const _accessUserLogin = () => {
		setUserLoginOpen(true);
	};
	const _closeUserLogin = () => {
		setUserLoginOpen(false);
	}; 
	appjs themeObj={appState.themeObj} sendNewTheme={(newTheme)=>_setNewTheme(newTheme)} userUpdate={(user)=>_setNewUser(user)} userSettings={appState.userSettings} sendNewSetting={(ky, vl)=>_setNewSetting(ky, vl)} */

	const tabs = [
		{ 'name': 'Weather', 'active': true },
		{ 'name': 'Wear', 'active': false },
		{ 'name': 'Profile', 'active': false }
	];
	const initState = {
		tabs: tabs
	};

	const [navState, setNavState] = useState(initState);

	const setNavTab = (i) => {
		const editState = {...navState};
		editState.tabs.forEach(tab => tab.active=false);
		editState.tabs[i].active = true;
		setNavState(editState);
		props.tabPick(i);
	};


	return (
		<nav id='App-Navbar' className='displayflex positionfixed'>
			<section id='App-Navbar-inner' className='displayflex'>
				{ navState.tabs.map((tab, i) => {
					return <div className={'Navbar-tab displayflex positionrel nonselect pointer' + (tab.active ? ' active' : '')} key={i} onClick={()=>setNavTab(i)}>
						<span className='medfont marginauto'>{tab.name}</span>
					</div>
				}) }
			</section>
		</nav>
	);

};

export default Navbar;