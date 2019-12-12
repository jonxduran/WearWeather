import React, { Component } from 'react';
import * as WeatherApi from '../api/WeatherApi';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyWeatherCard from '../components/HourlyWeatherCard';
import ExtendedWeatherCard from '../components/ExtendedWeatherCard'
import CitySelector from '../components/CitySelector';
import * as Common from '../assets/common';
/* import { fail } from 'assert'; */


class WeatherTab extends Component {

	constructor(props) {
		super(props);
		let allLoading = true;
		let weather = [];
		if (props.weather !== null) {
			weather = props.weather;
			allLoading = false;
		};
		this.state = {
			'weather': weather,
			'currentCity': 0,
			'weatherCached': props.weatherCached,
			'scale': props.scale,
			'allLoading': allLoading
		};
	}
	
	componentDidMount() {
		console.log('weathertab did mount');
		if (this.state.weatherCached) {
			/* this._getNewWeather(); */
			this._refreshWeather(0);
		}
	}

	_setNewCity(cityWeather) {
		console.log('new weather for city: ', cityWeather);
		Common._addToWeather(this.state.weather, cityWeather);
		this.setState({ 'weather': [cityWeather], 'allLoading': false });
		this.props.currWeatherUpdate([cityWeather]);
		console.log(this.state);
	}

	_refreshButton() {
		this._refreshWeather(this.state.currentCity);
	}

	_refreshWeather(i) {
		this.setState({ 'allLoading': true });
		let weather = this.state.weather;
		let getAllData = WeatherApi._getAllData(weather, i);
		getAllData().then(([currentData, hourlyData, extendedData]) => {
			console.log([currentData, hourlyData, extendedData]);
			if (currentData.error || hourlyData.error || extendedData.error) {
				console.log('_refreshWeather getAllData error');
				this.setState({ 'weather': weather, 'allLoading': false });
			} else {
				weather[i].currentWeather = currentData;
				weather[i].hourlyWeather = hourlyData;
				weather[i].extendedWeather = extendedData;
				console.log('_refreshWeather weathercheck: ', weather);
				Common._setWeatherCache(weather);
				this.props.currWeatherUpdate(weather);
				this.setState({ 'weather': weather, 'allLoading': false });
			}
		});

	}

	render() {
		console.log('WeatherTab ', this.state);
		return (
			<section id='WeatherTab' className={'main-tab flexcol' + ((this.props.active===true) ? ' active' : '')}>
				{ (this.state.weather.length > 0) ? (
					(this.state.allLoading) ? (
						<span className='marginauto'>loading</span>
					) : (
						<>
						<section id='CurrentWeather-section' className='positionrel'>
							
							{ this.state.weather.map((city, i) => {
								return <CurrentWeatherCard key={i} cty={city} scale={this.state.scale} currCity={this.state.currentCity} />
							}) }

						</section>

						<section id='HourlyWeather-section' className='displayflex flexcol'>
							{this.state.weather[this.state.currentCity].hourlyWeather.list.slice(0,9).map((wh, i) => {
								return <HourlyWeatherCard data={wh} scale={this.state.scale} key={i} />
							}) }
						</section>

						<section id='ExtendedWeather-section' className='displayflex flexcol'>
							{this.state.weather[this.state.currentCity].extendedWeather.list.map((wh, i) => {
								return <ExtendedWeatherCard data={wh} scale={this.state.scale} key={i} />
							}) }
						</section>
						</>
					)
				) : (
					<CitySelector weather={this.state.weather} cityPick={(city)=>this._setNewCity(city)} />
				) }
			</section>
		)
	}

}

export default WeatherTab;