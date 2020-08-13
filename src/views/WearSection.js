import React from 'react';
import WearPicker from './WearPicker';
import WearSuggester from './WearSuggester';
import ClothingMap from '../assets/clothingMap.json';


const WearSection = (props) => {

	/* console.log('WearSection usersettings: ', props.userSettings); */
	let thisClothingMap = JSON.parse(JSON.stringify(ClothingMap));
	const clothingMapKeys = Object.keys(thisClothingMap);
	const clothingMapKeysLength = clothingMapKeys.length;
	for (let i = 0; i < clothingMapKeysLength; i++) {
		let clothingTitles = Object.keys(thisClothingMap[clothingMapKeys[i]]);
		let clothingTitlesLength = clothingTitles.length;
		for (let j = 0; j < clothingTitlesLength; j++) {
			if (props.userSettings.pronoun === "he") {
				if (thisClothingMap[clothingMapKeys[i]][clothingTitles[j]]['pronoun'] === "she") {
					delete thisClothingMap[clothingMapKeys[i]][clothingTitles[j]];
				};
			} else if (props.userSettings.pronoun === "she") {
				if (thisClothingMap[clothingMapKeys[i]][clothingTitles[j]]['pronoun'] === "he") {
					delete thisClothingMap[clothingMapKeys[i]][clothingTitles[j]];
				};
			};
		};
	};

	const wearSetter = function(clothesArr) {
		/* console.log('wearSetter clothesArr: ', clothesArr); */
		let oldClothingMap = JSON.parse(JSON.stringify(ClothingMap));
		for (let i = 0; i < clothesArr.length; i++) {
			oldClothingMap[clothesArr[i].category][clothesArr[i].title] = clothesArr[i];
		};
		thisClothingMap = oldClothingMap;
	}

	return (
		<section id='WearSection' className='main-tab displayflex flexcol'>
			<WearPicker weather={props.weather} currentCity={props.currentCity} clothing={thisClothingMap} editClothing={(newClothing)=>wearSetter(newClothing)} />
			<WearSuggester weather={props.weather} currentCity={props.currentCity} editClothing={(clothesArr)=>wearSetter(clothesArr)} db={props.db} user={props.user} userSettings={props.userSettings} />
		</section>
	)

}

export default WearSection;