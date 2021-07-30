import React, { useState } from 'react';
import CurrentWeatherCard from '../elements/CurrentWeatherCard';
import HourlyWeatherCard from '../elements/HourlyWeatherCard';
import ExtendedWeatherCard from '../elements/ExtendedWeatherCard';
import { getInitUserSettings } from '../../data/status/SettingsHandler';
import { weatherDecoder, weatherCacheCheck, setWeatherCache, getCurrentCityIndex, setCurrentCityIndex } from '../../data/status/WeatherHandler';
import { gpsGetter } from '../../data/status/LocationHandler';
import { getAllWeatherData } from '../../data/api/WeatherApi';
import CitySelector from '../elements/CitySelector';


const WeatherTab = (props) => {

	const getWeatherCodeObj = function(currWeather, currCity) {
		return ((null !== currWeather['weather']) && (null !== currWeather['weather'][currCity])) ? weatherDecoder(currWeather['weather'][currCity]['currentWeather']['weather'][0]['id']) : weatherDecoder(800)
	};

	const _tryUpdateWeather = function() {
		const weatherCheck = weatherCacheCheck();
		console.log('Check if weatherCached is old: ', weatherCheck['isWeatherCached']);
		if (true === weatherCheck['isWeatherCached']) {
			_checkLocation();
		};
	};

	const _checkLocation = function() {
		console.log('_checkLocation: ', weatherState.myLocation);
		if (null === weatherState.myLocation) {
			_getLocation();
		} else {
			_updateWeather();
		};
	};

	const _getLocation = function() {
		gpsGetter().then(data => {
			if (data !== null) {
				console.log('Location data: ', data);
				const newState = {...weatherState};
				newState.myLocation = data;
				setWeatherState(newState);
			} else {
				console.log('Get location a different way');
			};
		});
	};

	const _updateWeather = function() {
		console.log('_updateWeather ', weatherState.myLocation);
		getAllWeatherData('gps', weatherState.myLocation).then(([currentData, hourlyData, extendedData]) => {
			console.log('_updateWeather data: ', [currentData, hourlyData, extendedData]);
			if (currentData.error || hourlyData.error || extendedData.error) {
				console.log('Weather data error');
				console.log('Setting weather from cache: ', initWeatherCheck['weather'][weatherState.currentCityIndex]);
				const weatherCodeObj = weatherDecoder(initWeatherCheck['weather'][weatherState.currentCityIndex]['currentWeather']['weather'][0]['id']);
				const newState = {...weatherState};
				newState.weatherLoading = false;
				newState.weather = initWeatherCheck['weather'];
				newState.weatherCodeObj = weatherCodeObj;
				setWeatherState(newState);
			} else {
				let newWeatherArr = (null === weatherState.weather) ? [{}] : weatherState.weather;
				let newWeatherData = {
					'index': weatherState.currentCityIndex,
					'name': currentData.name,
					'id': currentData.id,
					'currentWeather': currentData,
					'hourlyWeather': hourlyData,
					'extendedWeather': extendedData
				};
				console.log(weatherState.weather);
				const weatherCodeObj = weatherDecoder(currentData['weather'][0]['id']);
				newWeatherArr[weatherState.currentCityIndex] = newWeatherData;
				setWeatherCache(newWeatherArr);
				const newState = {...weatherState};
				newState.weatherCached = false;
				newState.weatherLoading = false;
				newState.weather = newWeatherArr;
				newState.weatherCodeObj = weatherCodeObj;
				props.setAppVer();
				setWeatherState(newState);
			};
		});
	};

	const initUserSettings = getInitUserSettings(props.user);
	const initCurrentCityIndex = getCurrentCityIndex();
	const initWeatherCheck = weatherCacheCheck();
	const initLoading = Boolean(initWeatherCheck['isWeatherCached']);
	const initLocation = initLoading ? null : initWeatherCheck.weather[initCurrentCityIndex].currentWeather.coord;
	const initWeatherCodeObj = getWeatherCodeObj(initWeatherCheck, initCurrentCityIndex);
	const initState = {
		userSettings: initUserSettings,
		myLocation: initLocation,
		currentCityIndex: initCurrentCityIndex,
		weather: initWeatherCheck['weather'],
		weatherDate: initWeatherCheck['weatherDate'],
		isWeatherCached: initWeatherCheck['isWeatherCached'],
		weatherLoading: initLoading,
		weatherCodeObj: initWeatherCodeObj
	};
	const [weatherState, setWeatherState] = useState(initState);
	console.log('Weather Tab: ', initState);
	if (initLoading) {
		_tryUpdateWeather();
	};


	return (
		<section id='WeatherTab' className='main-tab flexcol'>
			{ (weatherState.weather && (weatherState.weather.length > 0)) ? (
				<>
				<section id='CurrentWeather-section' className='positionrel'>
					{ weatherState.weather.map((allW, i) => {
						return <CurrentWeatherCard key={i} allWeather={allW} scale={weatherState.userSettings.scale} currCity={weatherState.currentCityIndex} weatherCodeObj={weatherState.weatherCodeObj} weatherDate={weatherState.weatherDate} />
					}) }
				</section>
				<section id='HourlyWeather-section' className='displayflex flexcol'>
					<HourlyWeatherCard data={weatherState.weather[weatherState.currentCityIndex]['hourlyWeather']} scale={weatherState.userSettings.scale} currentCityIndex={weatherState.currentCityIndex} />			
				</section>
				<section id='ExtendedWeather-section' className='displayflex flexcol'>
					<article id='ExtendedWeather-card' className='card largecard fluent-card card-shadow displayflex flexcol'>
						{weatherState.weather[weatherState.currentCityIndex].extendedWeather.list.map((wh, i) => {
							return <ExtendedWeatherCard data={wh} scale={weatherState.userSettings.scale} currentCityIndex={weatherState.currentCityIndex} key={i} />
						}) }
					</article>
				</section>
				</>
			) : <div>Loading weather</div> }
		</section>
	);

};

export default WeatherTab;