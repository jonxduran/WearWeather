import CONSTANTS from '../../assets/constants.json';

let lastWeatherArr = null;

export function getCurrentData(typ, loc) {
	const reqParams = getReqParams(typ, loc);
	const currentUrl = CONSTANTS.currentForecastUrl + process.env.REACT_APP_WEATHER_APIKEY + reqParams;
	return fetch(currentUrl).then(res => {
		if (!res.ok) {
			throw Error('currentForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `getCurrentData API fail for ${loc.latitude}, ${loc.longitude}` };
	});
};

export function getHourlyData(typ, loc) {
	const reqParams = getReqParams(typ, loc);
	const hourlyUrl = CONSTANTS.hourlyForecastUrl + process.env.REACT_APP_WEATHER_APIKEY + reqParams;
	return fetch(hourlyUrl).then(res => {
		if (!res.ok) {
			throw Error('hourlyForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `getHourlyData API fail for ${loc.latitude}, ${loc.longitude}` };
	});
};

export function getExtendedData(typ, loc) {
	const reqParams = getReqParams(typ, loc);
	const extendedUrl = CONSTANTS.extendedForecastUrl + process.env.REACT_APP_WEATHER_APIKEY + reqParams;
	return fetch(extendedUrl).then(res => {
		if (!res.ok) {
			throw Error('extendedForecast API error')
		};
		return res;
	}).then(res => res.json()).catch(err => {
		return { 'error': 'Issue getting weather data', 'detailedError': `getExtendedData API fail for ${loc.latitude}, ${loc.longitude}` };
	});
};

export function getReqParams(typ, loc) {
	return (typ === 'gps' ? `&lat=${loc.latitude}&lon=${loc.longitude}` : `&q=${loc}`);
};

export function setAllWeatherData(weatherArr) {
	lastWeatherArr = weatherArr;
};

export function getAllWeatherData(typ, loc){
	if (null !== lastWeatherArr) {
		return lastWeatherArr;
	} else {
		return Promise.all([
			getCurrentData(typ, loc), 
			getHourlyData(typ, loc), 
			getExtendedData(typ, loc)
		]);
	};
};
