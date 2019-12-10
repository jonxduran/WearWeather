import React from 'react';
import * as Common from '../assets/common';


const ExtendedWeatherCard = (props) => {
	let dte = new Date(props.data.dt*1000);
	return <article className='card ExtendedWeather-card displayflex'>
		<div className='ExtendedWeather-day'>
			<span>{Common.weekDays[dte.getDay()]}</span>
		</div>
		<div className='ExtendedWeather-icon'>
			<span>{props.data.weather[0].main}</span>
		</div>
		<div className='ExtendedWeather-temp displayflex'>
			<span>{Common._getTemperature(props.data.temp.max, props.scale)}°</span>
			<span>{Common._getTemperature(props.data.temp.min, props.scale)}°</span>
		</div>
		
	</article>
};

export default ExtendedWeatherCard;