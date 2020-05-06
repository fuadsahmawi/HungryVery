import React from "react";
import Welcome from 'react-welcome-page';

const Home = () => {
	return (
		<div id='my-container'>
			<Welcome
				loopDuration={1100}
				data={[
				{
					image: require('./icon.png'),
					text: 'Welcome to HungryVery',
					imageAnimation: 'slideInLeft',
					textAnimation: 'slideInUp',
					backgroundColor: '#386CE4',
					textColor: '#002134'
				}
				]}
			/>  
		</div>
)};

export default Home;