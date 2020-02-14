import React from 'react';
import * as Common from '../assets/common';


const ExtendedWeatherCard = (props) => {
	let dte = new Date(props.data.dt*1000);
	return <article className='card ExtendedWeather-card displayflex'>
		<div className='ExtendedWeather-day'>
			<span className='medfont medfont-height'>{Common.weekDays[dte.getDay()]}</span>
		</div>
		<div className='ExtendedWeather-icon'>
			<span className='medfont medfont-height'>{props.data.weather[0].main}</span>
		</div>
		<div className='ExtendedWeather-temp displayflex'>
			<span className='medfont medfont-height'>{Common.getTemperature(props.data.temp.max, props.scale)}°</span>
			<span className='medfont medfont-height'>{Common.getTemperature(props.data.temp.min, props.scale)}°</span>
		</div>
		
	</article>
};

export default ExtendedWeatherCard;