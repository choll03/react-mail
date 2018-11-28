import React , { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { HomeComponent, PortfolioComponent, NilaiComponent } from '../Components';


class Container extends Component {

	constructor(props){
		super(props);
		this.state = {
			value: 'indo',
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
		this.setState({value: event.target.value})
		
	}

	render () {
		return (
			<div>
			<nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-white d-flex portfolio-navbar gradient" style={{zIndex:'998'}}>
	          <div className="container"><button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
	              <div className="collapse navbar-collapse" id="navbarNav">
	                  <ul className="nav navbar-nav mx-auto">
	                  	<li className="nav-item" role="presentation">
                          <Link className="nav-link" to="/">CV</Link>
                        </li>
                        <li className="nav-item" role="presentation">
                          <Link className="nav-link" to="/portfolio">Portfolio</Link>
                        </li>
                        <li className="nav-item" role="presentation">
                          <Link className="nav-link" to="/mycourse">My<i className="fa fa-graduation-cap"></i></Link>
                        </li>
												<li className="nav-item" style={{position:'fixed',right:0}}>
													<select
														className="nav-link form-control"
														style={{color:'#2397fd'}}
														value={this.state.value}
														onChange={this.handleChange}
														>
														<option value="indo">Bahasa Indonesia</option>
														<option value="english">English</option>
													</select>
												</li>
	                  </ul>
	              </div>
	          </div>
	      </nav>
	      <Switch>
	        <Route exact path="/cv" component={() => <HomeComponent language={this.state.value} { ...this.props }/>}/>
	      	<Route exact path="/portfolio" component={() => <PortfolioComponent language={this.state.value} { ...this.props } />} />
	        <Route exact path="/mycourse" component={NilaiComponent} />
	        <Redirect from="/" to="/cv" />
	      </Switch>
	      </div>
		)
	}
}


export default Container;
