import React, { useState } from 'react';
import ClothingItem from '../components/ClothingItem';


const WearPicker = (props) => {
	
	const clothingCategories = Object.keys(props.clothing);
	const clothingCategoriesLength = clothingCategories.length;

	const selectedClothes = [];
	const otherClothes = [];
	for (let cc = 0; cc < clothingCategoriesLength; cc++) {
		otherClothes[clothingCategories[cc]] = [];
	};

	for (let c = 0; c < clothingCategoriesLength; c++) {
		const category = clothingCategories[c];
		/* console.log('  category: ', category); */
		const categoryItems = props.clothing[clothingCategories[c]];
		/* console.log('  categoryItems: ', categoryItems); */
		const categoryItemsKeys = Object.keys(categoryItems);
		/* console.log('  categoryItemsKeys: ', categoryItemsKeys); */
		const categoryItemsKeysLength = categoryItemsKeys.length;
		for (let i = 0; i < categoryItemsKeysLength; i++) {
			if (true === categoryItems[categoryItemsKeys[i]]['selected']) {
				selectedClothes.push(categoryItems[categoryItemsKeys[i]]);
			} else {
				otherClothes[category].push(categoryItems[categoryItemsKeys[i]]);
			};
		};
	};
	/* console.log('  -  selectedClothes: ', selectedClothes);
	console.log('  -  otherClothes: ', otherClothes); */


	const pickedClothing = function(cloth, direction) {
		cloth.selected = !cloth.selected;
		props.pickClothing([cloth]);
	};


	const submitClothing = function() {
		console.log('submitClothing');
	}


	return (
		<section id='WearPicker' className='main-tab displayflex flexcol'>
			
			<section id='AllWear-section'>
				<h3 className='Wear-header biggerfont bold4'>Pick your outfit</h3>
				<article id='AllWear-container' className='displayflex flexcol'>
					{ clothingCategories.map((clothcat, i) => {
						return (otherClothes[clothcat].length > 0) ? <section id={clothcat+'-section'} key={i}>
							<h4 className='bigfont bold4'>{clothcat}</h4>
							<section id={clothcat+'-container'} className='displayflex three-card-row'>
								{ otherClothes[clothcat].map((catcloth, j) => {
									return <ClothingItem key={j} data={catcloth} unPick={(cloth)=>pickedClothing(cloth, 'add')} addrem={'add'} />
								}) }
							</section>
						</section> : null
					}) }
				</article>
			</section>

			<section id='PickedWear-section'>
				<h3 className='Wear-header biggerfont bold4'>Today's Outfit</h3>
				{ (selectedClothes.length > 0) ? <>
					<section id='PickedWear-container' className='displayflex flexwrap three-card-row'>
						{ selectedClothes.map((selcloth, i) => {
							return <ClothingItem key={i} data={selcloth} unPick={(cloth)=>pickedClothing(cloth, 'rem')} addrem={'rem'} />
						}) }
					</section>
					<article id='PickedWear-submit-container' className='Wear-submit-container displayflex positionrel'>
						<button className='solid-button smallfont' onClick={submitClothing}>Submit</button>
					</article>
				</> : <article id='NoSelectedCards' className='displayflex flexcol nonselect'>
						<p className='marginauto medfont'>No Clothes Selected</p>
				</article> }
				
			</section> 

		</section>
	)

}

export default WearPicker;