
let userSettings = {
	"scale": "f",
	"theme": "light-theme"
};

export const initUserSettings = JSON.parse(localStorage.getItem("userSettings")) || getSettings();

export function setNewSetting (ky, vl) {
	
	userSettings[ky] = vl;
	try {
		localStorage.setItem('userSettings',  JSON.stringify(userSettings));
	} catch(err) {
		console.log('Writing to local Storage error for userSettings: ', userSettings);
	}
	return userSettings;
}

export function getSettings() {
	return userSettings;
}