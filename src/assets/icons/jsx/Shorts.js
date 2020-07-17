import React from 'react';

const ShortsIcon = (props) => {
	const stylePrimary = (props.primaryColor !== null) ? { fill: props.primaryColor } : null;
	
	return <svg version="1.1" id="ShortsIcon" x="0px" y="0px" viewBox="0 0 480 480">
		<g>
			<path style={stylePrimary} d="M456,0H24c-4.418,0-8,3.582-8,8v464c0,4.418,3.582,8,8,8h192c4.124,0.021,7.588-3.097,8-7.2l16-160.4l16.04,160.4
			c0.411,4.088,3.851,7.2,7.96,7.2h192c4.418,0,8-3.582,8-8V8C464,3.582,460.418,0,456,0z M336,16h16v32h-16V16z M160,16h160v32H160
			V16z M128,16h16v32h-16V16z M32,16h80v32H32V16z M448,464H271.24l-23.28-232.8c-0.441-4.396-4.363-7.602-8.759-7.161
			c-3.786,0.38-6.781,3.375-7.161,7.161L208.8,464H32V64h416V464z M448,48h-80V16h80V48z"/>
		</g>
	</svg>
};

export default ShortsIcon;