import React from 'react';


const ClothingItem = (props) => {

	return (
		<article className='card'>{props.data.name}</article>
	)
}

export default ClothingItem;