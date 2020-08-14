import React from 'react';
import { getClothingSvg } from '../status/ClothingHandler';


const SuggestedClothingItem = (props) => {

	const svgIcon = getClothingSvg(props.data.title, props.data.primaryColor, props.data.secondaryColor, props.data.tertiaryColor);

	const sendClothing = function() {
		props.editCloth(props.data);
	};

	return (
		<article className='card fluent-card card-shadow displayflex nonselect positionrel'>
			<section className='card-contents displayflex flexcol positionabs'>
				<span className='card-icon-container displayflex'>
					<React.Suspense fallback={<></>}>
						{svgIcon}
					</React.Suspense>
				</span>
				<header className='card-name-container medfont medfont-height'>
					<p className='card-name marginauto-height'>{props.data.name}</p>
				</header>
				<div className='card-buttons-container displayflex positionrel'>
					<button className={'outline-button ' + (props.addrem==='Add' ? 'green-button' : 'red-button')} onClick={sendClothing}>{props.addrem}</button>
				</div>
			</section>
		</article>
	);
};

export default SuggestedClothingItem;