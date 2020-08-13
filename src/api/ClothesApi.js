/* import CONSTANTS from '../assets/constants.json'; */
import { roundNumber } from '../assets/common';

/* const fakeClothes = [
	{
		"name": "sunglasses",
		"title": "sunglasses",
		"category": "headwear",
		"pronoun": "all",
		"primaryColor": "rgb(174, 159, 74)",
		"secondaryColor": "rgb(138, 154, 179)",
		"tertiaryColor": null,
		"selected": false
	},
	{
		"name": "long socks",
		"title": "longSocks",
		"category": "socks",
		"pronoun": "all",
		"primaryColor": "rgb(142, 44, 44)",
		"secondaryColor": "rgb(219, 202, 112)",
		"tertiaryColor": "rgb(219, 202, 112)",
		"selected": false
	}
]; */

let usersClothes = [
	{ 
		"clothing": [
			{ "category": "tops", "pronoun": "all", "name": "t-shirt", "primaryColor": "rgb(193, 163, 177)", "selected": true, "title": "tShirt" }, 
			{ "category": "bottoms", "pronoun": "he", "name": "shorts", "primaryColor": "rgb(43, 72, 109)", "selected": true, "title": "shorts" }
		], 
		"temperature": 298.37, 
		"weatherId": 800
	}
];

export function getClothes(db, temperature, userObject) {
	if (usersClothes.length > 0) {
		/* console.log('clothes here'); */
		/* return usersClothes; */
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

	/* return fakeClothes; */
};

const setClothes = function (data, temperature) {
	const tempHigh = roundNumber(temperature + 8);
	const tempLow = roundNumber(temperature - 8);
	console.log(temperature, tempHigh, tempLow);
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
	console.log('filteredData: ', filteredData);
	usersClothes = filteredData;
	/* return data[timeKeys[0]].clothing; */
};

export function getClothingSet() {
	const clothesLen = usersClothes.length;
	if (clothesLen === 0) {
		return [];
	};
	const random = Math.floor((Math.random() * clothesLen));
	return usersClothes[random].clothing;
};