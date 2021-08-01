import React from 'react';


const WearCart = (props) => {

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
	/* console.log('  -  selectedClothes: ', selectedClothes); */

	const toggleSidebar = function() {
		document.getElementById('WearTab-sidebar').classList.toggle('show');
	};

	return (
		<section id='WearCartFAB-container'>
			<div id='WearCartFAB' className='FAB positionfixed nonselect pointer' onClick={toggleSidebar}>
				<span className='bigfont bigfont-height marginauto'>{selectedClothes.length}</span>
			</div>
		</section>
	);

};

export default WearCart;