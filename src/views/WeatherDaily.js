import React from 'react';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyWeatherCard from '../components/HourlyWeatherCard';
import ExtendedWeatherCard from '../components/ExtendedWeatherCard'



const WeatherDaily = (props) => {
	/* console.log('WeatherDaily props: ', props); */
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
					<HourlyWeatherCard data={props.weather[props.currentCity]['hourlyWeather']} scale={props.scale} currentCity={props.currentCity} />			
				</section>

				<section id='ExtendedWeather-section' className='displayflex flexcol'>
					<article id='ExtendedWeather-card' className='card largecard fluent-card card-shadow displayflex flexcol'>
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