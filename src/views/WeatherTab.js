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
		console.log(this.state);
	}

	_getWeather() {
		let oldWeatherStr = localStorage.getItem("weatherCache") || null;
		if (oldWeatherStr) {
			let oldWeather = JSON.parse(oldWeatherStr);
			let expireTime = new Date().getTime() - (10 * 60 * 1000);
			if (oldWeather.date < expireTime) {
				this._getNewWeather();
			} else {
				/* this.setState({ 'cities': oldWeather.cities }); */
			}
		} else {
			this._getNewWeather();
		}
	}

	_getNewWeather() {
		this.setState({ 'allLoading': true });
		console.log(this.state);
		let weather = this.state.weather;
		for (let i = 0; i < weather.length; i++) {
			let newCurrWeather = WeatherApi._getCurrentData(weather[i].zip);
			let newExtWeather = WeatherApi._getExtendedData(weather[i].zip);
			weather[i].currentWeather = newCurrWeather;
			weather[i].extendedWeather = newExtWeather;
			/* TODO: handle api fail, maybe move loading to top of html */
		}
		Common._setWeatherCache(weather);
		this.props.currWeatherUpdate(weather);
		/* let newCities = cities.filter((cty)=>{return cty.index===this.state.currentCity})[0];
		newCities.currentWeather = newCurrWeather;
		console.log('newCities: ', newCities); */
		this.setState({ 'weather': weather, 'allLoading': false });
	}

	_refreshWeather(i) {
		this.setState({ 'allLoading': true });
		let weather = this.state.weather;

		function getAllData(){
			return Promise.all([
				WeatherApi._getCurrentData(weather[i].name), 
				WeatherApi._getHourlyData(weather[i].name), 
				WeatherApi._getExtendedData(weather[i].name)
			]);
		};
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
		/* let cW = (this.state.cities.length > 0) ? this.state.cities[0].currentWeather : null; */
		/* let eW = (this.state.cities.length > 0) ? this.state.cities[0].extendedWeather : null; */
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