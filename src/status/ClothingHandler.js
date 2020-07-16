import React, { lazy } from 'react';

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


export function getClothingSvg(title, primaryColor, secondaryColor, tertiaryColor) {
	if (title === 'dress') {
		return <DressIcon primaryColor={primaryColor} secondaryColor={secondaryColor} />;
	} else if (title === 'dressShirt') {
		return <DressShirtIcon primaryColor={primaryColor} />;
	} else if (title === 'jeans') {
		return <JeansIcon primaryColor={primaryColor} />;
	} else if (title === 'longSocks') {
		return <LongSocksIcon primaryColor={primaryColor} secondaryColor={secondaryColor} />;
	} else if (title === 'shorts') {
		return <ShortsIcon primaryColor={primaryColor} />;
	} else if (title === 'shortShorts') {
		return <ShortShortsIcon primaryColor={primaryColor} />;
	} else if (title === 'skirt') {
		return <SkirtIcon primaryColor={primaryColor} />;
	} else if (title === 'sunglasses') {
		return <SunglassesIcon primaryColor={primaryColor} secondaryColor={secondaryColor} />;
	} else if (title === 'sweater') {
		return <SweaterIcon primaryColor={primaryColor} secondaryColor={secondaryColor} />;
	} else if (title === 'tights') {
		return <TightsIcon primaryColor={primaryColor} />;
	} else if (title === 'tShirt') {
		return <TShirtIcon primaryColor={primaryColor} />;
	};
};