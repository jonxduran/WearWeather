import React, { useEffect, useRef } from 'react';
import { weatherDecoder } from '../status/WeatherHandler';
import { getTemperature, getSimpleTime } from '../assets/common';
import * as d3 from 'd3';


const HourlyWeatherCard = (props) => {
	const temperatureD3 = useRef(null);
	/* const humidityD3 = useRef(null); */

	const temperaturesArr = props.data.list.slice(0, 10).map(hw => {
		return { 
			'time': getSimpleTime((hw.dt*1000), props.scale),
			'temperature': getTemperature(hw.main.temp, props.scale),
			'icon': weatherDecoder(hw.weather[0].id).icon
		};
	});
	console.log(temperaturesArr);
	//const humidityArr = hourlyWeather.map(hw => hw.main.humidity);

	const _buildD3 = function(where, myData) {
		console.log(where, myData);
		/* d3.select(where)
			.data(myData)
			.enter()
			.append(); */
	};

	/* useEffect(() => {
		_buildD3(temperatureD3.current, temperaturesArr);
	}, [props.weather]); */

	
	return <article id='HourlyWeather-card' className='card fluent-card card-shadow displayflex'>
		<section id='HourlyWeather-scroll-section' className='displayflex flexcol'>
			<article id='HourlyWeather-cards-container' className='displayflex positionrel'>
				{ temperaturesArr.map((hw, i) => {
					return <article className='HourlyWeather-card displayflex flexcol' key={i}>
						<span className='HourlyWeather-time medfont medfont-height text-center'>{hw.time}</span>
						<span className='HourlyWeather-icon'>
							<React.Suspense fallback={<></>}>
								<span className='biggerfont biggerfont-height weather-icon-container'>{hw.icon}</span>
							</React.Suspense>
						</span>
						<span className='HourlyWeather-temperature medfont medfont-height text-center positionrel'>{hw.temperature}</span>
					</article>
				})}
				<section id='HourlyWeather-graphs-container' className='displayflex flexcol positionabs'>
					<article id='HourlyWeather-temperature-graph' className='d3-graph' ref={temperatureD3}></article>
				</section>
			</article>
		</section>
	</article>
};

export default HourlyWeatherCard;