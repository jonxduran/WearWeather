import React, { useEffect, useRef } from 'react';
import { weatherDecoder } from '../../data/status/WeatherHandler';
import { getTemperature, getSimpleTime } from '../../assets/common';
import * as d3 from 'd3';


const HourlyWeatherCard = (props) => {
	const temperatureD3 = useRef(null);
	/* const humidityD3 = useRef(null); */

	const temperaturesArr = props.data.list.slice(0, 10).map(hw => {
		return { 
			'timeSimple': getSimpleTime((hw.dt*1000), props.scale),
			'timeObj': new Date(hw.dt*1000),
			'temperature': getTemperature(hw.main.temp, props.scale),
			'icon': weatherDecoder(hw.weather[0].id).icon
		};
	});
	/* console.log(temperaturesArr); */
	/* const humidityArr = hourlyWeather.map(hw => hw.main.humidity); */

	const _buildD3 = function(where, myData) {
		/* console.log(where, myData); */
		const whereWidth = where.offsetWidth;
		const whereHeight = where.offsetHeight;
		const xScale = d3.scaleTime().range([2, whereWidth-2]).domain(d3.extent(myData, d=>d.timeObj));
		const yScale = d3.scaleLinear().rangeRound([whereHeight-40, 50]).domain(d3.extent(myData, d=>d.temperature));
		const svg = d3.select(where).append('svg').attr('width', whereWidth-100).attr('height', whereHeight-40);
		/* const xaxis = d3.axisBottom(xScale);
		const yaxis = d3.axisLeft(yScale); */
		const line = d3.line()
			.x(d=>xScale(d.timeObj))
			.y(d=>yScale(d.temperature));
		/* svg.append('g').attr('class', 'axis xaxis').attr("transform", `translate(0, ${whereHeight})`).call(xaxis);
		svg.append('g').attr('class', 'axis yaxis').attr("transform", "translate(20, 10)").call(yaxis); */
		svg.append('path').datum(myData).attr("fill", "none").attr("stroke", "orange").attr("stroke-width", 1.5).attr('d', line);
	};

	useEffect(() => {
		_buildD3(temperatureD3.current, temperaturesArr);
	}, [props.weather, temperaturesArr]);

	
	return <article id='HourlyWeather-card' className='card largecard fluent-card card-shadow displayflex'>
		<section id='HourlyWeather-scroll-section' className='displayflex flexcol'>
			<article id='HourlyWeather-cards-container' className='displayflex positionrel'>
				{ temperaturesArr.map((hw, i) => {
					return <article className='HourlyWeather-card displayflex flexcol' key={i}>
						<span className='HourlyWeather-time medfont medfont-height text-center'>{hw.timeSimple}</span>
						<span className='HourlyWeather-icon'>
							<React.Suspense fallback={<></>}>
								<span className='biggerfont biggerfont-height weather-icon-container'>{hw.icon}</span>
							</React.Suspense>
						</span>
						<span className='HourlyWeather-temperature medfont medfont-height text-center positionrel'>{hw.temperature}</span>
					</article>
				})}
				<section id='HourlyWeather-graphs-container' className='displayflex flexcol positionabs'>
					<article id='HourlyWeather-temperature-graph' className='d3-graph' ref={temperatureD3}></article>
				</section>
			</article>
		</section>
	</article>
};

export default HourlyWeatherCard;