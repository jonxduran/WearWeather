import React, { useState, useRef } from 'react';
import MapMarkerIcon from 'mdi-react/MapMarkerIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';


const SettingsBar = (props) => {

	/* console.log('SettingsBar props: ', props); */
	const [menuOpen, setMenu] = useState(false);
	const themeRef = useRef();

	const _themeClick = function(thm) {
		props.sendNewTheme(thm);
		themeRef.current.checked = false;
	};

	return (
		<article id='SettingsBar' className='positionrel marginauto'>
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
				<div id='Overflow-screen' className='positionabs' onClick={()=>setMenu(false)}></div>
				<article id='Overflow-popup' className='displayflex flexcol marginauto popup popup-shadow'>
					<div className='Overflow-row header-row displayflex positionrel'>
						<div className="Overflow-row-title displayflex">
						{ (props.user === null) ? 
							<span className='medfont medfont-height marginauto-height' onClick={props.accessUserLoginClick}>Log In</span>
							: <div className='bigfont bigfont-height marginauto-height'>{props.user.displayName}'s Settings</div>
						}
						</div>
					</div>
					<div className='Overflow-row displayflex positionrel'>
						<div className='Overflow-row-title displayflex'>
							<span className='medfont medfont-height marginauto-height'>Theme</span>
						</div>
						<div className='Overflow-row-options displayflex'>
							<div className='dropdown medfont'>
								<input id='DropdownThemes' className='dropdown-input' type='checkbox' ref={themeRef}></input>
								{ Object.keys(props.themeObj).filter(thm => props.themeObj[thm]['active']===true).map((thm, i) => { 
									return (<label htmlFor='DropdownThemes' className='dropdown-label' key={i}>
										<div className='dropdown-icon'>
											<span className='theme-icon'>{props.themeObj[thm]['icon']}</span>
										</div>
										<div className='dropdown-title'>
											<span className='medfont medfont-height marginauto-height'>{props.themeObj[thm]['title']}</span>
										</div>
									</label>) 
								}) }
								<ul className='dropdown-ul'>
									{ Object.keys(props.themeObj).filter(thm => props.themeObj[thm]['active']===false).map((thm, i) => {
										return <li className='dropdown-li displayflex' onClick={()=>_themeClick(props.themeObj[thm]['key'])} key={i}>
											<div className='dropdown-icon'>
												<span className='theme-icon'>{props.themeObj[thm]['icon']}</span>
											</div>
											<div className='dropdown-title'>
												<span className='medfont medfont-height marginauto-height'>{props.themeObj[thm]['title']}</span>
											</div>
										</li>
									}) }
								</ul>
							</div>
						</div>
					</div>
					
				</article>
			</section>
		</article>
	);

}

export default SettingsBar;