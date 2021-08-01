
let initialized = false;
export function setInitialized() {
	initialized = true;
};
export function getInitialized() {
	return initialized;
};

export const weekdaysShort = [];
export const weekdaysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const monthsLong = [];


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
};

export function getFullTime(tme, scale, ampm) {
	const tempDate = new Date(tme);
	let hour, apm = '';
	if (scale === 'c') {
		hour = tempDate.getHours();
	} else {
		const hr = tempDate.getHours();
		if (hr === 0) {
			hour = '12';
			if (ampm) { apm = 'am'; };
		} else if (hr < 12) {
			hour = hr;
			if (ampm) { apm = 'am'; };
		} else if (hr === 12) {
			hour = hr;
			if (ampm) { apm = 'pm'; };
		} else {
			hour = hr-12;
			if (ampm) { apm = 'pm'; };
		};
	};
	return (hour + ':' + addLeadingZero(tempDate.getMinutes()) + apm);
};

export function getWeatherCardDate(dte, scale) {
	return (monthsShort[dte.getMonth()] + ' ' + dte.getDate() + ' ' + getFullTime(dte, scale, true));
};

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

export function roundNumber(num) {
	return Math.round(num);
};

export function getRGB(color) {
	return color.replace(/[^\d,]/g, '').split(',');
};