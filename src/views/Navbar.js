import React, { useState } from 'react';
import SettingsBar from '../components/SettingsBar';
import UserLogin from '../components/UserLogin';


const Navbar = (props) => {
	
	const [userLoginOpen, setUserLoginOpen] = useState(false);

	const _accessUserLogin = () => {
		setUserLoginOpen(true);
	};

	const _closeUserLogin = () => {
		setUserLoginOpen(false);
	}

	return (
		<nav id='App-Navbar' className='bigfont'>
			<section id='App-Navbar-tabs' className='displayflex'>
			{ props.tabs.map((tb, ky) => {
				return ( <div className={'Navbar-tab displayflex' + (tb.active ? ' active' : '')} key={ky}>
					<span className='Navbar-tab-inner displayflex flexcol marginauto' onClick={()=>props.tabClick(ky)}>
						{/* <span className='Navbar-tab-icon displayflex'>{tb.icon}</span> */}
						<span className='Navbar-tab-title bigfont-height'>{tb.title}</span>
					</span>
				</div> )
			}) }
			</section>
			<SettingsBar user={props.user} themeObj={props.themeObj} sendNewTheme={(newTheme)=>props.sendNewTheme(newTheme)} accessUserLoginClick={()=>_accessUserLogin()} />
			{ userLoginOpen && <UserLogin user={props.user} userUpdate={(newUser)=>props.userUpdate(newUser)} closeClick={_closeUserLogin} /> }
		</nav>
	);

}

export default Navbar;