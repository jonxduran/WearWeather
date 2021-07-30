
export function getLatLong () {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
};

export async function gpsGetter() {
	try {
		let myLoc = await getLatLong(), { coords } = myLoc;
		return coords
	} catch(err) {
		console.log(err);
		return null;
	};
};