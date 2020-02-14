import React from 'react';
import * as Common from '../assets/common';


const HourlyWeatherCard = (props) => {
	let dte = new Date(props.data.dt*1000);
	return <article className='HourlyWeatherCard displayflex'>
		<span>{Common.getTemperature(props.data.main.temp, props.scale)}°</span>
		<span>{dte.getHours() + ':' + Common.addLeadingZero(dte.getMinutes())}</span>
	</article>
};

export default HourlyWeatherCard;