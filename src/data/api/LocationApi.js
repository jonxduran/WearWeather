
let myLocation = null;

export function _setLocation(newLocation) {
	myLocation = newLocation;
};

export function _getNewLocation() {
	let newLocation = null;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position)=>{
				let newCoords = { 'lat': position.coords.latitude, 'long': position.coords.longitude };
			},
			(err)=> {
				newLocation = 'New York';
				console.log('Location error: ', err);
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			}
		);
	}
	_setLocation(newLocation);
};

export function _getLocation() {
	if (myLocation === null) {
		_getNewLocation();
	} else {
		return myLocation;
	}
}
