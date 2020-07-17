import React from 'react';

const DressShirtIcon = (props) => {
	const stylePrimary = (props.primaryColor !== null) ? { fill: props.primaryColor } : null;
	const styleSecondary = (props.secondaryColor !== null) ? { fill: props.secondaryColor } : null;

	return <svg version="1.1" id="DressShirtIcon" x="0px" y="0px" viewBox="0 0 480 480">
		<g>
			<path style={stylePrimary} d="M459.352,66.4L357.048,33.256c-2.447-0.846-5.019-1.271-7.608-1.256H348L326.4,3.2c-1.299-1.732-3.244-2.863-5.392-3.136
			c-0.337,0-0.674,0.024-1.008,0.072V0H160v0.136c-0.334-0.048-0.671-0.072-1.008-0.072c-2.148,0.273-4.093,1.404-5.392,3.136
			L132,32h-1.44c-2.524-0.02-5.033,0.383-7.424,1.192L20.176,66.56C7.964,71.334-0.053,83.128,0,96.24V408c0,4.418,3.582,8,8,8h72
			v56c0,4.418,3.582,8,8,8h304c4.418,0,8-3.582,8-8v-56h72c4.418,0,8-3.582,8-8V96.24C480.007,82.963,471.78,71.074,459.352,66.4z
				M333.176,38.912L272.32,93.008L252,72.664L318.576,19.4L333.176,38.912z M161.448,19.4L228,72.664l-20.32,20.344l-60.856-54.096
			L161.448,19.4z M80,400H16v-16h64V400z M232,464H96V168H80v200H16V96.24c-0.067-6.376,3.726-12.16,9.6-14.64l102.648-33.256
			c0.747-0.239,1.528-0.355,2.312-0.344h2.4l69.728,61.984c3.167,2.81,7.975,2.666,10.968-0.328L232,91.312V464z M182.808,16h114.4
			L240,61.752L182.808,16z M464,400h-64v-16h64V400z M464,368h-64V168h-16v296H248V91.312l18.344,18.344
			c2.993,2.994,7.801,3.138,10.968,0.328L347.04,48h2.4c0.847-0.008,1.688,0.13,2.488,0.408L453.944,81.44
			c6.087,2.383,10.083,8.263,10.056,14.8V368z"/>
		</g>
		<g>
			<circle style={styleSecondary} cx="270" cy="144" r="9"/>
		</g>
		<g>
			<circle style={styleSecondary} cx="270" cy="192" r="9"/>
		</g>
		<g>
			<circle style={styleSecondary} cx="270" cy="240" r="9"/>
		</g>
		<g>
			<circle style={styleSecondary} cx="270" cy="288" r="9"/>
		</g>
		<g>
			<circle style={styleSecondary} cx="270" cy="336" r="9"/>
		</g>
		<g>
			<circle style={styleSecondary} cx="270" cy="384" r="9"/>
		</g>
		<g>
			<circle style={styleSecondary} cx="270" cy="432" r="9"/>
		</g>
	</svg>
};

export default DressShirtIcon;