import React, { useEffect, useReducer, useRef } from 'react';
import { getClothingSvg } from '../status/ClothingHandler';
import { debounce } from '../assets/common';


const OldClothingItem = (props) => {
	
	/* console.log(props); */
	const redSlider = useRef();
	const greenSlider = useRef();
	const blueSlider = useRef();

	const getRGB = function(color) {
		return color.replace(/[^\d,]/g, '').split(',');
	};

	const clothingChangeSend = function(action, editedClothing) {
		const newCloth = {...props.data};
		switch(action) {
			case 'addrem':
				newCloth.selected = !newCloth.selected;
				props.editCloth(newCloth, 'addrem');
				break;
			case 'colorChange':
				console.log('colorChange ', editedClothing);
				props.editCloth(editedClothing, 'colorChange');
				break;
			default:
				console.log('No clothingChangeSend for ', action);
		}
	};

	const colorChange = debounce(function(newVal, rgbLabel, rgbIndex) {
		const editedClothing = {...props.data};
		const activeColorLabel = (clothingState.activeColorSwap === 0) ? 'primaryColor' : (clothingState.activeColorSwap === 1) ? 'secondaryColor' : 'tertiaryColor';
		const activeRgbNew = getRGB(editedClothing[activeColorLabel]);
		activeRgbNew[rgbIndex] = newVal;
		const newRgb = 'rgb(' + activeRgbNew.toString() + ')';
		editedClothing[activeColorLabel] = newRgb;
		const newSvgIcon = getClothingSvg(editedClothing.title, editedClothing.primaryColor, editedClothing.secondaryColor, editedClothing.tertiaryColor);
		clothingChangeSend('colorChange', editedClothing);
		dispatch({type:'colorChange', rgbLabel, newVal, activeColorLabel, newSvgIcon});
	}, 250);

	const getNewClothingState = function(colorLabel, title, primaryColor, secondaryColor, tertiaryColor, isActive, colorSwapIndex) {
		const newRgb = getRGB(colorLabel);
		const newSvgIcon = getClothingSvg(title, primaryColor, secondaryColor, tertiaryColor);
		return {
			cardActive: isActive,
			activeColorSwap: colorSwapIndex,
			red: newRgb[0],
			green: newRgb[1],
			blue: newRgb[2],
			svgIcon: newSvgIcon
		};
	};

	const initClothingState = getNewClothingState(props.data.primaryColor, props.data.title, props.data.primaryColor, props.data.secondaryColor, props.data.tertiaryColor, false, 0);

	const clothingReducer = function(state, action) {
		const newState = {...state};
		switch(action.type) {
			case 'colorPickerToggle':
				newState.cardActive = !newState.cardActive;
				return newState;
			case 'colorPickerSwap':
				if (action.index !== newState.activeColorSwap) {
					newState.activeColorSwap = action.index;
					const activeColor = (action.index === 0) ? props.data.primaryColor : (action.index === 1) ? props.data.secondaryColor : props.data.tertiaryColor;
					const newRgb = getRGB(activeColor);
					newState.red = newRgb[0];
					newState.green = newRgb[1];
					newState.blue = newRgb[2];
					redSlider.current.value = newRgb[0];
					greenSlider.current.value = newRgb[1];
					blueSlider.current.value = newRgb[2];
				};
				return newState;
			case 'colorChange':
				newState[action.rgbLabel] = action.newVal;
				newState['svgIcon'] = action.newSvgIcon;
				const activeColor = props.data[action.activeColorLabel];
				const newRgb = getRGB(activeColor);
				newState.red = newRgb[0];
				newState.green = newRgb[1];
				newState.blue = newRgb[2];
				redSlider.current.value = newRgb[0];
				greenSlider.current.value = newRgb[1];
				blueSlider.current.value = newRgb[2];
				return newState;
			case 'newStateFromProps':
				return action.newState;
			default:
				return state;
		}
	};
	const [clothingState, dispatch] = useReducer(clothingReducer, initClothingState);

	useEffect(() => {
		const activeColor = (clothingState.activeColorSwap === 0) ? props.data.primaryColor : (clothingState.activeColorSwap === 1) ? props.data.secondaryColor : props.data.tertiaryColor;
		const newClothingState = getNewClothingState(activeColor, props.data.title, props.data.primaryColor, props.data.secondaryColor, props.data.tertiaryColor, clothingState.cardActive, clothingState.activeColorSwap);
		dispatch({type: 'newStateFromProps', newState: newClothingState});
	}, 
	// eslint-disable-next-line
	[props.data, clothingState.activeColorSwap, clothingState.cardActive]);

	
	return (
		<article className={'card fluent-card card-shadow displayflex nonselect positionrel ' + (clothingState.cardActive ? 'active' : '')}>
			<section className='card-contents displayflex flexcol positionabs'>
				<span className='card-icon-container displayflex'>
					<React.Suspense fallback={<></>}>
						{clothingState.svgIcon}
					</React.Suspense>
				</span>
				<header className='card-name-container medfont medfont-height'>
					<p className='card-name marginauto-height'>{props.data.name}</p>
				</header>
				<div className='card-buttons-container displayflex positionrel'>
					<button className={'outline-button ' + (props.addrem==='Add' ? 'green-button' : 'red-button')} onClick={()=>clothingChangeSend('addrem', null)}>{props.addrem}</button>
					<button className='card-color-picker-button outline-button' onClick={()=>dispatch({type:'colorPickerToggle'})}>Color</button>
				</div>
			</section>
			<section className='card-color-picker-container displayflex flexcol positionabs'>
				<span className='card-color-picker-close positionabs pointer nonselect' onClick={()=>dispatch({type:'colorPickerToggle'})}>close</span>
				<article className='card-color-picker-swapper displayflex'>
					{<span className={'card-color-picker-option primary marginauto' + (clothingState.activeColorSwap === 0 ? ' active' : '')} onClick={()=>dispatch({type:'colorPickerSwap', index:0})}>
						<span style={{backgroundColor: props.data.primaryColor}}></span>
					</span>}
					{(null !== props.data.secondaryColor) && <span className={'card-color-picker-option secondary marginauto' + (clothingState.activeColorSwap === 1 ? ' active' : '')} onClick={()=>dispatch({type:'colorPickerSwap', index:1})}>
						<span style={{backgroundColor: props.data.secondaryColor}}></span>
					</span>}
					{(null !== props.data.tertiaryColor) && <span className={'card-color-picker-option tertiary marginauto' + (clothingState.activeColorSwap === 2 ? ' active' : '')} onClick={()=>dispatch({type:'colorPickerSwap', index:2})}>
						<span style={{backgroundColor: props.data.tertiaryColor}}></span>
					</span>}
				</article>
				<article className='card-color-picker-sliders-container displayflex flexcol'>
					<div className='card-color-picker-slider displayflex'>
						<span className='smallfont smallfont-height marginauto-height'>{clothingState.red}</span>
						<input className='slider marginauto-height' type='range' min='0' max='255' step='1' defaultValue={clothingState.red} onChange={(e)=>colorChange(e.target.value, 'red', 0)} ref={redSlider}></input>
					</div>
					<div className='card-color-picker-slider displayflex'>
						<span className='smallfont smallfont-height marginauto-height'>{clothingState.green}</span>
						<input className='slider marginauto-height' type='range' min='0' max='255' step='1' defaultValue={clothingState.green} onChange={(e)=>colorChange(e.target.value, 'green', 1)} ref={greenSlider}></input>
					</div>
					<div className='card-color-picker-slider displayflex'>
						<span className='smallfont smallfont-height marginauto-height'>{clothingState.blue}</span>
						<input className='slider marginauto-height' type='range' min='0' max='255' step='1' defaultValue={clothingState.blue} onChange={(e)=>colorChange(e.target.value, 'blue', 2)} ref={blueSlider}></input>
					</div>
				</article>
			</section>
		</article>
	);
}

export default OldClothingItem;