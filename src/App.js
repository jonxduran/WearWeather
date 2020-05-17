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
	const [currentCity, setCurrentCity] = useState(0);

	const initUser = getInitUserSettings(props.user);
	const [userSettings, setUserSettings] = useState(initUser);
	const [themeObj, setThemeObj] = useState(handlerToggleTheme(userSettings.theme));

	const initWeatherCheck = WeatherHandler.weatherCacheCheck();

	const [weather, setWeather] = useState(null);
	const [weatherCached, setWeatherCached] = useState(initWeatherCheck[1]);
	const [weatherLoading, setWeatherLoading] = useState((false === initWeatherCheck[1]) ? false : true);
	const [user, setUser] = useState(props.user);
	

	const _setNewUser = (newUser) => {
		console.log('newUser: ', newUser);
		setUser(newUser);
		window.location.reload();
		return false;
	};
	
	useEffect(() => {
		console.log('useeffect ', weatherCached);
		if (true === weatherCached) {
			_updateWeather();
			console.log('updated weather from useEffect');
		} else {
			setWeather(initWeatherCheck[0]);
			console.log('***** SETWEATHER ', initWeatherCheck[0]);
		};
	}, []);

	const _setNewCity = (cityWeather) => {
		console.log('_setNewCity current weather: ', weather);
		console.log('new weather for city: ', cityWeather);
		let updatedWeather = WeatherHandler.addToWeather(weather, cityWeather);
		setWeatherLoading(false);
		setWeatherCached(false);
		setWeather(updatedWeather);
		console.log('***** SETWEATHER ', updatedWeather);
	};

	const _updateWeather = () => {
		let newWeather = (null === weather) ? initWeatherCheck[0] : weather.slice();
		let city = newWeather[currentCity]['name'];
		console.log('App updating Weather for city: ', city);
		getAllWeatherData(city)
		.then(([currentData, hourlyData, extendedData]) => {
			console.log('_updateWeather data: ', [currentData, hourlyData, extendedData]);
			if (currentData.error || hourlyData.error || extendedData.error) {
				console.log('Weather data error');
				console.log('Setting weather from cache: ', initWeatherCheck[0]);
				console.log('***** SETWEATHER');
				setWeather(initWeatherCheck[0]);
				//setWeatherCached(false);
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
				setWeatherCached(false);
				console.log('***** SETWEATHER');
				setWeather(newWeather);
			}
			setWeatherLoading(false);
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
			{ (null !== weatherCached) ? <>
				<main id='App-main' className={'displayflex marginauto' + (null === weather) ? ' full' : ''}>
					<div id='App-main-inner' className='displayflex flexcol'>
						{ (weatherLoading === false) ? <>
							<WeatherDaily weather={weather}  currWeatherUpdate={()=>_updateWeather()} scale={userSettings.scale} currentCity={currentCity} />
							{ (null !== user && null !== weather) && <WearSection weather={weather} scale={userSettings.scale} currentCity={currentCity} userSettings={userSettings} db={props.db} /> }
							</> : <span>loading</span>
						}
					</div>
				</main>
				<Navbar user={user} themeObj={themeObj} sendNewTheme={(newTheme)=>_setNewTheme(newTheme)} userUpdate={(user)=>_setNewUser(user)} />
			</> : <main id='App-main' className='displayflex positionrel'>
				<CitySelector weather={weather} cityPick={(newCityWeather)=>_setNewCity(newCityWeather)} /> 
			</main> }
		</div>
	);

}


export default App;
