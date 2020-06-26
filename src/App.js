import React, { useState, useEffect } from 'react';
import './styles/ThemeSwitcher.scss';

import { getInitUserSettings, setNewSetting } from './status/SettingsHandler';
import handlerToggleTheme from './status/ThemeHandler';
import * as WeatherHandler from './status/WeatherHandler';

import { getAllWeatherData } from './api/WeatherApi';
import Navbar from './views/Navbar';
import WeatherDaily from './views/WeatherDaily';
import WearSection from './views/WearSection';
import CitySelector from './components/CitySelector';
import { weatherDecoder } from './assets/common';


const App = (props) => {

	console.log('beginning of App');

	const initUserSettings = getInitUserSettings(props.user);
	const initWeatherCheck = WeatherHandler.weatherCacheCheck();
	const weatherCodeObj = (null !== initWeatherCheck[0][0]) ? WeatherHandler.weatherDecoder(initWeatherCheck[0][0]['currentWeather']['weather'][0]['id']) : WeatherHandler.weatherDecoder(800);
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
		console.log('useEffect weatherCached is old: ', appState.weatherCached);
		if (true === appState.weatherCached) {
			_updateWeather();
			console.log('updated weather from useEffect');
		};
	}, []);


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
		const newState = {...appState};
		newState.weatherLoading = false;
		newState.weatherCached = false;
		newState.weather = updatedWeather;
		setAppState(newState);
	};

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
		/* console.log('setNewTheme: ', newTheme); */
		let newThemeObj = handlerToggleTheme(newTheme);
		/* console.log('oldUserSettings: ', {...userSettings}); */
		/* console.log('newThemeObj: ', newThemeObj); */
		let newUserSettings = setNewSetting('theme', newTheme);
		/* console.log('newUserSettings: ', {...newUserSettings}); */
		const newState = {...appState};
		newState.userSettings = {...newUserSettings};
		newState.themeObj = {...newThemeObj};
		setAppState(newState);
	};

	console.log('render appState: ', appState);
	return (
		<div id='App' className={'displayflex positionrel ' + ((appState.user === null) ? 'nouser ' : '') + appState.userSettings.theme}>
			{ (null !== appState.weatherCached) ? <>
				<main id='App-main' className={'displayflex marginauto positionrel' + ((null === appState.weather) ? ' full' : '') + ' ' + appState.weatherCodeObj.ambiance + ' ' + appState.weatherCodeObj.background}>
					<article id='App-main-inner' className='displayflex flexcol'>
						{ (appState.weatherLoading === false) ? <>
							<WeatherDaily weather={appState.weather}  currWeatherUpdate={()=>_updateWeather()} scale={appState.userSettings.scale} currentCity={appState.currentCity} weatherCodeObj={appState.weatherCodeObj} />
							{ (null !== appState.user && null !== appState.weather) && <WearSection weather={appState.weather} scale={appState.userSettings.scale} currentCity={appState.currentCity} userSettings={appState.userSettings} db={props.db} /> }
							</> : <span>loading</span>
						}
					</article>
					<section id='App-main-blur-background' className='positionabs'></section>
					<section id='App-main-weather-background' className='positionabs'>
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
				<Navbar user={appState.user} themeObj={appState.themeObj} sendNewTheme={(newTheme)=>_setNewTheme(newTheme)} userUpdate={(user)=>_setNewUser(user)} />
			</> : <main id='App-main' className='displayflex positionrel'>
				<CitySelector weather={appState.weather} cityPick={(newCityWeather)=>_setNewCity(newCityWeather)} /> 
			</main> }
		</div>
	);

}


export default App;
