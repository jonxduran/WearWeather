import React from 'react';
import WeatherSunnyIcon from 'mdi-react/WeatherSunnyIcon';
import WeatherNightIcon from 'mdi-react/WeatherNightIcon';
import { setNewSetting } from '../status/SettingsHandler';


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

export default function handlerToggleTheme(newActiveTheme) {
	Object.keys(themes).map(thm => {
		return themes[thm]['active'] = false
	});
	themes[newActiveTheme]['active'] = true;
	setNewSetting('theme', newActiveTheme);
	return themes;
};