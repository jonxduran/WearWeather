
export function weatherCacheCheck() {
	let weather = null;
	let weatherCached = false;
	let oldWeatherStr = localStorage.getItem("weatherCache") || null;
	if (oldWeatherStr) {
		let oldWeather = JSON.parse(oldWeatherStr);
		/* console.log('oldWeather: ', oldWeather); */
		let cacheDate = new Date(oldWeather.date);
		let checkTime = new Date().getTime() - (15 * 60 * 1000);
		let checkDate = new Date(checkTime);
		console.log('cacheDate: ', cacheDate, ' isGreater?checkDate: ', checkDate);
		weather = oldWeather.weather;
		if (oldWeather.date < checkTime) {
			weatherCached = true;
			console.log('oldWeather is old, marking as cached');
		} else {
			console.log('oldWeather is still fresh, date more recent than checkDate');
		};
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
	localStorage.setItem('weatherCache', JSON.stringify(weatherCache));
	return weatherArr;
}
