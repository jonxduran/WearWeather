/* import CONSTANTS from '../assets/constants.json'; */


const fakeClothes = [
	{
		"name": "sunglasses",
		"title": "sunglasses",
		"category": "headwear",
		"gender": "neither",
		"primaryColor": "rgb(128, 49, 11)",
		"secondaryColor": "rgb(219, 202, 112)",
		"tertiaryColor": null,
		"selected": false
	},
	{
		"name": "long socks",
		"title": "longSocks",
		"category": "socks",
		"gender": "neither",
		"primaryColor": "rgb(142, 44, 44)",
		"secondaryColor": "rgb(219, 202, 112)",
		"tertiaryColor": null,
		"selected": false
	}
];

export function getClothes(db, userObject){
	
	return fakeClothes;
}