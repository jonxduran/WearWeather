import React from 'react';
import WeatherSunnyIcon from 'mdi-react/WeatherSunnyIcon';
import WeatherNightIcon from 'mdi-react/WeatherNightIcon';
import CellphoneIcon from 'mdi-react/CellphoneIcon';
import { setNewSetting } from '../status/SettingsHandler';


const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const OSTheme = handleDarkmode(darkModeMediaQuery);
function handleDarkmode(e){
	const darkModeOn = e.matches;
	return (darkModeOn) ? 'dark-theme' : 'light-theme';
};
console.log('OSTheme: ', OSTheme);


let themes = {
	"light-theme": {
		"active": false,
		"title": "Light",
		"class": "light-theme",
		"icon": <WeatherSunnyIcon />
	},
	"dark-theme": {
		"active": false,
		"title": "Dark",
		"class": "dark-theme",
		"icon": <WeatherNightIcon />
	},
	"device-theme" : {
		"active": false,
		"title": "Device",
		"class": OSTheme,
		"icon": <CellphoneIcon />
	}
};

export default function handlerToggleTheme(newActiveTheme) {
	/* console.log('newActiveTheme: ', newActiveTheme); */
	Object.keys(themes).map(thm => {
		return themes[thm]['active'] = false
	});
	themes[newActiveTheme]['active'] = true;
	setNewSetting('theme', newActiveTheme);
	return themes;
};