import React, { useState } from 'react';
import WearPicker from './WearPicker';
import WearSuggester from './WearSuggester';
import ClothingMap from '../assets/clothingMap.json';


const WearSection = (props) => {

	console.log('***** ***** ClothingMap: ', ClothingMap);
	/* const OGClothingMap = JSON.parse(JSON.stringify(ClothingMap)); */

	const [clothing, setClothing] = useState(ClothingMap);

	const WearSetter = function(clothesArr) {
		console.log('WearSetter clothesArr: ', clothesArr);
		let newClothingMap = JSON.parse(JSON.stringify(clothing));
		for (let i = 0; i < clothesArr.length; i++) {
			let tempClothingItem = newClothingMap[clothesArr[i].section][clothesArr[i].name];
			console.log(tempClothingItem);
			tempClothingItem['selected'] = true;
		};
		console.log('setClothing with newClothingMap: ', newClothingMap);
		setClothing(newClothingMap);
	}

	return (
		<section id='WearSection' className='main-tab displayflex flexcol'>
			<WearPicker clothing={clothing} />
			<WearSuggester suggestWear={(clothesArr)=>WearSetter(clothesArr)} />
		</section>
	)

}

export default WearSection;