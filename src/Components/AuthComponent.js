import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../Firebase';

class AuthComponent extends Component {

	componentWillMount() {
		auth.onAuthStateChanged(user => {
			if(user) {
				this.props.history.push('/admin')
			}
		})
	}


	render () {
		return (
			<div>{this.props.children}</div>
		)
	}
}

export default withRouter(AuthComponent) ;

