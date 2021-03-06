
/* const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const OSTheme = handleDarkmode(darkModeMediaQuery);
function handleDarkmode(e){
	const darkModeOn = e.matches;
	return (darkModeOn) ? 'dark-theme' : 'light-theme';
};
console.log('OSTheme: ', OSTheme); */

let userSettings = {
	"scale": "f",
	"pronoun": "he",
	"theme": 'system-theme'
};

export function getInitUserSettings(user) { 
	let initUserSettings = JSON.parse(localStorage.getItem("userSettingsCache")) || getSettings();
	/* let initUserSettings = getSettings(); */
	initUserSettings.userObject = user;
	/* console.log('initUserSettings: ', initUserSettings); */
	userSettings = initUserSettings;
	return initUserSettings;
}

export function setNewSetting(ky, vl) {
	/* console.log('setNewSetting ', ky, vl); */
	userSettings[ky] = vl;
	/* console.log('new user settings: ', userSettings); */
	try {
		localStorage.setItem('userSettingsCache',  JSON.stringify(userSettings));
	} catch(err) {
		console.log('Writing to local Storage error for userSettings: ', userSettings);
	}
	return userSettings;
};

export function getSettings() {
	return userSettings;
};