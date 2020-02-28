import React, { useState } from 'react';
import WearPicker from './WearPicker';
import WearSuggester from './WearSuggester';
import ClothingMap from '../assets/clothingMap.json';


const WearSection = (props) => {

	console.log('WearSection usersettings: ', props.userSettings);
	const clothingMapKeys = Object.keys(ClothingMap);
	const clothingMapKeysLength = clothingMapKeys.length;
	for (let i = 0; i < clothingMapKeysLength; i++) {
		let clothingTitles = Object.keys(ClothingMap[clothingMapKeys[i]]);
		let clothingTitlesLength = clothingTitles.length;
		for (let j = 0; j < clothingTitlesLength; j++) {
			if (props.userSettings.gender === "male") {
				if (ClothingMap[clothingMapKeys[i]][clothingTitles[j]]['gender'] === "female") {
					delete ClothingMap[clothingMapKeys[i]][clothingTitles[j]];
				}
			} else if (props.userSettings.gender === "female") {
				if (ClothingMap[clothingMapKeys[i]][clothingTitles[j]]['gender'] === "male") {
					delete ClothingMap[clothingMapKeys[i]][clothingTitles[j]];
				}
			};
		};
	};

	console.log('***** ***** ClothingMap: ', ClothingMap);
	/* const OGClothingMap = JSON.parse(JSON.stringify(ClothingMap)); */

	const [clothing, setClothing] = useState(ClothingMap);

	const wearSetter = function(clothesArr) {
		console.log('wearSetter clothesArr: ', clothesArr);
		let oldClothingMap = JSON.parse(JSON.stringify(clothing));
		for (let i = 0; i < clothesArr.length; i++) {
			oldClothingMap[clothesArr[i].category][clothesArr[i].title] = clothesArr[i];
		};
		console.log('setClothing with oldClothingMap: ', oldClothingMap);
		setClothing(oldClothingMap);
	}

	return (
		<section id='WearSection' className='main-tab displayflex flexcol'>
			<WearPicker clothing={clothing} pickClothing={(clothing)=>wearSetter(clothing)} />
			<WearSuggester weather={props.weather} currentCity={props.currentCity} suggestWear={(clothesArr)=>wearSetter(clothesArr)} />
		</section>
	)

}

export default WearSection;