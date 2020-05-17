import CONSTANTS from '../assets/constants.json';


const fakeClothes = [
	{ category: 'headwear', name: "beanie", title: 'beanie', primaryColor: '#333333', secondaryColor: '#2b2b2b', tertiaryColor: null, selected: true },
	{ category: 'socks', name: "ankle socks", title: 'ankleSocks', primaryColor: 'gray', secondaryColor: 'white', tertiaryColor: null, selected: true }
];

export function getClothes(db, userObject){
	
	return fakeClothes;
}