import React, { useState, useEffect } from 'react';
import SuggestedClothingItem from '../components/SuggestedClothingItem';
import { getClothes, getClothingSet } from '../api/ClothesApi';


const WearSuggester = (props) => {

	/* console.log("WearSuggester ", props); */
	/* const wearCollection = props.db.current.collection("api").doc(props.user.uid).collection("wear"); */
	
	const [suggestedClothes, setSuggestedClothes] = useState(null);

	useEffect(() => {
		/* console.log('wear suggester useeffect'); */
		getSuggestedClothes();
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


	const getSuggestedClothes = function() {
		getClothes(props.db, props.weather[props.currentCity].currentWeather.main.temp, props.userSettings.userObject).then(newClothes => {
			/* console.log('New Clothes: ', newClothes); */
			setSuggestedClothes(newClothes);
		});
	};

	const getNewSuggested = function() {
		const newSet = getClothingSet();
		console.log(newSet);
	};

	return (
		<section id='WearSuggester' className='displayflex flexcol'>
			<h3 className='Wear-header biggerfont bold4'>Suggested for you</h3>
			{ (null===suggestedClothes) ?
				<section id='SuggestedClothes-container' className='displayflex three-card-row horz-scroll'>
					<div className='loadingcard displayflex'>
						<p className='marginauto medfont'>loading</p>
					</div>
				</section> :
				(suggestedClothes.length > 0) ?
				<>
					<section id='SuggestedClothes-container' className='displayflex three-card-row horz-scroll'>
						{ suggestedClothes.map((clo, i) => {
							return <SuggestedClothingItem data={clo} key={i} editCloth={(cloth)=>editClothing(cloth, i)} addrem={'Add'} />
						}) }
					</section>
					<article className='Wear-submit-container displayflex positionrel'>
						<button className='solid-button large smallfont' onClick={getNewSuggested}>Suggest New Clothes</button>
					</article>
				</>
				: <article id='NoSuggestedClothes' className='displayflex flexcol nonselect'>
					<p className='marginauto-height medfont'>No Suggested Clothes Available</p>
				</article>
			}
		</section>
	);
}

export default WearSuggester;