import React, { Component } from 'react';


class WearTab extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<section id='WearTab' className={'main-tab flexcol' + ((this.props.active===true) ? ' active' : '')}>
				
				<span className='marginauto'>{this.props.currentWeather}</span>

			</section>
		)
	}

}

export default WearTab;