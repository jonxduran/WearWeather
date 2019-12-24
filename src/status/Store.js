import React, { useState, useReducer } from 'react';
import * as SettingsHandler from './SettingsHandler';
import handlerToggleTheme from './ThemeHandler';


const CTX = React.createContext();
export { CTX };

let initSettings = JSON.parse(localStorage.getItem("userSettings")) || SettingsHandler.getSettings();
let initThemeObj = handlerToggleTheme(initSettings.theme);
console.log(initSettings, initThemeObj);

export default function Store(props) {

	const stateHook = React.useState({ 
		'userSettings': initSettings,
		'themeObj': initThemeObj
	});

	return (
		<CTX.Provider value={stateHook}>
			{props.children}
		</CTX.Provider>
	)

}