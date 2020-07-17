import React, { useState, useEffect } from 'react';
import SuggestedClothingItem from '../components/SuggestedClothingItem';
import * as ClothesApi from '../api/ClothesApi';


const WearSuggester = (props) => {

	/* console.log("WearSuggester db: ", props.db); */
	/* db.current.collection("api").doc(user.uid).collection("wear") */
	
	const [suggestedClothes, setSuggestedClothes] = useState([]);

	useEffect(() => {
		/* console.log('wear suggester useeffect'); */
		SuggestNewClothes();
	}, 
	// eslint-disable-next-line
	[props.db, props.userSettings.userObject]);

	const editClothing = function(cloth, i) {
		console.log('Edit suggested clothing: ', cloth, i);
		/* const cloneSuggestedClothes = [...suggestedClothes];
		delete cloneSuggestedClothes[i];
		const newSuggestedClothes = cloneSuggestedClothes.filter(s=>s!==undefined);
		setSuggestedClothes(newSuggestedClothes); */
		cloth.selected = true;
		props.editClothing([cloth]);
	};

	const getClothing = function() {
		return ClothesApi.getClothes(props.db, props.userSettings.userObject);
	};
	
	const SuggestNewClothes = function() {
		const newClothes = getClothing();
		console.log('New Clothes: ', newClothes);
		setSuggestedClothes(newClothes);
	};

	return (
		<section id='WearSuggester' className='displayflex flexcol'>
			<h3 className='Wear-header biggerfont bold4'>Suggested for you</h3>
			<section id='SuggestedClothes-container' className='displayflex three-card-row horz-scroll'>
				{ suggestedClothes.map((clo, i) => {
					return <SuggestedClothingItem data={clo} key={i} editCloth={(cloth)=>editClothing(cloth, i)} addrem={'Add'} />
				}) }
			</section>
			<article className='Wear-submit-container displayflex positionrel'>
				<button className='solid-button smallfont' onClick={SuggestNewClothes}>Suggest New Clothes</button>
			</article>
			<span style={{marginTop: '2rem'}}>Icons by itim2101, Good Ware, Smashicons</span>
		</section>
	);
}

export default WearSuggester;