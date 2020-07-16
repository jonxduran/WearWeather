import React, { useState, useEffect } from 'react';
import ClothingItem from '../components/ClothingItem';
import * as ClothesApi from '../api/ClothesApi';


const WearSuggester = (props) => {

	/* console.log("WearSuggester db: ", props.db); */
	/* db.current.collection("api").doc(user.uid).collection("wear") */
	

	const [suggestedClothes, setSuggestedClothes] = useState([]);

	useEffect(() => {
		/* console.log('wear suggester useeffect'); */
		const newClothes = ClothesApi.getClothes(props.db, props.userSettings.userObject);
		setSuggestedClothes(newClothes);
	}, [props.db, props.userSettings.userObject]);

	const editClothing = function(cloth, action) {
		console.log('newClothing: ', cloth);
		props.editClothing([cloth]);
	};
	
	const SuggestThis = function() {
		props.pickClothing(suggestedClothes);
	};

	return (
		<section id='WearSuggester' className='displayflex flexcol'>
			<h3 className='Wear-header biggerfont bold4'>Suggested for you</h3>
			<section id='SuggestedClothes-container' className='displayflex three-card-row horz-scroll'>
				{ suggestedClothes.map((clo, i) => {
					return <ClothingItem data={clo} key={i} editCloth={(cloth,action)=>editClothing(cloth, action)} addrem={'Add'} />
				}) }
			</section>
			<article className='Wear-submit-container displayflex positionrel'>
				<button className='solid-button smallfont' onClick={SuggestThis}>Suggest</button>
			</article>
			<span style={{marginTop: '2rem'}}>Icons by itim2101, Good Ware, Smashicons</span>
		</section>
	);
}

export default WearSuggester;