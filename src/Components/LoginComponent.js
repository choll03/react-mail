import React , { Component } from 'react';
import { auth } from '../Firebase';

class Navbar extends Component {

	constructor(props) {
		super(props)
		this.state= {
			email:'',
			password : ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillMount() {
		auth.onAuthStateChanged(user => {
			if(user) {
				this.props.history.push('/admin')
			}
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		auth.signInWithEmailAndPassword(this.state.email,this.state.password);
	}

	render () {
		return (
			<div className="login-clean">
		        <form method="post" onSubmit={this.handleSubmit}>
		            <h2 className="sr-only">Login Form</h2>
		            <div className="illustration"><i className="icon ion-ios-navigate" style={{color:"rgb(74,71,244)"}}></i></div>
		            <div className="form-group">
		            	<input className="form-control" type="email" placeholder="Email" onChange={(event) => this.setState({ email: event.target.value })}/>
		            </div>
		            <div className="form-group">
		            	<input className="form-control" type="password" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })}/>
		            </div>
		            <div className="form-group">
		            	<button className="btn btn-primary btn-block" type="submit" style={{backgroundColor:"rgb(74,71,244)"}}>Log In</button>
		            </div>
		         </form>
		    </div>
		)
	}
}

export default Navbar ;