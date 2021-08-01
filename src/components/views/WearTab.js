import React, { useState } from 'react';
import WearPicker from './WearPicker';
import WearSuggester from './WearSuggester';
import WearCart from '../elements/WearCart';
import WearSidebar from '../elements/WearSidebar';
import { getInitUserSettings } from '../../data/status/SettingsHandler';
import { handlerToggleTheme } from '../../data/status/ThemeHandler';
import { weatherCacheCheck, getCurrentCityIndex } from '../../data/status/WeatherHandler';
import ClothingMap from '../../assets/clothingMap.json';


const WearTab = (props) => {

	const initUserSettings = getInitUserSettings(props.user);
	const initCurrentCityIndex = getCurrentCityIndex();
	const initWeatherCheck = weatherCacheCheck();

	const initState = {
		user: props.user,
		userSettings: initUserSettings,
		themeObj: (handlerToggleTheme(initUserSettings.theme)),
		currentCityIndex: initCurrentCityIndex,
		weather: initWeatherCheck['weather'],
		weatherCached: initWeatherCheck['isWeatherCached'],
		clothing: ClothingMap
	};
	const [wearState, setWearState] = useState(initState);
	
	
	/* console.log('WearTab usersettings: ', props.userSettings); */
	/* let ClothingMap = JSON.parse(JSON.stringify(ClothingMap)); */
	const clothingMapKeys = Object.keys(ClothingMap);
	const clothingMapKeysLength = clothingMapKeys.length;
	for (let i = 0; i < clothingMapKeysLength; i++) {
		let clothingTitles = Object.keys(ClothingMap[clothingMapKeys[i]]);
		let clothingTitlesLength = clothingTitles.length;
		for (let j = 0; j < clothingTitlesLength; j++) {
			if (wearState.userSettings.pronoun === "he") {
				if (ClothingMap[clothingMapKeys[i]][clothingTitles[j]]['pronoun'] === "she") {
					delete ClothingMap[clothingMapKeys[i]][clothingTitles[j]];
				};
			} else if (wearState.userSettings.pronoun === "she") {
				if (ClothingMap[clothingMapKeys[i]][clothingTitles[j]]['pronoun'] === "he") {
					delete ClothingMap[clothingMapKeys[i]][clothingTitles[j]];
				};
			};
		};
	};

	const wearSetter = function(clothesArr) {
		/* console.log('wearSetter clothesArr: ', clothesArr); */
		const newState = {...wearState};
		let editClothingMap = JSON.parse(JSON.stringify(newState.clothing));
		for (let i = 0; i < clothesArr.length; i++) {
			editClothingMap[clothesArr[i].category][clothesArr[i].title] = clothesArr[i];
		};
		newState.clothing = editClothingMap;
		setWearState(newState);
	};

	return (
		<section id='WearTab' className='main-tab displayflex positionrel'>
			<article id='WearTab-main' className='displayflex flexcol'>
				<WearSuggester weather={wearState.weather} currentCityIndex={wearState.currentCityIndex} editClothing={(clothesArr)=>wearSetter(clothesArr)} db={props.db} user={props.user} userSettings={wearState.userSettings} />
				<WearPicker weather={wearState.weather} currentCityIndex={wearState.currentCityIndex} clothing={wearState.clothing} editClothing={(clothing)=>wearSetter(clothing)} />
				<WearCart clothing={wearState.clothing} />
			</article>
			<WearSidebar weather={wearState.weather} currentCityIndex={wearState.currentCityIndex} clothing={wearState.clothing} editClothing={(clothing)=>wearSetter(clothing)} />
		</section>
	);

};

export default WearTab;