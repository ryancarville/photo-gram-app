import React, { Component } from 'react';
import Nav from './components/Nav/nav';
import Routes from './Routes/routes.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			STORE: this.props.STORE
		};
	}
	render() {
		return (
			<main className='App'>
				<Nav />
				<Routes STORE={this.state.STORE} />
			</main>
		);
	}
}
export default App;
