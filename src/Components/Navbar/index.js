import React , { Component } from 'react';

class Navbar extends Component {

	render () {
		return (
			<nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-white d-flex portfolio-navbar gradient">
	          <div className="container"><button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
	              <div className="collapse navbar-collapse" id="navbarNav">
	                  <ul className="nav navbar-nav mx-auto">
	                      <li className="nav-item" role="presentation"><a className="nav-link" href="index.html"><i className="fa fa-home"></i>Home</a></li>
	                      <li className="nav-item" role="presentation"><a className="nav-link" href="projects-grid-cards.html">Projects</a></li>
	                      <li className="nav-item" role="presentation"><a className="nav-link" href="cv.html">CV</a></li>
	                      <li className="nav-item" role="presentation"><a className="nav-link" href="hire-me.html">Hire me</a></li>
	                  </ul>
	              </div>
	          </div>
	      </nav>
		)
	}
}

export default Navbar ;

