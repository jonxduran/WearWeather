import React from 'react';
import WideCard from './WideCard';
import { roundNumber } from '../../assets/common';


const WearSidebar = (props) => {

	const clothingCategories = Object.keys(props.clothing);
	const clothingCategoriesLength = clothingCategories.length;
	const selectedClothes = [];

	for (let c = 0; c < clothingCategoriesLength; c++) {
		const categoryItems = props.clothing[clothingCategories[c]];
		const categoryItemsKeys = Object.keys(categoryItems);
		const categoryItemsKeysLength = categoryItemsKeys.length;
		for (let i = 0; i < categoryItemsKeysLength; i++) {
			if (true === categoryItems[categoryItemsKeys[i]]['selected']) {
				selectedClothes.push(categoryItems[categoryItemsKeys[i]]);
			};
		};
	};
	console.log('  -  selectedClothes: ', selectedClothes);

	const editClothing = function(cloth) {
		props.editClothing([cloth]);
	};
	
	const submitClothing = function() {
		const tempNow = new Date();
		const tempTime = tempNow.getTime();
		const key = tempTime + '_' + roundNumber(props.weather[props.currentCityIndex].currentWeather.main.temp);
		console.log('key: ', key);
		const submittedClothing = {
			temperature: props.weather[props.currentCityIndex].currentWeather.main.temp,
			weatherId: props.weather[props.currentCityIndex].currentWeather.weather[0].id,
			clothing: selectedClothes,
			date: tempTime
		};
		console.log('submittedClothing ', submittedClothing);
	};

	const toggleSidebar = function() {
		document.getElementById('WearTab-sidebar').classList.toggle('show');
	};


	return (
		<aside id='WearTab-sidebar' className='card solid-card positionfixed displayflex flexcol'>
			<header className='biggerfont bigfont-height'>Cart</header>
			{ (selectedClothes.length > 0) ? <>
				<section id='WearSidebar-cards-container' className='displayflex flexcol'>
					{ selectedClothes.map((cloth, i) => {
						return <WideCard key={i} data={cloth} editCloth={(cloth)=>editClothing(cloth)} />
					}) }
				</section>
				<section id='WearSidebar-buttons-section'>
					<div className='buttons-container displayflex marginauto'>
						<button className='material-button teal-button' onClick={submitClothing}>Submit</button>
					</div>
				</section>
				</>
				: <section id='WearSidebar-cards-empty' className='displayflex flexcol medfont'>
					<p>Your <span role='img' aria-label='cart'>🛒</span> is empty!</p>
					<p>Add today's clothes</p> 
				</section>}
			<section id='WearSidebar-close-section'>
				<div id="WearCloseFAB" class="FAB">
					<span className="bigfont bigfont-height marginauto" onClick={toggleSidebar}>Close</span>
				</div>
			</section>
		</aside>
	);

};

export default WearSidebar;