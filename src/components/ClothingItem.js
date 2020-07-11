import React from 'react';
import { getClothingSvg } from '../status/ClothingHandler';


const ClothingItem = (props) => {
	
	const onclickFunc = function() {
		return (props.unPick) ? props.unPick(props.data) : null;
	};

	const SvgIcon = getClothingSvg(props.data.title);
	
	return (
		<article className='card fluent-card card-shadow displayflex flexcol nonselect positionrel' onClick={()=>onclickFunc()}>
			<span className={'card-addrem positionabs ' + props.addrem}></span>
			<span className='card-icon-container displayflex'>
				<React.Suspense fallback={<></>}>
					<SvgIcon />
				</React.Suspense>
			</span>
			<span className='card-name-container medfont medfont-height'>
				<p className='card-name marginauto-height'>{props.data.name}</p>
			</span>
			<span className='card-category-container'></span>
		</article>
	);
}

export default ClothingItem;