import CONSTANTS from '../assets/constants.json';


export function getCurrentData(city) {
	const currentUrl = CONSTANTS.currentForecastUrl + process.env.REACT_APP_WEATHER_APIKEY + `&q=${city}`;
	return fetch(currentUrl).then(res => {
		if (!res.ok) {
			throw Error('currentForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `getCurrentData API fail for ${city}` };
	});
};

export function getHourlyData(city) {
	const hourlyUrl = CONSTANTS.hourlyForecastUrl + process.env.REACT_APP_WEATHER_APIKEY + `&q=${city}`;
	return fetch(hourlyUrl).then(res => {
		if (!res.ok) {
			throw Error('hourlyForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `getHourlyData API fail for ${city}` };
	});
};

export function getExtendedData(city) {
	const extendedUrl = CONSTANTS.extendedForecastUrl + process.env.REACT_APP_WEATHER_APIKEY + `&q=${city}`;
	return fetch(extendedUrl).then(res => {
		if (!res.ok) {
			throw Error('extendedForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `getExtendedData API fail for ${city}` };
	});
};

export function getAllWeatherData(city){
	return Promise.all([
		getCurrentData(city), 
		getHourlyData(city), 
		getExtendedData(city)
	]);
};
