import React from 'react';
import { isNight } from '../assets/common';

const SunnyClearIcon = React.lazy(() => import('mdi-react/WeatherSunnyIcon'));
const NightClearIcon = React.lazy(() => import('mdi-react/WeatherNightIcon'));
const PartlyCloudyIcon = React.lazy(() => import('mdi-react/WeatherPartlyCloudyIcon'));
const CloudyIcon = React.lazy(() => import('mdi-react/WeatherCloudyIcon'));
const CloudyAlertIcon = React.lazy(() => import('mdi-react/WeatherCloudyAlertIcon'));
const PartlyRainyIcon = React.lazy(() => import('mdi-react/WeatherPartlyRainyIcon'));
const RainyIcon = React.lazy(() => import('mdi-react/WeatherRainyIcon'));
const PouringIcon = React.lazy(() => import('mdi-react/WeatherPouringIcon'));
const LightningIcon = React.lazy(() => import('mdi-react/WeatherLightningIcon'));
const SnowyIcon = React.lazy(() => import('mdi-react/WeatherSnowyIcon'));
const FogIcon = React.lazy(() => import('mdi-react/WeatherFogIcon'));
const WindyIcon = React.lazy(() => import('mdi-react/WeatherWindyIcon'));
const WindyVariantIcon = React.lazy(() => import('mdi-react/WeatherWindyVariantIcon'));

const now = new Date(); 


/*
weather cache exists and is new enough - [weather, false]
weather cache exists and is old - [weather, true]
no weather cache exists - [null, null]
*/
export function weatherCacheCheck() {
	let weather = null;
	let weatherCached = false;
	let oldWeatherStr = localStorage.getItem("weatherCache") || null;
	if (oldWeatherStr) {
		let oldWeather = JSON.parse(oldWeatherStr);
		/* console.log('oldWeather: ', oldWeather); */
		/* let cacheDate = new Date(oldWeather.date); */
		let checkTime = new Date().getTime() - (15 * 60 * 1000); /*000*/
		/* let checkDate = new Date(checkTime); */
		/* console.log('cacheDate: ', cacheDate, ' isGreater?checkDate: ', checkDate); */
		weather = oldWeather.weather;
		if (oldWeather.date < checkTime) {
			weatherCached = true;
			console.log('oldWeather is old, marking as cached');
		} else {
			console.log('oldWeather is still fresh, date more recent than checkDate');
		};
	} else {
		weatherCached = null;
	};
	return [weather, weatherCached];
}

/* export function refreshWeather() {

} */

export function addToWeather(weatherArr, newWeather) {
	if (null === weatherArr) { weatherArr = []; };
	weatherArr.push(newWeather);
	let finalWeatherArr = setWeatherCache(weatherArr);
	return finalWeatherArr;
}

export function setWeatherCache (weatherArr) {
	let now = new Date().getTime();
	let weatherCache = {
		'date': now,
		'weather': weatherArr
	};
	console.log('setting weatherCache: ', weatherCache);
	try {
		localStorage.setItem('weatherCache', JSON.stringify(weatherCache));
	} catch(error) {
		console.log("Writing to local Storage error for weatherCache:", error);
	}
	return weatherArr;
}

export function weatherDecoder(id) {
	let decoded;
	switch(true) {
		case (/2[0-9][0-9]/).test(id):
			decoded = {
				ambiance: 'dark',
				description: 'thunderstorm',
				background: 'rain',
				color: 'darkblue',
				icon: <LightningIcon />
			};
			break;
		case (/3[0-9][0-9]/).test(id):
			decoded = {
				ambiance: 'light',
				description: 'drizzle',
				background: 'rain',
				color: 'blue',
				icon: <PartlyRainyIcon />
			};
			break;
		case (/50[2-4]/).test(id):
			decoded = {
				ambiance: 'dark',
				description: 'heavy rain',
				background: 'rain',
				color: 'darkblue',
				icon: <PouringIcon />
			};
			break;
		case (/5[0-9][0-9]/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'rain',
				background: 'rain',
				color: 'blue',
				icon: <RainyIcon />
			};
			break;
		case (/6[0-9][0-9]/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'snow',
				background: 'snow',
				color: 'gray',
				icon: <SnowyIcon />
			};
			break;
		case (/7[0,2,4]1/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'fog',
				background: 'cloud',
				color: 'gray',
				icon: <FogIcon />
			};
			break;
		case (/711/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'smoke',
				background: 'cloud',
				color: 'gray',
				icon: <CloudyAlertIcon />
			};
			break;
		case (/7[3,5]1/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'sand',
				background: 'wind',
				color: 'lightbrown',
				icon: <WindyVariantIcon />
			};
			break;
		case (/76[1-2]/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'dust',
				background: 'wind',
				color: 'lightbrown',
				icon: <WindyVariantIcon />
			};
			break;
		case (/7[7-8]1/).test(id):
			decoded = {
				ambiance: 'light',
				description: 'strong winds',
				background: 'wind',
				color: 'gray',
				icon: <WindyIcon />
			};
			break;
		case (/800/).test(id):
			decoded = {
				ambiance: 'light',
				description: 'clear',
				background: 'clear',
				color: 'yellow',
				icon: <SunnyClearIcon />,
				timeIcon: isNight(now.getHours()) ? <NightClearIcon /> : <SunnyClearIcon />
			};
			break;
		case (/80[1-2]/).test(id):
			decoded = {
				ambiance: 'light',
				description: 'partly cloudy',
				background: 'clear',
				color: 'lightgray',
				icon: <PartlyCloudyIcon />
			};
			break;
		case (/80[3-4]/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'cloudy',
				background: 'cloud',
				color: 'gray',
				icon: <CloudyIcon />
			};
			break;
		default: 
			decoded = {
				ambiance: 'light',
				description: 'clear',
				background: 'clear',
				color: 'yellow',
				icon: <SunnyClearIcon />,
				timeIcon: isNight(now.getHours()) ? <NightClearIcon /> : <SunnyClearIcon />
			};
			break;
	}
	return decoded;
};
