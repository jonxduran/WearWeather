
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const OSTheme = handleDarkmode(darkModeMediaQuery);
function handleDarkmode(e){
	const darkModeOn = e.matches;
	return (darkModeOn) ? 'dark-theme' : 'light-theme';
};
console.log('OSTheme: ', OSTheme);

let userSettings = {
	"scale": "f",
	"theme": OSTheme
};

export const initUserSettings = JSON.parse(localStorage.getItem("userSettingsCache")) || getSettings();

export function setNewSetting (ky, vl) {
	
	userSettings[ky] = vl;
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