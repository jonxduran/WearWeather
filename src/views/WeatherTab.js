import React from 'react';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyWeatherCard from '../components/HourlyWeatherCard';
import ExtendedWeatherCard from '../components/ExtendedWeatherCard'
import CitySelector from '../components/CitySelector';


const WeatherTab = (props) => {

	console.log('WeatherTab props: ', props);
	/*const [allLoading, setAllLoading] = useState((props.weather !== null) ? false : true);*/

	const _sendNewCity = (cityWeather) => {
		console.log('new weather for city: ', cityWeather);
		props.getNewCity(cityWeather);
	};

	return (
		<section id='WeatherTab' className={'main-tab flexcol' + ((props.active===true) ? ' active' : '')}>
			{ (props.weather && (props.weather.length > 0)) ? (
				(props.allLoading) ? (
					<span className='marginauto'>loading</span>
				) : (
					<>
					<section id='CurrentWeather-section' className='positionrel'>
						
						{ props.weather.map((city, i) => {
							return <CurrentWeatherCard key={i} cty={city} scale={props.scale} currCity={props.currentCity} />
						}) }

					</section>

					<section id='HourlyWeather-section' className='displayflex flexcol'>
						{props.weather[props.currentCity].hourlyWeather.list.slice(0,9).map((wh, i) => {
							return <HourlyWeatherCard data={wh} scale={props.scale} key={i} />
						}) }
					</section>

					<section id='ExtendedWeather-section' className='displayflex flexcol'>
						{props.weather[props.currentCity].extendedWeather.list.map((wh, i) => {
							return <ExtendedWeatherCard data={wh} scale={props.scale} key={i} />
						}) }
					</section>
					</>
				)
			) : (
				<CitySelector weather={props.weather} cityPick={(city)=>_sendNewCity(city)} />
			) }
		</section>
	);

};


export default WeatherTab;