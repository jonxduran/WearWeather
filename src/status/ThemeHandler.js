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
/* console.log('OSTheme: ', OSTheme); */


export function getOSTheme() {
	return OSTheme;
};


let themes = {
	"light-theme": {
		"active": false,
		"title": "Light",
		"class": "light-theme",
		"key": "light-theme",
		"icon": <WeatherSunnyIcon />
	},
	"dark-theme": {
		"active": false,
		"title": "Dark",
		"class": "dark-theme",
		"key": "dark-theme",
		"icon": <WeatherNightIcon />
	},
	"system-theme" : {
		"active": false,
		"title": "System",
		"class": OSTheme,
		"key": "system-theme",
		"icon": <CellphoneIcon />
	}
};

export function handlerToggleTheme(newActiveTheme) {
	/* console.log('newActiveTheme: ', newActiveTheme); */
	Object.keys(themes).forEach(thm => {
		themes[thm]['active'] = false
	});
	themes[newActiveTheme]['active'] = true;
	setNewSetting('theme', themes[newActiveTheme]['key']);
	return themes;
};