import React from 'react';
import { weatherDecoder } from '../status/WeatherHandler';
import * as Common from '../assets/common';


const ExtendedWeatherCard = (props) => {
	const dte = new Date(props.data.dt*1000);
	return <article className='ExtendedWeather-row displayflex'>
		<div className='ExtendedWeather-day displayflex'>
			<span className='medfont medfont-height marginauto-height bold5'>{Common.weekDays[dte.getDay()]}</span>
		</div>
		<div className='ExtendedWeather-icon'>
			<React.Suspense fallback={<></>}>
				<span className='biggerfont biggerfont-height weather-icon-container'>{weatherDecoder(props.data.weather[props.currentCity].id).icon}</span>
			</React.Suspense>
		</div>
		<div className='ExtendedWeather-description'>
			<span className='medfont medfont-height marginauto-height'>{props.data.weather[0].main}</span>
		</div>
		<div className='ExtendedWeather-temp displayflex'>
			<span className='medfont medfont-height bold5'>{Common.getTemperature(props.data.temp.max, props.scale)}°</span>
			<span className='medfont medfont-height'>{Common.getTemperature(props.data.temp.min, props.scale)}°</span>
		</div>
		
	</article>
};

export default ExtendedWeatherCard;