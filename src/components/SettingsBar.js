import React, { useState } from 'react';
/* import AccountCircleOutlineIcon from 'mdi-react/AccountCircleOutlineIcon'; */
import MapMarkerIcon from 'mdi-react/MapMarkerIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';


const SettingsBar = (props) => {

	/* console.log('SettingsBar props: ', props); */
	const [menuOpen, setMenu] = useState(false);

	return (
		<article id='SettingsBar' className='positionrel'>
			<section id='SettingsButtons-section' className='displayflex'>
			<div id='Settings-location-icon' className='Settings-icon displayflex positionrel MDI-container'>
					<MapMarkerIcon />
				</div>
				<div id='Settings-refresh-icon' className='Settings-icon displayflex positionrel MDI-container'>
					<RefreshIcon />
				</div>
				<div id='Settings-overflow-icon' className={'Settings-icon displayflex flexcol positionrel' + ((menuOpen) && ' open')} onClick={()=>setMenu(!menuOpen)}>
					<span className='Settings-overflow-dot'></span>
					<span className='Settings-overflow-line-container displayflex marginauto positionrel'>
						<span className='Settings-overflow-line positionabs'></span>
						<span className='Settings-overflow-line positionabs'></span>
					</span>
					<span className='Settings-overflow-dot'></span>
				</div>
			</section>
			<section id='Overflow-section' className={'positionabs' + ((menuOpen) ? ' open' :'')}>
				<article id='Overflow-popup' className='displayflex flexcol positionabs popup popup-shadow'>
					<div className='Overflow-row displayflex positionrel'>
						{ Object.keys(props.themeObj).map((thm, i) => {
							return ( <div key={i} className={'theme-switcher positionabs displayflex ' + ((props.themeObj[thm]['active'] === true) ? 'active' : '')} onClick={()=>props.sendNewTheme(thm)}>
								<span className='Overflow-row-icon theme-icon MDI-container'>{props.themeObj[thm]['icon']}</span>
								<div className='Overflow-row-title displayflex'>
									<span className='medfont medfont-height marginauto-height'>{props.themeObj[thm]['title']} Theme</span>
								</div>
							</div> )
						}) }
					</div>
					<div className='Overflow-row displayflex positionrel'>
						<div className='Overflow-row-icon MDI-container'><AccountOutlineIcon /></div>
						<div className="Overflow-row-title displayflex">
						{ (props.user === null) ? 
							<span className='medfont medfont-height marginauto-height' onClick={props.accessUserLoginClick}>Log In</span>
							: <div className='medfont medfont-height marginauto-height'>{props.user.displayName}'s Settings</div>
						}
						</div>
					</div>
				</article>
			</section>
			<section id='testsection' className='positionabs'>test</section>
		</article>
	);

}

export default SettingsBar;