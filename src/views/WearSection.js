import React, { useState } from 'react';
import WearPicker from './WearPicker';
import WearSuggester from './WearSuggester';
import ClothingMap from '../assets/clothingMap.json';


const WearSection = (props) => {

	/* console.log('WearSection usersettings: ', props.userSettings); */
	/* let ClothingMap = JSON.parse(JSON.stringify(ClothingMap)); */
	const clothingMapKeys = Object.keys(ClothingMap);
	const clothingMapKeysLength = clothingMapKeys.length;
	for (let i = 0; i < clothingMapKeysLength; i++) {
		let clothingTitles = Object.keys(ClothingMap[clothingMapKeys[i]]);
		let clothingTitlesLength = clothingTitles.length;
		for (let j = 0; j < clothingTitlesLength; j++) {
			if (props.userSettings.pronoun === "he") {
				if (ClothingMap[clothingMapKeys[i]][clothingTitles[j]]['pronoun'] === "she") {
					delete ClothingMap[clothingMapKeys[i]][clothingTitles[j]];
				};
			} else if (props.userSettings.pronoun === "she") {
				if (ClothingMap[clothingMapKeys[i]][clothingTitles[j]]['pronoun'] === "he") {
					delete ClothingMap[clothingMapKeys[i]][clothingTitles[j]];
				};
			};
		};
	};

	const [clothing, setClothing] = useState(ClothingMap);

	const wearSetter = function(clothesArr) {
		/* console.log('wearSetter clothesArr: ', clothesArr); */
		let oldClothingMap = JSON.parse(JSON.stringify(clothing));
		for (let i = 0; i < clothesArr.length; i++) {
			oldClothingMap[clothesArr[i].category][clothesArr[i].title] = clothesArr[i];
		};
		/* thisClothingMap = oldClothingMap; */
		setClothing(oldClothingMap);
	}

	return (
		<section id='WearSection' className='main-tab displayflex flexcol'>
			<WearSuggester weather={props.weather} currentCity={props.currentCity} editClothing={(clothesArr)=>wearSetter(clothesArr)} db={props.db} user={props.user} userSettings={props.userSettings} />
			<WearPicker weather={props.weather} currentCity={props.currentCity} clothing={clothing} editClothing={(clothing)=>wearSetter(clothing)} />
		</section>
	)

}

export default WearSection;