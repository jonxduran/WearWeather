import React, { useState } from 'react';
/* import AccountCircleOutlineIcon from 'mdi-react/AccountCircleOutlineIcon'; */
import MapMarkerIcon from 'mdi-react/MapMarkerIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';


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
			<section id='Overflow-section' className={'positionabs flexcol popup popup-shadow' + ((menuOpen) && ' open')}>
				<div className='Overflow-row positionrel'>
					{ Object.keys(props.themeObj).map((thm, i) => {
						return ( <div key={i} className={'theme-switcher positionabs displayflex ' + ((props.themeObj[thm]['active'] === true) ? 'active' : '')} onClick={()=>props.sendNewTheme(thm)}>
							<span className='theme-icon MDI-container'>{props.themeObj[thm]['icon']}</span>
							<div className='theme-title-container displayflex'>
								<span className='theme-title medfont medfont-height marginauto-height'>{props.themeObj[thm]['title']}</span>
							</div>
						</div> )
					}) }
				</div>
			</section>
		</article>
	);

}

export default SettingsBar;