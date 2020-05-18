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


const App = (props) => {

	console.log('beginning of App');

	const initUserSettings = getInitUserSettings(props.user);
	const initWeatherCheck = WeatherHandler.weatherCacheCheck();
	const initState = {
		user: props.user,
		userSettings: initUserSettings,
		themeObj: (handlerToggleTheme(initUserSettings.theme)),
		currentCity: 0,
		weather: null,
		weatherCached: initWeatherCheck[1],
		weatherLoading: ((false === initWeatherCheck[1]) ? false : true)
	};
	const [appState, setAppState] = useState(initState);

	
	useEffect(() => {
		console.log('useeffect ', appState.weatherCached);
		if (true === appState.weatherCached) {
			_updateWeather();
			console.log('updated weather from useEffect');
		} else {
			const newState = {...appState};
			newState.weather = initWeatherCheck[0];
			setAppState(newState);
			console.log('***** SETWEATHER ', initWeatherCheck[0]);
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
		getAllWeatherData(city)
		.then(([currentData, hourlyData, extendedData]) => {
			console.log('_updateWeather data: ', [currentData, hourlyData, extendedData]);
			if (currentData.error || hourlyData.error || extendedData.error) {
				console.log('Weather data error');
				console.log('Setting weather from cache: ', initWeatherCheck[0]);
				const newState = {...appState};
				newState.weatherLoading = false;
				newState.weather = initWeatherCheck[0];
				setAppState(newState);
			} else {
				let newWeatherData = {
					'index': appState.currentCity,
					'name': currentData.name,
					'id': currentData.id,
					'currentWeather': currentData,
					'hourlyWeather': hourlyData,
					'extendedWeather': extendedData
				}
				console.log('newWeather: ', newWeatherData);
				newWeather[appState.currentCity] = newWeatherData;
				WeatherHandler.setWeatherCache(newWeather);
				const newState = {...appState};
				newState.weatherCached = false;
				newState.weatherLoading = false;
				newState.weather = newWeather;
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

	console.log('render ', appState);
	return (
		<div id='App' className={'displayflex positionrel ' + ((appState.user === null) ? 'nouser ' : '') + appState.userSettings.theme}>
			{ (null !== appState.weatherCached) ? <>
				<main id='App-main' className={'displayflex marginauto' + (null === appState.weather) ? ' full' : ''}>
					<div id='App-main-inner' className='displayflex flexcol'>
						{ (appState.weatherLoading === false) ? <>
							<WeatherDaily weather={appState.weather}  currWeatherUpdate={()=>_updateWeather()} scale={appState.userSettings.scale} currentCity={appState.currentCity} />
							{ (null !== appState.user && null !== appState.weather) && <WearSection weather={appState.weather} scale={appState.userSettings.scale} currentCity={appState.currentCity} userSettings={appState.userSettings} db={props.db} /> }
							</> : <span>loading</span>
						}
					</div>
				</main>
				<Navbar user={appState.user} themeObj={appState.themeObj} sendNewTheme={(newTheme)=>_setNewTheme(newTheme)} userUpdate={(user)=>_setNewUser(user)} />
			</> : <main id='App-main' className='displayflex positionrel'>
				<CitySelector weather={appState.weather} cityPick={(newCityWeather)=>_setNewCity(newCityWeather)} /> 
			</main> }
		</div>
	);

}


export default App;
