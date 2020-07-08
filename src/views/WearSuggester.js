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
	}, []);

	const pickedClothing = function(cloth, direction) {
		//cloth.selected = !cloth.selected;
		props.pickClothing([cloth]);
	};
	
	const SuggestThis = function() {
		props.pickClothing(suggestedClothes);
	};

	return (
		<section id='WearSuggester'>
			<h3 className='Wear-header biggerfont bold4'>Suggested for you</h3>
			<section id='SuggestedClothes-container' className='displayflex three-card-row'>
				{ suggestedClothes.map((clo, i) => {
					return <ClothingItem data={clo} key={i} unPick={(cloth)=>pickedClothing(cloth, 'add')} />
				}) }
			</section>
			<article className='Wear-submit-container displayflex positionrel'>
				<button className='solid-button smallfont' onClick={SuggestThis}>Suggest</button>
			</article>
		</section>
	);
}

export default WearSuggester;