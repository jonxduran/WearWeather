
let initialized = false;
export function setInitialized() {
	initialized = true;
};
export function getInitialized() {
	return initialized;
};

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function addLeadingZero(tme) {
	if (tme < 10) {
		tme = "0" + tme;
	}
	return tme;
}

export function getTemperature(temp, frmt) {
	if (frmt === 'f') {
		return Math.round(((temp - 273.15) * 1.8) + 32);
	} else {
		return Math.round(temp - 273.15);
	}
}


export function weatherDecoder(id) {
	console.log('weatherDecoded id: ', id);
	let decoded;
	switch(true) {
		case (/2[0-9][0-9]/).test(id):
			decoded = {
				ambiance: 'dark',
				description: 'thunderstorm',
				background: 'rain'
			};
			break;
		case (/3[0-9][0-9]/).test(id):
			decoded = {
				ambiance: 'light',
				description: 'drizzle',
				background: 'rain'
			};
			break;
		case (/50[2-4]/).test(id):
			decoded = {
				ambiance: 'dark',
				description: 'heavy rain',
				background: 'rain'
			};
			break;
		case (/5[0-9][0-9]/).test(id):
		decoded = {
				ambiance: 'medium',
				description: 'rain',
				background: 'rain'
			};
			break;
		case (/6[0-9][0-9]/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'snow',
				background: 'snow'
			};
			break;
		case (/7[0,2,4]1/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'fog',
				background: 'cloud'
			};
			break;
		case (/711/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'smoke',
				background: 'cloud'
			};
			break;
		case (/7[3,5]1/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'sand',
				background: 'wind'
			};
			break;
		case (/76[1-2]/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'dust',
				background: 'wind'
			};
			break;
		case (/7[7-8]1/).test(id):
			decoded = {
				ambiance: 'light',
				description: 'strong winds',
				background: 'wind'
			};
			break;
		case (/800/).test(id):
			decoded = {
				ambiance: 'light',
				description: 'clear',
				background: 'clear'
			};
			break;
		case (/80[1-2]/).test(id):
			decoded = {
				ambiance: 'light',
				description: 'partly cloudy',
				background: 'clear'
			};
			break;
		case (/80[3-4]/).test(id):
			decoded = {
				ambiance: 'medium',
				description: 'cloudy',
				background: 'cloud'
			};
			break;
		default: 
			decoded = {
				ambiance: 'light',
				description: 'clear',
				background: 'clear'
			};
			break;
	}
	return decoded;
};
