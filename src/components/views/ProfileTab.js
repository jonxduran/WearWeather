import React, { useRef } from 'react';
import firebase from '../../data/status/Firebase';


const ProfileTab = (props) => {
	console.log('ProfileTab props: ', props);

	let unitObj = [
		{ unit: "f", active: false },
		{ unit: "c", active: false }
	];
	unitObj.forEach(uo => {
		if (uo.unit === props.userSettings.scale) {
			uo.active = true
		};
	});
	let pronounObj = [
		{ pronoun: "he", active: false },
		{ pronoun: "she", active: false },
		{ pronoun: "they", active: false }
	];
	pronounObj.forEach(po => {
		if (po.pronoun === props.userSettings.pronoun) {
			po.active = true;
		};
	});
	const themeRef = useRef();
	const unitRef = useRef();
	const pronounRef = useRef();

	const _themeClick = function(thm) {
		props.sendNewTheme(thm);
		themeRef.current.checked = false;
	};

	const _unitClick = function(unt) {
		props.sendNewSetting('scale', unt);
		unitRef.current.checked = false;
	};

	const _pronounClick = function(pro) {
		props.sendNewSetting('pronoun', pro);
		pronounRef.current.checked = false;
	};

	const _signout = function() {
		setTimeout(function () {
			window.location.reload(false);
		}, 3000);
		firebase.auth().signOut();
	};

	return (
		<section id='ProfileTab' className='main-tab displayflex flexcol positionrel'>
			
			<article id='ProfileTab-user' className='card fluent-card card-shadow displayflex flexcol'>
				<h3 className='Overflow-row header-row displayflex positionrel'>
					<div className="Overflow-row-title displayflex">
						{ (props.user !== null) ? <div className='biggerfont bold4 marginauto-height'>{props.user.displayName}</div>
							: <div className='biggerfont biggerfont-height bold4 marginauto-height'>Missingno</div> }
					</div>
				</h3>
				<p>Description here</p>
			</article>

			<article id='ProfileTab-settings' className='card fluent-card card-shadow displayflex flexcol'>
				<h3 className='Overflow-row header-row displayflex positionrel'>
					<div className="Overflow-row-title displayflex">
						<div className='biggerfont bold4 marginauto-height'>Settings</div>
					</div>
				</h3>
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

				<div className='Overflow-row displayflex positionrel'>
					<div className='Overflow-row-title displayflex'>
						<span className='medfont medfont-height marginauto-height'>Unit</span>
					</div>
					<div className='Overflow-row-options displayflex'>
						<div className='dropdown medfont'>
							<input id='DropdownUnits' className='dropdown-input' type='checkbox' ref={unitRef}></input>
							{ unitObj.filter(uo => uo.active===true).map((uo, i) => {
								return (<label htmlFor='DropdownUnits' className='dropdown-label' key={i}>
									<div className='dropdown-title'>
										<span className='medfont medfont-height marginauto-height'>{'° ' + uo.unit}</span>
									</div>
								</label>)
							}) }
							<ul className='dropdown-ul'>
								{ unitObj.filter(uo => uo.active===false).map((uo, i) => {
									return (<li className='dropdown-li displayflex' onClick={()=>_unitClick(uo.unit)} key={i}>
										<div className='dropdown-title'>
											<span className='medfont medfont-height marginauto-height'>{'° ' + uo.unit}</span>
										</div>
									</li>)
								}) }
							</ul>
						</div>
					</div>
				</div>

				<div className='Overflow-row displayflex positionrel'>
					<div className='Overflow-row-title displayflex'>
						<span className='medfont medfont-height marginauto-height'>Pronoun</span>
					</div>
					<div className='Overflow-row-options displayflex'>
						<div className='dropdown medfont'>
							<input id='DropdownPronouns' className='dropdown-input' type='checkbox' ref={pronounRef}></input>
							{ pronounObj.filter(po => po.active===true).map((po, i) => {
								return (<label htmlFor='DropdownPronouns' className='dropdown-label' key={i}>
									<div className='dropdown-title'>
										<span className='medfont medfont-height marginauto-height'>{po.pronoun}</span>
									</div>
								</label>)
							}) }
							<ul className='dropdown-ul'>
								{ pronounObj.filter(po => po.active===false).map((po, i) => {
									return (<li className='dropdown-li displayflex' onClick={()=>_pronounClick(po.pronoun)} key={i}>
										<div className='dropdown-title'>
											<span className='medfont medfont-height marginauto-height'>{po.pronoun}</span>
										</div>
									</li>)
								}) }
							</ul>
						</div>
					</div>
				</div>

				{ (props.user !== null) ? <div className='Overflow-bottom-row displayflex positionrel'>
						<button className='solid-button red-button smallfont' onClick={_signout}>Sign out</button>
					</div> : null }

			</article>

		</section>
	);
};

export default ProfileTab;