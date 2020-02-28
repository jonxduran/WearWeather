import React from 'react';


const ClothingItem = (props) => {
	
	const onclickFunc = function() {
		return (props.unPick) ? props.unPick(props.data) : null;
	};
	
	return (
		<article className='card displayflex flexcol nonselect positionrel' onClick={()=>onclickFunc()}>
			<span className={'card-addrem positionabs ' + props.addrem}></span>
			<span className='card-icon-container displayflex'></span>
			<span className='card-name-container medfont medfont-height'>
				<p className='card-name marginauto-height'>{props.data.name}</p>
			</span>
			<span className='card-category-container'></span>
		</article>
	)
}

export default ClothingItem;