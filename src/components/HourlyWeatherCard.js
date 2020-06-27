import React from 'react';
import { weatherDecoder } from '../status/WeatherHandler';
import { addLeadingZero, getTemperature } from '../assets/common';


const HourlyWeatherCard = (props) => {
	let dte = new Date(props.data.dt*1000);
	return <article className='HourlyWeather-card displayflex flexcol'>
		<span className='HourlyWeather-time medfont medfont-height text-center'>{dte.getHours() + ':' + addLeadingZero(dte.getMinutes())}</span>
		<span className='HourlyWeather-icon'>
			<React.Suspense fallback={<></>}>
				<span className='biggerfont biggerfont-height weather-icon-container'>{weatherDecoder(props.data.weather[props.currentCity].id).icon}</span>
			</React.Suspense>
		</span>
		<span className='HourlyWeather-temperature medfont medfont-height text-center positionrel'>{getTemperature(props.data.main.temp, props.scale)}</span>
	</article>
};

export default HourlyWeatherCard;