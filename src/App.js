import React, { useState, useEffect } from 'react';
import './styles/ThemeSwitcher.scss';

import { getInitUserSettings, getSettings, setNewSetting } from './status/SettingsHandler';
import { handlerToggleTheme } from './status/ThemeHandler';
import * as WeatherHandler from './status/WeatherHandler';

import { getAllWeatherData } from './api/WeatherApi';
import Navbar from './views/Navbar';
import WeatherDaily from './views/WeatherDaily';
import WearSection from './views/WearSection';
import CitySelector from './components/CitySelector';


const App = (props) => {

	console.log('beginning of App');

	const initUserSettings = getInitUserSettings(props.user);
	const initWeatherCheck = WeatherHandler.weatherCacheCheck();
	const weatherCodeObj = ((null !== initWeatherCheck[0]) && (null !== initWeatherCheck[0][0])) ? WeatherHandler.weatherDecoder(initWeatherCheck[0][0]['currentWeather']['weather'][0]['id']) : WeatherHandler.weatherDecoder(800);
	/* const weatherCodeObj = WeatherHandler.weatherDecoder(303); */
	const initState = {
		user: props.user,
		userSettings: initUserSettings,
		themeObj: (handlerToggleTheme(initUserSettings.theme)),
		currentCity: 0,
		weather: initWeatherCheck[0],
		weatherCached: initWeatherCheck[1],
		weatherLoading: ((false === initWeatherCheck[1]) ? false : true),
		weatherCodeObj: weatherCodeObj
	};
	const [appState, setAppState] = useState(initState);

	
	useEffect(() => {
		_tryUpdateWeather();
	}, 
	// eslint-disable-next-line
	[]);


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

	const _tryUpdateWeather = () => {
		const weatherCheck = WeatherHandler.weatherCacheCheck();
		console.log('Check if weatherCached is old: ', weatherCheck[1]);
		if (true === weatherCheck[1]) {
			_updateWeather();
			console.log('updated weather from useEffect');
		};
	}

	const _updateWeather = () => {
		let newWeather = (null === appState.weather) ? initWeatherCheck[0] : appState.weather.slice();
		let city = newWeather[appState.currentCity]['name'];
		console.log('App updating Weather for city: ', city);
		getAllWeatherData(city).then(([currentData, hourlyData, extendedData]) => {
			console.log('_updateWeather data: ', [currentData, hourlyData, extendedData]);
			if (currentData.error || hourlyData.error || extendedData.error) {
				console.log('Weather data error');
				console.log('Setting weather from cache: ', initWeatherCheck[0][appState.currentCity]);
				const weatherCodeObj = WeatherHandler.weatherDecoder(initWeatherCheck[0][appState.currentCity]['currentWeather']['weather'][0]['id']);
				const newState = {...appState};
				newState.weatherLoading = false;
				newState.weather = initWeatherCheck[0];
				newState.weatherCodeObj = weatherCodeObj;
				setAppState(newState);
			} else {
				let newWeatherData = {
					'index': appState.currentCity,
					'name': currentData.name,
					'id': currentData.id,
					'currentWeather': currentData,
					'hourlyWeather': hourlyData,
					'extendedWeather': extendedData
				};
				console.log('newWeather: ', newWeatherData);
				const weatherCodeObj = WeatherHandler.weatherDecoder(currentData['weather'][0]['id']);
				newWeather[appState.currentCity] = newWeatherData;
				WeatherHandler.setWeatherCache(newWeather);
				const newState = {...appState};
				newState.weatherCached = false;
				newState.weatherLoading = false;
				newState.weather = newWeather;
				newState.weatherCodeObj = weatherCodeObj;
				console.log('new state: ', newState);
				setAppState(newState);
			};
		});
	}

	const _setNewTheme = (newTheme) => {
		console.log('setNewTheme: ', newTheme);
		let newThemeObj = handlerToggleTheme(newTheme);
		/* console.log('oldUserSettings: ', {...userSettings}); */
		/* console.log('newThemeObj: ', newThemeObj); */
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
			window.location.reload(false);
		};
	};

	console.log('render appState: ', appState);
	return (
		<div id='App' className={'displayflex positionrel ' + ((appState.user === null) ? 'nouser ' : '') + appState.themeObj[appState.userSettings.theme].class}>
			{ (null !== appState.weatherCached) ? <>
				<main id='App-main' className={'displayflex marginauto positionrel' + ((null === appState.weather) ? ' full' : '') + ' ' + appState.weatherCodeObj.ambiance + ' ' + appState.weatherCodeObj.background}>
					<article id='App-main-inner' className='displayflex flexcol'>
						{ (appState.weatherLoading === false) ? <>
							<WeatherDaily weather={appState.weather}  currWeatherUpdate={()=>_updateWeather()} scale={appState.userSettings.scale} currentCity={appState.currentCity} weatherCodeObj={appState.weatherCodeObj} />
							{ (null !== appState.user && null !== appState.weather) && <WearSection weather={appState.weather} scale={appState.userSettings.scale} currentCity={appState.currentCity} userSettings={appState.userSettings} user={appState.user} db={props.db} /> }
							</> : <span>loading</span>
						}
						<span id='credits' className='smallfont' aria-hidden='true'>Designed by <a href='https://amandainnis.github.io/' target='_blank' rel='noopener noreferrer'>Amanda Innis</a></span>
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
				<Navbar user={appState.user} themeObj={appState.themeObj} sendNewTheme={(newTheme)=>_setNewTheme(newTheme)} userUpdate={(user)=>_setNewUser(user)} color={appState.weatherCodeObj.color} userSettings={appState.userSettings} sendNewSetting={(ky, vl)=>_setNewSetting(ky, vl)} refreshWeather={_tryUpdateWeather} />
			</> : <main id='App-main' className='full displayflex positionrel'>
				<article id='App-main-inner' className='displayflex flexcol marginauto'>
					<CitySelector weather={appState.weather} cityPick={(newCityWeather)=>_setNewCity(newCityWeather)} />
				</article>
			</main> }
		</div>
	);

}


export default App;
