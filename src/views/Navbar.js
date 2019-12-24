import React from 'react';


const Navbar = (props) => {
	/* console.log('NavBar props: ', props); */
	return (
		<nav id='App-Navbar' className='bigfont'>
			<section id='App-Navbar-inner' className='displayflex'>
			{ props.tabs.map((tb, ky) => {
				return ( <div className={'Navbar-tab displayflex' + (tb.active ? ' active' : '')} key={ky}>
					<span className='Navbar-tab-inner displayflex flexcol marginauto' onClick={()=>props.tabClick(ky)}>
						{/* <span className='Navbar-tab-icon displayflex'>{tb.icon}</span> */}
						<span className='Navbar-tab-title bigfont-height'>{tb.title}</span>
					</span>
				</div> )
			}) }
			</section>
		</nav>
	);

}

export default Navbar;