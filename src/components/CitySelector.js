import React, { Component } from 'react';
import * as WeatherApi from '../api/WeatherApi';


class CitySelector extends Component {
	
	_cityCheck(city) {
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
					document.querySelector('#cityInput').value = '';
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
			document.querySelector('#cityInput').value = '';
		};

	}

	render() {
		return (<article id='CitySelector' className='card card-shadow displayflex flexcol marginauto'>
			<header className='card-header card-row'>
				<span className='biggerfont'>Select a City</span>
			</header>
			<section className='card-row displayflex flexcol'>
				<input id='cityInput' type='text' name='zip'></input>
				<button className='outline-button blue-button' onClick={()=>this._cityCheck(document.querySelector('#cityInput').value)}>Submit</button>
			</section>
			<section className='card-row'></section>
		</article>);
	}
};

export default CitySelector;