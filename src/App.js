import React, { useState } from 'react';
import './styles/ThemeSwitcher.scss';
import { getInitUserSettings } from './data/status/SettingsHandler'; /* , getSettings, setNewSetting */
import { handlerToggleTheme } from './data/status/ThemeHandler';
import * as WeatherHandler from './data/status/WeatherHandler';
/* import { getAllWeatherData } from './data/api/WeatherApi'; */
import Navbar from './components/views/Navbar';
import WeatherTab from './components/views/WeatherTab';
import WearTab from './components/views/WearTab';
import CitySelector from './components/elements/CitySelector';


const App = (props) => {

	console.log('\nBeginning of App');
	const initDte = new Date().getTime();
	const initUserSettings = getInitUserSettings(props.user);
	const initWeatherCheck = WeatherHandler.weatherCacheCheck();
	const initState = {
		ver: initDte,
		user: props.user,
		/* myLocation: props.myLocation, */
		hasLocAccess: props.hasLocAccess,
		userSettings: initUserSettings,
		themeObj: (handlerToggleTheme(initUserSettings.theme)),
		activeTab: 0,
		showNav: !initWeatherCheck.isWeatherCached
	};
	const [appState, setAppState] = useState(initState);

	
	/* useEffect(() => {
		_tryUpdateWeather();
	}, 
	// eslint-disable-next-line
	[]); */


	const _setNewUser = (newUser) => {
		console.log('newUser: ', newUser);
		const newState = {...appState};
		newState.user = newUser;
		setAppState(newState);
		window.location.reload();
		return false;
	};

	const _setNewCity = (cityWeather) => {
		console.log('_setNewCity current weather: ', appState.weather);
		console.log('new weather for city: ', cityWeather);
		const updatedWeather = WeatherHandler.addToWeather(appState.weather, cityWeather);
		const updatedWeatherCodeObj = ((null !== updatedWeather) && (null !== updatedWeather[0])) ? WeatherHandler.weatherDecoder(updatedWeather[0]['currentWeather']['weather'][0]['id']) : WeatherHandler.weatherDecoder(800);
		const newState = {...appState};
		newState.weatherLoading = false;
		newState.weatherCached = false;
		newState.weather = updatedWeather;
		newState.weatherCodeObj = updatedWeatherCodeObj;
		setAppState(newState);
	};

	const _setActiveTab = (newTabIndex) => {
		const editState = {...appState};
		editState.activeTab = newTabIndex;
		setAppState(editState);
		document.getElementById('App-main').scrollTo(0,0);
	};

	const _setAppVer = () => {
		setTimeout(()=> {
			const dte = new Date().getTime();
			console.log('_setAppVer ', dte);
			const editState = {...appState};
			editState.ver = dte;
			setAppState(editState);
		}, 100);
	};

	/* const _setNewTheme = (newTheme) => {
		console.log('setNewTheme: ', newTheme);
		let newThemeObj = handlerToggleTheme(newTheme);
		//console.log('oldUserSettings: ', {...userSettings});
		//console.log('newThemeObj: ', newThemeObj);
		const newUserSettings = getSettings();
		const newState = {...appState};
		newState.userSettings = {...newUserSettings};
		newState.themeObj = {...newThemeObj};
		setAppState(newState);
	};

	const _setNewSetting = (ky, vl) => {
		const newState = {...appState};
		const newUserSettings = setNewSetting(ky, vl);
		newState.userSettings = newUserSettings;
		setAppState(newState);
		if (ky === 'pronoun') {
			window.location.reload();
		};
	}; */

	const _loginClick = () => {
		if (document.getElementById('Settings-AccountPlus-icon')) {
			document.getElementById('Settings-AccountPlus-icon').click();
		};
	};

	console.log('render appState: ', appState);
	return (
		<div id='App' className={'displayflex positionrel ' + ((appState.user === null) ? 'nouser ' : '') + appState.themeObj[appState.userSettings.theme].class}>
			{ (null !== appState.weatherCached) ? <>
				<main id='App-main' className='displayflex marginauto positionrel'>
					<article id='App-main-inner' className='displayflex flexcol'>
						{ (appState.user === null) ? <article id='LogIn-container' className='single-button-row right'>
							<button className='material-button blue-button med positionabs' onClick={_loginClick}>Log In</button>
						</article> : null }
						{ (appState.activeTab === 0 ) ? <WeatherTab hasLocAccess={appState.hasLocAccess} user={appState.user} setAppVer={()=>_setAppVer()} /> 
							: (appState.activeTab === 1 ) ? ( (null !== appState.user) ? <WearTab user={appState.user} db={props.db} /> : null )
							: (appState.activeTab === 2 ) ? <div>UserPage</div> : null }
					</article>
					<section id='App-main-blur-background' className='positionfixed'></section>
					<section id='App-main-weather-background' className='positionfixed'>
						<article id='rain-container' className='App-main-weather-container'>
							<span className='raindrop-container one'>
								<span className='raindrop weather-drop'></span>
							</span>
							<span className='raindrop-container two'>
								<span className='raindrop weather-drop'></span>
							</span>
							<span className='raindrop-container three'>
								<span className='raindrop weather-drop'></span>
							</span>
							<span className='raindrop-container four'>
								<span className='raindrop weather-drop'></span>
							</span>
							<span className='raindrop-container five'>
								<span className='raindrop weather-drop'></span>
							</span>
							<span className='raindrop-container six'>
								<span className='raindrop weather-drop'></span>
							</span>
							<span className='raindrop-container seven'>
								<span className='raindrop weather-drop'></span>
							</span>
						</article>
					</section>
				</main>
				{ appState.showNav ? <Navbar user={appState.user} tabPick={(newTab)=>_setActiveTab(newTab)} /> : null }
			</> : <main id='App-main' className='full displayflex positionrel'>
				<article id='App-main-inner' className='displayflex flexcol marginauto'>
					<CitySelector weather={appState.weather} cityPick={(newCityWeather)=>_setNewCity(newCityWeather)} />
				</article>
			</main> }
		</div>
	);

}

export default App;