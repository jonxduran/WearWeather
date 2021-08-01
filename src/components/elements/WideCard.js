import React from 'react';
import { getClothingSvg } from '../../data/status/ClothingHandler';


const WideCard = (props) => {
	console.log(props);
	const SvgIcon = getClothingSvg(props.data.title, props.data.primaryColor, props.data.secondaryColor, props.data.tertiaryColor);

	const remClick = function() {
		const newCloth = {...props.data};
		newCloth.selected = false;
		props.editCloth(newCloth);
	};

	return (
		<article className='card wide-card nonselect positionrel'>
			<div className='icon-container'>
				<React.Suspense fallback={<></>}>
					{SvgIcon}
				</React.Suspense>
			</div>
			<section className='main-container'>
				<p className='medfont medfont-height'>{props.data.name}</p>
				<button className='outline-button red-button' onClick={remClick}>Remove</button>
			</section>
		</article>
	);
};

export default WideCard;