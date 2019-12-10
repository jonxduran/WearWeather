import React, { Component } from 'react';
/* import AccountCircleOutlineIcon from 'mdi-react/AccountCircleOutlineIcon'; */
import WeatherSunnyIcon from 'mdi-react/WeatherSunnyIcon';
import WeatherNightIcon from 'mdi-react/WeatherNightIcon';


let themes = {
	"light-theme": {
		"active": false,
		"title": "Light",
		"icon": <WeatherSunnyIcon />
	},
	"dark-theme": {
		"active": false,
		"title": "Dark",
		"icon": <WeatherNightIcon />
	}
};


class SettingsBar extends Component {

	constructor(props) {
		super(props);
		themes[props.theme]['active'] = true;
		console.log('themes: ', themes);
		this.state = {
			themes: themes,
			menuOpen: false
		};
	}

	_toggleTheme(newActiveTheme) {
		let newThemes = {...this.state.themes};
		Object.keys(newThemes).map(thm => {
			return newThemes[thm]['active'] = false
		});
		newThemes[newActiveTheme]['active'] = true;
		console.log('newThemes: ', newThemes);
		try {
			localStorage.setItem('themeCache', newActiveTheme);
		} catch(err) {
			console.log('localStorage error: ', err);
		}
		this.props.themeChange(newActiveTheme);
		this.setState({ 'themes': newThemes });
	}

	_toggleMenu() {
		console.log('hi');
		this.setState(prevState => ({
			...prevState,
			menuOpen: !prevState.menuOpen
		}));
	}

	render() {
		return (
			<article id='SettingsBar' className='positionrel'>
				<section id='SettingsButtons-section' className='displayflex'>
					<div id='Settings-overflow-icon' className={'Settings-icon displayflex flexcol positionrel' + ((this.state.menuOpen) && ' open')} onClick={()=>this._toggleMenu()}>
						<span className='Settings-overflow-dot'></span>
						<span className='Settings-overflow-line-container displayflex marginauto positionrel'>
							<span className='Settings-overflow-line positionabs'></span>
							<span className='Settings-overflow-line positionabs'></span>
						</span>
						<span className='Settings-overflow-dot'></span>
					</div>
				</section>
				<section id='Overflow-section' className={'positionabs flexcol popup popup-shadow' + ((this.state.menuOpen) && ' open')}>
					
					<div className='Overflow-row positionrel'>
						{ Object.keys(this.state.themes).map((thm, i) => {
							return ( <div key={i} className={'theme-switcher positionabs displayflex ' + ((this.state.themes[thm]['active'] === true) ? 'active' : '')} onClick={()=>this._toggleTheme(thm)}>
								<span className='theme-icon'>{this.state.themes[thm]['icon']}</span>
								<span className='theme-title'>{this.state.themes[thm]['title']}</span>
							</div> )
						}) }
					</div>
				</section>
			</article>
		)
	}

}

export default SettingsBar;