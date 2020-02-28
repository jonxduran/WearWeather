import React from 'react';
import ClothingItem from '../components/ClothingItem';


const WearSuggester = (props) => {

	
	
	
	const suggestedClothes = [
		{ category: 'headwear', name: "beanie", title: 'beanie', primaryColor: '#333333', secondaryColor: '#2b2b2b', tertiaryColor: null, selected: true },
		{ category: 'socks', name: "ankle socks", title: 'ankleSocks', primaryColor: 'gray', secondaryColor: 'white', tertiaryColor: null, selected: true }
	];
	
	const SuggestThis = function() {
		props.suggestWear(suggestedClothes);
	};

	return (
		<section id='WearSuggester'>
			<h3 className='biggerfont bold4'>Suggested for you</h3>
			<section id='SuggestedClothes-container' className='displayflex three-card-row'>
				{ suggestedClothes.map((clo, i) => {
					return <ClothingItem data={clo} key={i} />
				}) }
			</section>
			<button className='solid-button smallfont' onClick={SuggestThis}>Suggest</button>
		</section>
	);
}

export default WearSuggester;