import React, { useState, useEffect } from 'react';
import SuggestedClothingItem from '../components/SuggestedClothingItem';
import { getClothes } from '../api/ClothesApi';


const WearSuggester = (props) => {

	/* console.log("WearSuggester ", props); */
	/* const wearCollection = props.db.current.collection("api").doc(props.user.uid).collection("wear"); */
	
	const [suggestedClothes, setSuggestedClothes] = useState(null);
	const [suggestedNumbers, setSuggestedNumbers] = useState({ index: 0, max: 0 });

	useEffect(() => {
		/* console.log('wear suggester useeffect'); */
		const newMax = (suggestedClothes && suggestedClothes.clothing && suggestedClothes.clothing.length) ? suggestedClothes.clothing.length : 0;
		setSuggestedNumbers({ index: 0, max: newMax });
		getSuggestedClothes();
	}, 
	// eslint-disable-next-line
	[props.db, props.userSettings.userObject]);

	const editClothing = function(cloth, i) {
		console.log('Edit suggested clothing: ', cloth, i);
		cloth.selected = true;
		props.editClothing([cloth]);
	};

	const getSuggestedClothes = function() {
		getClothes(props.db, props.weather[props.currentCity].currentWeather.main.temp, props.userSettings.userObject).then(newClothes => {
			console.log('getSuggestedClothes New Clothes: ', newClothes);
			const newMax = newClothes.length;
			setSuggestedNumbers({ index: 0, max: newMax });
			setSuggestedClothes(newClothes);
		});
	};

	const changeSuggestedNumbers = function(change) {
		let newNumbers = JSON.parse(JSON.stringify(suggestedNumbers));
		let newIndex = newNumbers.index + change;
		if (newIndex > (newNumbers.max-1)) {
			newIndex = newNumbers.max - 1;
		} else if (newIndex < 0) {
			newIndex = 0;
		};
		setSuggestedNumbers({ index: newIndex, max: newNumbers.max });
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
						{ suggestedClothes[suggestedNumbers.index].clothing.map((clo, i) => {
							return <SuggestedClothingItem data={clo} key={i} editCloth={(cloth)=>editClothing(cloth, i)} addrem={'Add'} />
						}) }
					</section>
					{ (suggestedClothes.length > 1) ?
					<section id='SuggestedClothes-buttons-section' className='displayflex positionrel'>
						<article id='SuggestedClothes-buttons-container' className='two-button-row'>
							{ (suggestedNumbers.index > 0) ? <button className='material-button blue-button med' onClick={()=>changeSuggestedNumbers(-1)}>Prev</button> : <button className='material-button blue-button med faded'>Prev</button> } 
							{ (suggestedNumbers.index < (suggestedNumbers.max-1)) ? <button className='material-button blue-button med' onClick={()=>changeSuggestedNumbers(1)}>Next</button> : <button className='material-button blue-button med faded'>Next</button> }
						</article>
					</section> : null }
				</>
				: <article id='NoSuggestedClothes' className='displayflex flexcol nonselect'>
					<p className='marginauto-height medfont'>No Suggested Clothes Available</p>
				</article>
			}
		</section>
	);
}

export default WearSuggester;