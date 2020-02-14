import React, { useState } from 'react';

const WearSuggester = (props) => {

	const SuggestThis = function() {
		props.suggestWear([
			{ section: 'headwear', name: 'beanie', primaryColor: '#333333', secondaryColor: '#2b2b2b', tertiaryColor: null },
			{ section: 'socks', name: 'ankleSocks', primaryColor: 'gray', secondaryColor: null, tertiaryColor: null }
		]);
	};

	return (
		<div>
			<button onClick={SuggestThis}>Suggest</button>
		</div>
	);
}

export default WearSuggester;