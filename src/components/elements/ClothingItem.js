import React, { useEffect, useReducer } from 'react';
import { getClothingSvg } from '../../data/status/ClothingHandler';
/* import { debounce } from '../assets/common'; */
import { ChromePicker } from 'react-color';


const ClothingItem = (props) => {
	
	/* console.log(props); */

	const getNewClothingState = function(colorData, title, primaryColor, secondaryColor, tertiaryColor, isActive, colorSwapIndex) {
		const newSvgIcon = getClothingSvg(title, primaryColor, secondaryColor, tertiaryColor);
		return {
			cardActive: isActive,
			activeColorSwap: colorSwapIndex,
			color: colorData,
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
					newState.color = activeColor;
				};
				return newState;
			case 'colorChange':
				newState.color = action.newColor.hex;
				newState.svgIcon = action.newSvgIcon;
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

	const handleColorChange = function(newColor) {
		const editedClothing = {...props.data};
		const activeColorLabel = (clothingState.activeColorSwap === 0) ? 'primaryColor' : (clothingState.activeColorSwap === 1) ? 'secondaryColor' : 'tertiaryColor';
		editedClothing[activeColorLabel] = newColor.hex;
		const newSvgIcon = getClothingSvg(editedClothing.title, editedClothing.primaryColor, editedClothing.secondaryColor, editedClothing.tertiaryColor);
		clothingChangeSend('colorChange', editedClothing);
		dispatch({type:'colorChange', newColor, newSvgIcon});
	};

	
	return (
		<article className={'card fluent-card wear-card card-shadow displayflex nonselect positionrel ' + (clothingState.cardActive ? 'active' : '')}>
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
					<ChromePicker color={clothingState.color} onChangeComplete={handleColorChange} />
				</article>
			</section>
		</article>
	);
}

export default ClothingItem;