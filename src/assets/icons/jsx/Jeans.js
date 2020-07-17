import React from 'react';

const JeansIcon = (props) => {
	const stylePrimary = (props.primaryColor !== null) ? { fill: props.primaryColor } : null;

	return <svg version="1.1" id="JeansIcon" x="0px" y="0px" viewBox="0 0 480 480">
		<g>
			<path style={stylePrimary} d="M360,8c0-4.418-3.582-8-8-8H128c-4.418,0-8,3.582-8,8v32c0,0.112,0.056,0.2,0.064,0.304s-0.048,0.192,0,0.288l32,432
			c0.309,4.161,3.764,7.386,7.936,7.408h56c4.211,0.01,7.709-3.247,8-7.448l16-229.6l16,229.6c0.291,4.201,3.789,7.458,8,7.448h56
			c4.197,0.011,7.689-3.222,8-7.408l32-432c0-0.096-0.04-0.192-0.04-0.288S360,40.112,360,40V8z M136.616,48h30.536
			c-2.992,14.631-13.91,26.364-28.288,30.4L136.616,48z M312.568,464h-41.104L248,127.448c0-4.418-3.582-8-8-8s-8,3.582-8,8
			L208.536,464h-41.104l-27.36-369.328c22.751-5.011,40.008-23.61,43.304-46.672h113.248c3.296,23.062,20.553,41.661,43.304,46.672
			L312.568,464z M341.136,78.4c-14.378-4.036-25.296-15.769-28.288-30.4h30.536L341.136,78.4z M344,32H136V16h208V32z"/>
		</g>
	</svg>
};

export default JeansIcon;