import { lazy } from 'react';

const DressIcon = lazy(() => import('../assets/icons/jsx/Dress'));
const DressShirtIcon = lazy(() => import('../assets/icons/jsx/DressShirt'));
const JeansIcon = lazy(() => import('../assets/icons/jsx/Jeans'));
const LongSocksIcon = lazy(() => import('../assets/icons/jsx/LongSocks'));
const ShortsIcon = lazy(() => import('../assets/icons/jsx/Shorts'));
const ShortShortsIcon = lazy(() => import('../assets/icons/jsx/ShortShorts'));
const SkirtIcon = lazy(() => import('../assets/icons/jsx/Skirt'));
const SunglassesIcon = lazy(() => import('../assets/icons/jsx/Sunglasses'));
const SweaterIcon = lazy(() => import('../assets/icons/jsx/Sweater'));
const TightsIcon = lazy(() => import('../assets/icons/jsx/Tights'));
const TShirtIcon = lazy(() => import('../assets/icons/jsx/TShirt'));


export function getClothingSvg(title) {
	if (title === 'dress') {
		return DressIcon;
	} else if (title === 'dressShirt') {
		return DressShirtIcon;
	} else if (title === 'jeans') {
		return JeansIcon;
	} else if (title === 'longSocks') {
		return LongSocksIcon;
	} else if (title === 'shorts') {
		return ShortsIcon;
	} else if (title === 'shortShorts') {
		return ShortShortsIcon;
	} else if (title === 'skirt') {
		return SkirtIcon;
	} else if (title === 'sunglasses') {
		return SunglassesIcon;
	} else if (title === 'sweater') {
		return SweaterIcon;
	} else if (title === 'tights') {
		return TightsIcon;
	} else if (title === 'tShirt') {
		return TShirtIcon;
	};
};