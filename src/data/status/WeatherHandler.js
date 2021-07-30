import React, { lazy } from 'react';
import { isNight } from '../../assets/common';

const SunnyClearIcon = lazy(() => import('mdi-react/WeatherSunnyIcon'));
const NightClearIcon = lazy(() => import('mdi-react/WeatherNightIcon'));
const PartlyCloudyIcon = lazy(() => import('mdi-react/WeatherPartlyCloudyIcon'));
const CloudyIcon = lazy(() => import('mdi-react/WeatherCloudyIcon'));
const CloudyAlertIcon = lazy(() => import('mdi-react/WeatherCloudyAlertIcon'));
const PartlyRainyIcon = lazy(() => import('mdi-react/WeatherPartlyRainyIcon'));
const RainyIcon = lazy(() => import('mdi-react/WeatherRainyIcon'));
const PouringIcon = lazy(() => import('mdi-react/WeatherPouringIcon'));
const LightningIcon = lazy(() => import('mdi-react/WeatherLightningIcon'));
const SnowyIcon = lazy(() => import('mdi-react/WeatherSnowyIcon'));
const FogIcon = lazy(() => import('mdi-react/WeatherFogIcon'));
const WindyIcon = lazy(() => import('mdi-react/WeatherWindyIcon'));
const WindyVariantIcon = lazy(() => import('mdi-react/WeatherWindyVariantIcon'));

const now = new Date(); 

let currentCityIndex = 0;


export function getLocation(shouldGetNew, hasLocAccess) {	
	/* const locScript = document.createElement('script');
	locScript.type = 'text/javascript';
	locScript.src = 'https://geolocation-db.com/jsonp';
	const scs = document.getElementsByTagName('script')[0];
	console.log(scs);
	scs.parentNode.insertBefore(locScript, scs);
	fetch('https://geolocation-db.com/jsonp/').then(res => {
		if (!res.ok) {
			throw Error('geolocation-db API error')
		};
		return res;
	}).then(res => {
		console.log(res);
	}).catch(err => {
		const msg = { 'error': 'getLocation()', 'detailedError': err };
		console.log(msg);
		return msg
	}); */
};

/*
weather cache exists and is new enough - [weather, false]
weather cache exists and is old - [weather, true]
no weather cache exists - [null, null]
*/
export function weatherCacheCheck() {
	let weather = null;
	let weatherDate = null;
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
		weatherDate = oldWeather.date;
		if (oldWeather.date < checkTime) {
			weatherCached = true;
			console.log('oldWeather is old, marking as cached');
		} /* else {
			console.log('oldWeather is still fresh, date more recent than checkDate');
		} */;
	} else {
		weatherCached = true;
	};
	return {'weather': weather, 'weatherDate': weatherDate, 'isWeatherCached': weatherCached};
}

export function getCurrentCityIndex() {
	return currentCityIndex;
};

export function setCurrentCityIndex(i) {
	currentCityIndex = i;
};

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
