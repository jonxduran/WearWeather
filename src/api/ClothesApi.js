import { roundNumber } from '../assets/common';


let usersClothes = [
	{ 
		"clothing": [
			{ "category": "tops", "pronoun": "all", "name": "t-shirt", "primaryColor": "rgb(193, 163, 177)", "secondaryColor": null, "tertiaryColor": null, "selected": true, "title": "tShirt" }, 
			{ "category": "bottoms", "pronoun": "he", "name": "shorts", "primaryColor": "rgb(43, 72, 109)", "secondaryColor": null,	"tertiaryColor": null, "selected": true, "title": "shorts" }
		], 
		"temperature": 298.37, 
		"weatherId": 800
	},
	{ 
		"clothing": [
			{ "category": "tops", "pronoun": "all", "name": "sweater", "primaryColor": "rgb(142, 104, 86)", "secondaryColor": null,	"tertiaryColor": null, "selected": true, "title": "sweater" }, 
			{ "category": "bottoms", "pronoun": "he", "name": "jeans", "primaryColor": "rgb(45, 90, 75)", "secondaryColor": null, "tertiaryColor": null, "selected": true, "title": "jeans" }
		], 
		"temperature": 293.37, 
		"weatherId": 800
	}
];
/* let usersClothes = []; */

export function getClothes(db, temperature, userObject) {
	if (usersClothes.length > 0) {
		/* console.log('clothes here'); */
		return new Promise((resolve) => {
			resolve(getClothingSet());
		});
	} else {
		return new Promise((resolve) => {
			db.once('value').then(function (snapshot) {
				const data = (snapshot.val() && snapshot.val().data) || [];
				console.log('ClothesAPI data: ', data);
				setClothes(data, temperature);
				resolve(getClothingSet());
			});
		});
	};
};

const setClothes = function (data, temperature) {
	const tempHigh = roundNumber(temperature + 8);
	const tempLow = roundNumber(temperature - 8);
	console.log('setClothes temperature, high, low: ', temperature, tempHigh, tempLow);
	const timeKeys = Object.keys(data);
	const timeKeysLen = timeKeys.length;
	let filteredData = [];
	for (let i = 0; i < timeKeysLen; i++) {
		const keyTemperature = timeKeys[i].split('_')[1];
		console.log(keyTemperature);
		if ((keyTemperature <= tempHigh) && (tempLow <= keyTemperature)) {
			filteredData.push(data[timeKeys[i]]);
		};
	};
	console.log('setClothes() filteredData: ', filteredData);
	usersClothes = filteredData;
	/* return data[timeKeys[0]].clothing; */
};

export function getClothingSet() {
	const clothesLen = usersClothes.length;
	if (clothesLen === 0) {
		return [];
	};
	/* const random = Math.floor((Math.random() * clothesLen)); */
	return usersClothes;
};