
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

export function getSimpleTime(tme, scale) {
	const tempDate = new Date(tme);
	const hr = tempDate.getHours();
	if (scale === 'c') {
		return (hr + ':' + addLeadingZero(tempDate.getMinutes()));
	};
	if (hr === 0) {
		return '12am';
	} else if (hr < 13) {
		return (hr + 'am');
	} else {
		return ((hr-12) + 'pm');
	};
}

export function getTemperature(temp, frmt) {
	if (frmt === 'f') {
		return Math.round(((temp - 273.15) * 1.8) + 32);
	} else {
		return Math.round(temp - 273.15);
	}
};

export function debounce(func, duration) {
	let timeout;
	return function(...args) {
		const effect = () => {
			timeout = null;
			return func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(effect, duration);
	};
};
