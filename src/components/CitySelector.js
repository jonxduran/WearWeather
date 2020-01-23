import React, { useRef } from 'react';
import { _getAllData } from '../api/WeatherApi';


const CitySelector = (props) => {

	const cityInputRef = useRef();

	const _cityCheck = (city) => {
		console.log('_cityCheck for ', city);
		let match = false;
		if (null !== props.weather && props.weather.length > 0) {
			for (let i = 0; i < props.weather.length; i++) {
				if (city.localCompare(props.weather[i].name) > 0) {
					match = true;
					console.log('city ' + city + ' matched with weather name ' + props.weather[i].name);
				}
			};
		};
		if (false === match) {
			_getAllData(city)
			.then(([currentData, hourlyData, extendedData]) => {
				console.log('CitySelector data: ', [currentData, hourlyData, extendedData]);
				if (currentData.error || hourlyData.error || extendedData.error) {
					alert('Weather data error');
					cityInputRef.current.value = '';
				} else {
					let newCity = {
						'index': 0,
						'name': currentData.name,
						'id': currentData.id,
						'currentWeather': currentData,
						'hourlyWeather': hourlyData,
						'extendedWeather': extendedData
					}
					console.log('newcity: ', newCity);
					props.cityPick(newCity);
				}
			});
		} else {
			alert('City already added, select a new city');
			cityInputRef.current.value = '';
		};
	}

	return (<article id='CitySelector' className='card card-shadow displayflex flexcol marginauto'>
		<header className='card-header card-row'>
			<span className='biggerfont'>Select a City</span>
		</header>
		<section className='card-row displayflex flexcol'>
			<input id='CityInput' className='outline-input biggerfont-height' type='text' name='zip' ref={cityInputRef}></input>
		</section>
		<section className='card-row displayflex'>
			<button className='outline-button green-button marginauto nonselect' onClick={()=>_cityCheck(cityInputRef.current.value)}>Submit</button>
		</section>
	</article>);

};


export default CitySelector;