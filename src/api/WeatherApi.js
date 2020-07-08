import CONSTANTS from '../assets/constants.json';
/* import CURRENTWEATHER from '../assets/sampleCurrentWeather.json';
import HOURLYWEATHER from '../assets/sampleHourlyWeather.json';
import EXTENDEDWEATHER from '../assets/sampleExtendedWeather.json'; */


export function getCurrentData(city) {
	/* return CURRENTWEATHER; */
	const currentUrl = CONSTANTS.currentForecastUrl + `&q=${city}`;
	return fetch(currentUrl).then(res => {
		if (!res.ok) {
			throw Error('currentForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `getCurrentData API fail for ${city}` };
	});
}

export function getHourlyData(city) {
	/* return HOURLYWEATHER; */
	const hourlyUrl = CONSTANTS.hourlyForecastUrl + `&q=${city}`;
	return fetch(hourlyUrl).then(res => {
		if (!res.ok) {
			throw Error('hourlyForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `getHourlyData API fail for ${city}` };
	});
}

export function getExtendedData(city) {
	/* return EXTENDEDWEATHER; */
	const extendedUrl = CONSTANTS.extendedForecastUrl + `&q=${city}`;
	return fetch(extendedUrl).then(res => {
		if (!res.ok) {
			throw Error('extendedForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `getExtendedData API fail for ${city}` };
	});
}

export function getAllWeatherData(city){
	return Promise.all([
		getCurrentData(city), 
		getHourlyData(city), 
		getExtendedData(city)
	]);
};
