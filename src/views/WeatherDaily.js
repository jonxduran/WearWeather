import React, { useEffect, useRef } from 'react';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyWeatherCard from '../components/HourlyWeatherCard';
import ExtendedWeatherCard from '../components/ExtendedWeatherCard'
import { addLeadingZero, getTemperature } from '../assets/common';
import * as d3 from 'd3';


const WeatherDaily = (props) => {

	const humidityD3 = useRef(null);
	console.log('WeatherDaily props: ', props);
	const hourlyWeather = props.weather[props.currentCity].hourlyWeather.list.slice(0,10);
	
	const temperaturesArr = hourlyWeather.map(hw => getTemperature(hw.main.temp, props.scale));
	const humidityArr = hourlyWeather.map(hw => hw.main.humidity);
	

	useEffect(() => {
		_buildD3(humidityD3.current, humidityArr);
	}, [props.weather]);


	const _buildD3 = function(where, data) {
		console.log(where, data);
		//d3.select(humidityD3)
	};


	return (
		<section id='WeatherDaily' className='main-tab flexcol'>
			{ (props.weather && (props.weather.length > 0)) ? (
				<>
				<section id='CurrentWeather-section' className='positionrel'>
					{ props.weather.map((allW, i) => {
						return <CurrentWeatherCard key={i} allWeather={allW} scale={props.scale} currCity={props.currentCity} weatherCodeObj={props.weatherCodeObj} />
					}) }
				</section>

				<section id='HourlyWeather-section' className='displayflex flexcol'>
					<article id='HourlyWeather-card' className='card fluent-card card-shadow displayflex'>
						<section id='HourlyWeather-scroll-section' className='displayflex flexcol'>
							<article id='HourlyWeather-cards-container' className='displayflex positionrel'>
								{hourlyWeather.map((wh, i) => {
									return <HourlyWeatherCard data={wh} scale={props.scale} currentCity={props.currentCity} key={i} />
								}) }
								<section id='HourlyWeather-graphs-container' className='displayflex flexcol positionabs'>
									<article id='HourlyWeather-humidity-graph' className='d3-graph' ref={humidityD3}></article>
								</section>
							</article>
						</section>
					</article>
				</section>

				<section id='ExtendedWeather-section' className='displayflex flexcol'>
					<article id='ExtendedWeather-card' className='card fluent-card card-shadow displayflex flexcol'>
						{props.weather[props.currentCity].extendedWeather.list.map((wh, i) => {
							return <ExtendedWeatherCard data={wh} scale={props.scale} currentCity={props.currentCity} key={i} />
						}) }
					</article>
				</section>
				</>
			) : null }
		</section>
	);

};


export default WeatherDaily;