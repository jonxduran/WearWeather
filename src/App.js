import React, { Component } from 'react';
import './styles/ThemeSwitcher.scss';
import CalendarIcon from 'mdi-react/CalendarIcon';
import TshirtVIcon from 'mdi-react/TshirtVIcon';
/* import AccountCircleOutlineIcon from 'mdi-react/AccountCircleOutlineIcon'; */
import Navbar from './views/Navbar';
import SettingsBar from './views/SettingsBar';
import WeatherTab from './views/WeatherTab';
import WearTab from './views/WearTab';



class App extends Component {
	
	constructor(props) {
		super(props);

		console.log('getting location');

		let scale = localStorage.getItem("scale") || 'f';
		let weather = null;
		let weatherCached = false;
		let oldWeatherStr = localStorage.getItem("weatherCache") || null;
		if (oldWeatherStr){
			let oldWeather = JSON.parse(oldWeatherStr);
			console.log('oldWeather: ', oldWeather);
			let cacheDate = new Date(oldWeather.date);
			let checkTime = new Date().getTime() - (15 * 60 * 1000);
			let checkDate = new Date(checkTime);
			console.log('cacheDate: ', cacheDate, ' isGreater?checkDate: ', checkDate);
			weather = oldWeather.weather;
			if (oldWeather.date < checkTime) {
				weatherCached = true;
				console.log('oldWeather is old, marking as cached');
			} else {
				console.log('oldWeather is more recent than checkDate');
			}
		}
		
		this.state = {
			"tabs": [
				{
					"title": "Today",
					"icon": <CalendarIcon />,
					"active": true
				},
				{
					"title": "Wear",
					"icon": <TshirtVIcon />,
					"active": false
				}
			],
			"theme": props.theme,
			"weather": weather,
			"weatherCached": weatherCached,
			'scale': scale,
			"user": props.user
		}
	};

	_tabChanged(newTab) {
		console.log('App newTab: ', newTab);
	}

	_themeChange(newTheme) {
		this.setState({ "theme": newTheme });
	}
	
	_setCurrentWeather(newWeather) {
		console.log('App setting new Current Weather: ', newWeather);
		this.setState({ "weather": newWeather });
	}

	_setNewTheme(newTheme) {
		console.log('setNewTheme: ', newTheme);
		this.setState({ 'theme': newTheme });
	}

	render() {
		return (
			<div id='App' className={'displayflex ' + ((this.state.user === null) ? 'nouser ' : '') + this.state.theme}>
				<main id='App-main' className='displayflex marginauto'>
					<div id='App-main-inner' className='displayflex'>
						<WeatherTab active={this.state.tabs[0]['active']} weather={this.state.weather} weatherCached={this.state.weatherCached} currWeatherUpdate={(newWeather)=>this._setCurrentWeather(newWeather)} scale={this.state.scale} />
						<WearTab active={this.state.tabs[1]['active']} weather={this.state.weather} scale={this.state.scale} />
					</div>
				</main>
				<SettingsBar theme={this.state.theme} themeChange={(newTheme)=>this._setNewTheme(newTheme)} />
				<Navbar tabs={this.state.tabs} tabClick={(newTab)=>this._tabChanged(newTab)} weather={this.state.weather} />
			</div>
		);
	};
}

export default App;
