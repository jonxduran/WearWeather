
let initialized = false;
export function setInitialized() {
	initialized = true;
};
export function getInitialized() {
	return initialized;
};

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function isNight(theHour) {
	return (theHour < 6 || theHour > 19) ? true : false;
};

export function addLeadingZero(tme) {
	if (tme < 10) {
		tme = "0" + tme;
	}
	return tme;
};

export function getTemperature(temp, frmt) {
	if (frmt === 'f') {
		return Math.round(((temp - 273.15) * 1.8) + 32);
	} else {
		return Math.round(temp - 273.15);
	}
};

