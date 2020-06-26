import React from 'react';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyWeatherCard from '../components/HourlyWeatherCard';
import ExtendedWeatherCard from '../components/ExtendedWeatherCard'


const WeatherDaily = (props) => {

	console.log('WeatherDaily props: ', props);

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
					{props.weather[props.currentCity].hourlyWeather.list.slice(0,9).map((wh, i) => {
						return <HourlyWeatherCard data={wh} scale={props.scale} key={i} />
					}) }
				</section>

				<section id='ExtendedWeather-section' className='displayflex flexcol'>
					{props.weather[props.currentCity].extendedWeather.list.map((wh, i) => {
						return <ExtendedWeatherCard data={wh} scale={props.scale} currentCity={props.currentCity} key={i} />
					}) }
				</section>
				</>
			) : null }
		</section>
	);

};


export default WeatherDaily;