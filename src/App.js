import React, { useState, useEffect } from 'react';
import './styles/ThemeSwitcher.scss';

import { initUserSettings, setNewSetting } from './status/SettingsHandler';
import handlerToggleTheme from './status/ThemeHandler';
import * as WeatherHandler from './status/WeatherHandler';

import { _getAllData } from './api/WeatherApi';
import Navbar from './views/Navbar';
import WeatherDaily from './views/WeatherDaily';
import WearSection from './views/WearSection';
import CitySelector from './components/CitySelector';


const App = (props) => {

	console.log('beginning of App');
	const [currentCity, setCurrentCity] = useState(0);

	const [userSettings, setUserSettings] = useState(initUserSettings);
	const [themeObj, setThemeObj] = useState(handlerToggleTheme(userSettings.theme));

	let initWeatherCheck = WeatherHandler.weatherCacheCheck();
	const [weather, setWeather] = useState(initWeatherCheck[0]);
	const [weatherCached, setWeatherCached] = useState(initWeatherCheck[1]);
	const [weatherLoading, setWeatherLoading] = useState(false);
	const [user, setUser] = useState(props.user);
	console.log('user: ', user);
	

	const _setNewUser = (newUser) => {
		console.log('newUser: ', newUser);
		setUser(newUser);
	};
	
	useEffect(() => {
		if (weatherCached) {
			_updateWeather();
			console.log('updated weather from useEffect');
		};
	}, []);

	const _setNewCity = (cityWeather) => {
		console.log('_setNewCity current weather: ', weather);
		console.log('new weather for city: ', cityWeather);
		let updatedWeather = WeatherHandler.addToWeather(weather, cityWeather);
		setWeather(updatedWeather);
	};

	const _updateWeather = () => {
		setWeatherLoading(true);
		let newWeather = weather.slice();
		let city = newWeather[currentCity]['name'];
		console.log('App updating Weather for city: ', city);
		_getAllData(city)
		.then(([currentData, hourlyData, extendedData]) => {
			console.log('_updateWeather data: ', [currentData, hourlyData, extendedData]);
			if (currentData.error || hourlyData.error || extendedData.error) {
				alert('Weather data error');
			} else {
				let newWeatherData = {
					'index': currentCity,
					'name': currentData.name,
					'id': currentData.id,
					'currentWeather': currentData,
					'hourlyWeather': hourlyData,
					'extendedWeather': extendedData
				}
				console.log('newWeather: ', newWeatherData);
				newWeather[currentCity] = newWeatherData;
				WeatherHandler.setWeatherCache(newWeather);
				setWeather(newWeather);
				setWeatherLoading(false);
				setWeatherCached(false);
			}
		});
	}

	const _setNewTheme = (newTheme) => {
		/* console.log('setNewTheme: ', newTheme); */
		let newThemeObj = handlerToggleTheme(newTheme);
		/* console.log('oldUserSettings: ', {...userSettings});
		console.log('newThemeObj: ', newThemeObj); */
		let newUserSettings = setNewSetting('theme', newTheme);
		/* console.log('newUserSettings: ', {...newUserSettings}); */
		setUserSettings({...newUserSettings});
		setThemeObj({...newThemeObj});
		/* console.log('userSettings: ', userSettings); */
	};


	return (
		<div id='App' className={'displayflex positionrel ' + ((user === null) ? 'nouser ' : '') + userSettings.theme}>
			{ (null !== weather) ? <>
				<main id='App-main' className={'displayflex marginauto' + (null === weather) ? ' full' : ''}>
					<div id='App-main-inner' className='displayflex flexcol'>
						<WeatherDaily weather={weather} weatherCached={weatherCached} currWeatherUpdate={()=>_updateWeather()} scale={userSettings.scale} currentCity={currentCity} />
						<WearSection weather={weather} scale={userSettings.scale} />
					</div>
				</main>
				<Navbar user={user} themeObj={themeObj} sendNewTheme={(newTheme)=>_setNewTheme(newTheme)} />
			</> : <main id='App-main' className='displayflex positionrel'>
				<CitySelector weather={weather} cityPick={(newCityWeather)=>_setNewCity(newCityWeather)} /> 
			</main> }
		</div>
	);

}


export default App;
