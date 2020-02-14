import React, { useState } from 'react';
import ClothingItem from '../components/ClothingItem';


const WearPicker = (props) => {
	
	const clothingCategories = Object.keys(props.clothing);
	console.log('clothingCategories: ', clothingCategories);
	console.log('clothing: ', props.clothing);
	const clothingCategoriesLength = clothingCategories.length;

	const selectedClothes = [];
	const otherClothes = [];
	for (let cc = 0; cc < clothingCategoriesLength; cc++) {
		otherClothes[clothingCategories[cc]] = [];
	};

	for (let c = 0; c < clothingCategoriesLength; c++) {
		const category = clothingCategories[c];
		console.log('  category: ', category);
		const categoryItems = props.clothing[clothingCategories[c]];
		console.log('  categoryItems: ', categoryItems);
		const categoryItemsKeys = Object.keys(categoryItems);
		console.log('  categoryItemsKeys: ', categoryItemsKeys);
		const categoryItemsKeysLength = categoryItemsKeys.length;
		for (let i = 0; i < categoryItemsKeysLength; i++) {
			if (true === categoryItems[categoryItemsKeys[i]]['selected']) {
				selectedClothes.push(categoryItems[categoryItemsKeys[i]]);
			} else {
				otherClothes[category].push(categoryItems[categoryItemsKeys[i]]);
			};
		};
	};
	console.log('  -  selectedClothes: ', selectedClothes);
	console.log('  -  otherClothes: ', otherClothes);


	return (
		<section id='WearPicker' className='main-tab displayflex flexcol'>
			
			{ (selectedClothes.length > 0) && <section id='PickedWear-section'>
				<h3 className='marginauto'>Today's Outfit</h3>
				<section id='PickedWear-container' className='displayflex'>
					{ selectedClothes.map((selcloth, i) => {
						return <ClothingItem key={i} data={selcloth} />
					}) }
				</section>
			</section> }

			<section id='AllWear-section'>
				<h3 className='marginauto'>Pick your outfit</h3>
				<article id='AllWear-container' className='displayflex flexcol'>
					{ clothingCategories.map((clothcat, i) => {
						return ( <section id={clothcat+'-section'} key={i}>
							<h4>{clothcat}</h4>
							{ otherClothes[clothcat].map((catcloth, j) => {
								return <ClothingItem key={j} data={catcloth} />
							}) }
						</section> )
					}) }
				</article>
			</section>

		</section>
	)

}

export default WearPicker;