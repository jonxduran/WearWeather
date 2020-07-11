import CONSTANTS from '../assets/constants.json';


const fakeClothes = [
	{
		"name": "sunglasses",
		"title": "sunglasses",
		"category": "headwear",
		"gender": "neither",
		"primaryColor": "brown",
		"secondaryColor": null,
		"tertiaryColor": null,
		"selected": false
	},
	{
		"name": "long socks",
		"title": "longSocks",
		"category": "socks",
		"gender": "neither",
		"primaryColor": "red",
		"secondaryColor": null,
		"tertiaryColor": null,
		"selected": false
	}
];

export function getClothes(db, userObject){
	
	return fakeClothes;
}