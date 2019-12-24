import React from 'react';
import * as Common from '../assets/common';


const CurrentWeatherCard = ({cty, scale}) => {
	/* console.log(cty, scale); */
	let date = new Date(cty.currentWeather.dt * 1000);
	return <section id='CurrentWeatherCard' className={'displayflex flexcol marginauto ' + cty.currentWeather.weather[0].main}>
		<header className='card-header displayflex flexcol'>
			<span className='biggerfont bold6'>{Common.weekDays[date.getDay()]}</span>
			<span className='bigfont bold4'>{cty.name}</span>
		</header>
		<article className='card yellow CurrentWeather-circle'>
			<div className='temperature-container displayflex bold3'>
				<span className='temperature positionrel herofont marginauto'>{Common._getTemperature(cty.currentWeather.main.temp, scale)}</span>
			</div>
		</article>
		<section className=''></section>
	</section>
};

export default CurrentWeatherCard;