import React from 'react';
import { weekdaysLong, getTemperature, getWeatherCardDate } from '../../assets/common';

const CurrentWeatherCard = ({allWeather, scale, currCity, weatherCodeObj, weatherDate}) => {
	//const date = new Date(allWeather.currentWeather.dt * 1000);
	const weatherDateObj = new Date(weatherDate);
	const lastWeatherDate = getWeatherCardDate(weatherDateObj, scale);
	
	return <article id='CurrentWeatherCard' className={'displayflex flexcol marginauto ' + allWeather.currentWeather.weather[currCity].main}>
		<header className='card-header displayflex flexcol'>
			<h1 className='hugefont bold6'>{weekdaysLong[weatherDateObj.getDay()]}</h1>
			<h2 className='biggerfont bold4'>{allWeather.name}</h2>
			<p id='CurrentWeatherCard-description' className='biggerfont bold3'>{allWeather.currentWeather.weather[0].description}</p>
		</header>
		<section id='CurrentWeatherCard-container' className='displayflex flexcol'>
			<div id='CurrentWeather-circle' className={'card fluent-card card-shadow nonselect positionrel ' + weatherCodeObj.color}>
				<span id='CurrentWeather-max' className='temperature hugefont hugefont-height positionabs'>{getTemperature(allWeather.currentWeather.main.temp_max, scale)}</span>
				<div className='temperature-container displayflex bold3'>
					<span className='temperature positionrel herofont marginauto'>{getTemperature(allWeather.currentWeather.main.temp, scale)}</span>
				</div>
				<span id='CurrentWeather-min' className='temperature hugefont hugefont-height positionabs'>{getTemperature(allWeather.currentWeather.main.temp_min, scale)}</span>
			</div>
			<span className='smallerfont color3 marginauto-width'>{'As of: ' + lastWeatherDate}</span>
		</section>
		{/* <article id='CurrentWeatherCard-container' className='displayflex'>
			<article id='CurrentWeatherCard' className='card displayflex flexcol marginauto positionrel'>
				<header id='CurrentWeatherCard-temperature' className='temperature positionrel herofont'>{getTemperature(allWeather.currentWeather.main.temp, scale)}</header>
				<section id='CurrentWeatherCard-details' className='displayflex flexcol'>
					<div id='CurrentWeatherCard-description' className='medfont medfont-height'>{allWeather.currentWeather.weather[0].description}</div>
					<div id='CurrentWeatherCard-minmax' className='displayflex'>
						<span className='temperature bigfont bigfont-height'>{getTemperature(allWeather.currentWeather.main.temp_max, scale)}</span>
						<span className='temperature bigfont bigfont-height'>{getTemperature(allWeather.currentWeather.main.temp_min, scale)}</span>
					</div>
				</section>
				<div className='weather-icon-container positionabs'>
					<React.Suspense fallback={<></>}>
						{(weatherCodeObj.timeIcon) ? weatherCodeObj.timeIcon : weatherCodeObj.icon}
					</React.Suspense>
				</div>
			</article>
		</article> */}
	</article>
};

export default CurrentWeatherCard;