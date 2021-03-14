import React, { useState } from 'react';
import SettingsBar from '../../components/SettingsBar';
import UserLogin from '../../components/UserLogin';


const Navbar = (props) => {
	
	const [userLoginOpen, setUserLoginOpen] = useState(false);

	const _accessUserLogin = () => {
		/* document.querySelector('html').classList.add('locked'); */
		setUserLoginOpen(true);
	};

	const _closeUserLogin = () => {
		/* document.querySelector('html').classList.remove('locked'); */
		setUserLoginOpen(false);
	};

	return (
		<nav id='App-Navbar' className={'bigfont ' + props.color}>
			<SettingsBar user={props.user} themeObj={props.themeObj} sendNewTheme={(newTheme)=>props.sendNewTheme(newTheme)} accessUserLoginClick={()=>_accessUserLogin()} userSettings={props.userSettings} sendNewSetting={(ky, vl)=>props.sendNewSetting(ky, vl)} refreshWeather={props.refreshWeather} />
			{ userLoginOpen && <UserLogin user={props.user} userUpdate={(newUser)=>props.userUpdate(newUser)} closeClick={_closeUserLogin} /> }
		</nav>
	);

}

export default Navbar;