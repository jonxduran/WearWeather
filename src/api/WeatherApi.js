import CONSTANTS from '../assets/constants.json';
/* import CURRENTWEATHER from '../assets/sampleCurrentWeather.json';
import HOURLYWEATHER from '../assets/sampleHourlyWeather.json';
import EXTENDEDWEATHER from '../assets/sampleExtendedWeather.json'; */


/* let lclCounter = 0;
let lat = '40.7306';
let long = '-73.7181'; */

/* export function _getDailyControls() {
	lclCounter++;
	return 'daily controls increased';
}

export function _getDailyData() {
	return ('daily counter: ' + lclCounter);
} */


export function _getCurrentData(city) {
	/* return CURRENTWEATHER; */
	const currentUrl = CONSTANTS.currentForecastUrl + `&q=${city}`;
	return fetch(currentUrl).then(res => {
		console.log(res);
		if (!res.ok) {
			throw Error('currentForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `_getCurrentData API fail for ${city}` };
	});
}

export function _getHourlyData(city) {
	/* return HOURLYWEATHER; */
	const hourlyUrl = CONSTANTS.hourlyForecastUrl + `&q=${city}`;
	return fetch(hourlyUrl).then(res => {
		console.log(res);
		if (!res.ok) {
			throw Error('hourlyForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `_getHourlyData API fail for ${city}` };
	});
}

export function _getExtendedData(city) {
	/* return EXTENDEDWEATHER; */
	const extendedUrl = CONSTANTS.extendedForecastUrl + `&q=${city}`;
	return fetch(extendedUrl).then(res => {
		console.log(res);
		if (!res.ok) {
			throw Error('extendedForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `_getExtendedData API fail for ${city}` };
	});
}

export function _getAllData(city){
	return Promise.all([
		_getCurrentData(city), 
		_getHourlyData(city), 
		_getExtendedData(city)
	]);
};
