import React from 'react';


const WearTab = (props) => {

	

	return (
		<section id='WearTab' className={'main-tab flexcol' + ((props.active===true) ? ' active' : '')}>
			
			<span className='marginauto'>Wear Tab</span>

		</section>
	)

}

export default WearTab;