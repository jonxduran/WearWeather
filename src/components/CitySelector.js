import React, { Component } from 'react';
import * as WeatherApi from '../api/WeatherApi';


class CitySelector extends Component {
	
	_cityCheck(city) {
		console.log('_cityCheck for ', city);
		console.log(this.props.weather);
		let match = false;
		for (let i = 0; i < this.props.weather.length; i++) {
			if (city.localCompare(this.props.weather[i].name) > 0) {
				match = true;
				console.log('city ' + city + ' matched with weather name ' + this.props.weather[i].name);
			}
		};
		if (false === match) {
			function getAllData(){
				return Promise.all([
					WeatherApi._getCurrentData(city), 
					WeatherApi._getHourlyData(city), 
					WeatherApi._getExtendedData(city)
				]);
			};
			getAllData().then(([currentData, hourlyData, extendedData]) => {
				console.log('CitySelector data: ', [currentData, hourlyData, extendedData]);
				if (currentData.error || hourlyData.error || extendedData.error) {
					alert('Weather data error');
					document.querySelector('#CityInput').value = '';
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
					this.props.cityPick(newCity);
				}
			});

		} else {
			alert('City already added, select a new city');
			document.querySelector('#CityInput').value = '';
		};

	}

	render() {
		return (<article id='CitySelector' className='card card-shadow displayflex flexcol marginauto'>
			<header className='card-header card-row'>
				<span className='biggerfont'>Select a City</span>
			</header>
			<section className='card-row displayflex flexcol'>
				<input id='CityInput' className='outline-input biggerfont-height' type='text' name='zip'></input>
			</section>
			<section className='card-row displayflex'>
				<button className='outline-button green-button marginauto nonselect' onClick={()=>this._cityCheck(document.querySelector('#CityInput').value)}>Submit</button>
			</section>
		</article>);
	}
};

export default CitySelector;