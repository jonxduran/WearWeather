import React, { Component } from 'react';



class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			"tabs": props.tabs
		};
	}

	_tabChange(newTab) {
		/* let tabs = this.state.tabs;
		Object.keys(tabs).map(ky => {
			return tabs[ky]['active'] = false;
		});
		tabs[newTab]['active'] = true;
		
		this.setState({ "tabs": tabs }); */
		this.props.tabClick(newTab);
	}

	render() {
		let tabs = this.state.tabs;
		return (
			<nav id='App-Navbar' className='bigfont'>
				<section id='App-Navbar-inner' className='displayflex'>
				{ tabs.map((tb, ky) => {
					return ( <div className={'Navbar-tab displayflex' + (tb.active ? ' active' : '')} key={ky}>
						<span className='Navbar-tab-inner displayflex flexcol marginauto' onClick={()=>this._tabChange(tb)}>
							{/* <span className='Navbar-tab-icon displayflex'>{tb.icon}</span> */}
							<span className='Navbar-tab-title bigfont-height'>{tb.title}</span>
						</span>
					</div> )
				}) }
				</section>
			</nav>
		)
	}

}

export default Navbar;