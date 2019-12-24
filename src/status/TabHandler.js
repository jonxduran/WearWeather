import React from 'react';
import CalendarIcon from 'mdi-react/CalendarIcon';
import TshirtVIcon from 'mdi-react/TshirtVIcon';


let tabs = [
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
];
export const initTab = localStorage.getItem("currentTab") || 0;

export function toggleTab(n) {
	let newTabs = tabs.slice();
	for (let i = 0; i < 2; i++) {
		newTabs[i] = {...newTabs[i], 'active': false};
	};
	newTabs[n]['active'] = true;
	return newTabs;
}