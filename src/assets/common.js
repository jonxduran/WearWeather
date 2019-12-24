
let initialized = false;
export function setInitialized() {
	initialized = true;
};
export function getInitialized() {
	return initialized;
};

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function _addLeadingZero(tme) {
	if (tme < 10) {
		tme = "0" + tme;
	}
	return tme;
}

export function _getTemperature(temp, frmt) {
	if (frmt === 'f') {
		return Math.round(((temp - 273.15) * 1.8) + 32);
	} else {
		return Math.round(temp - 273.15);
	}
}


export function _weatherDecoder(id) {
	let decoded;
	switch(id) {
		case (/2[0-9][0-9]/).test(id):
			decoded = {
				background: 'blue',
				description: 'thunderstorm'
			};
			break;
		case (/3[0-9][0-9]/).test(id):
			decoded = {
				background: 'blue',
				description: 'drizzle'
			};
			break;
			case (/50[2-4]/).test(id):
				decoded = {
					background: 'blue',
					description: 'heavy rain'
				};
				break;
		case (/5[0-9][0-9]/).test(id):
			decoded = {
				background: 'blue',
				description: 'rain'
			};
			break;
		case (/6[0-9][0-9]/).test(id):
			decoded = {
				background: 'blue',
				description: 'snow'
			};
			break;
		case (/7[0,2,4]1/).test(id):
				decoded = {
					background: 'blue',
					description: 'fog'
				};
				break;
		case (/711/).test(id):
			decoded = {
				background: 'blue',
				description: 'smoke'
			};
			break;
		case (/7[3,5]1/).test(id):
			decoded = {
				background: 'blue',
				description: 'sand'
			};
			break;
		case (/76[1-2]/).test(id):
			decoded = {
				background: 'blue',
				description: 'dust'
			};
			break;
		case (/7[7-8]1/).test(id):
			decoded = {
				background: 'blue',
				description: 'strong winds'
			};
			break;
		case (/800/).test(id):
			decoded = {
				background: 'blue',
				description: 'clear'
			};
			break;
		case (/80[1-2]/).test(id):
			decoded = {
				background: 'blue',
				description: 'partly cloudy'
			};
			break;
		case (/80[3-4]/).test(id):
			decoded = {
				background: 'blue',
				description: 'cloudy'
			};
			break;
		default: 
			decoded = {
				background: 'darkblue',
				description: 'error'
			};
			break;
	}
	return decoded;
}
