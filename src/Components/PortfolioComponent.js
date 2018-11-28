import React , { Component } from 'react';
import { connect } from "react-redux";
import { getPortfolio } from "../Actions/languageAction";
import Spinner from 'react-spinner-material';
import ImageZoom from 'react-medium-image-zoom';

class PortfolioComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}
	componentDidMount(){
		this.props.getPortfolio(this.props.location.pathname, this.props.language);
	}

	render () {
		if(this.props.loading)
		return(
			<div style={{position:'fixed', top:'50%',left:'50%'}}>
				<Spinner size={40} spinnerColor={"blue"} spinnerWidth={5} visible={true} />
			</div>
		)
		else 
		return (
			<div>
			<main className="page projects-page">
		        <section className="portfolio-block projects-cards">
		            <div className="container" style={{marginTop:'40px'}}>
		                <div className="heading">
		                    <h2>PORTFOLIO</h2>
		                </div>
		                <div className="row">
		                    
							{
								this.props.portfolio.map((item, key)=>{
									return(
										<div className="col-md-6 col-lg-4" key={key}>
											<div className="card border-0">
											<a >
												<ImageZoom
												defaultStyles={{backgroundColor:"rgba(0, 0, 0, 0.6)"}}
												image={{
													src: 'assets/img/portofolio/'+item.img,
													alt: 'Golden Gate Bridge',
													className: 'card-img-top scale-on-hover',
												}}
												zoomImage={{
													src: 'assets/img/portofolio/'+item.img,
													alt: 'Golden Gate Bridge',
												}}
												/>
											</a>
											<div className="card-body">
												<h6><a>{item.title}</a></h6>
												<p className="text-muted card-text">{item.des}</p>
											</div>
										</div>
									</div>
									)
								})
							}
		                        
		                </div>
		            </div>
		        </section>
		    </main>
		    <footer className="page-footer gradient">
	            <div className="container">
	                <div className="links"><a >{this.props.language === 'indo'?"Tentang Saya":"About Me"}</a></div>
	                <div className="social-icons">
						<a href="https://www.facebook.com/choll03"><i className="icon ion-social-facebook"></i></a>
						<a href="https://www.instagram.com/mail_011/"><i className="icon ion-social-instagram-outline"></i></a>
					</div>
	            </div>
	        </footer>
		    </div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		portfolio: state.portfolio,
		loading: state.loading.loadingGetPortfolio
	}
}



export default connect(mapStateToProps,{ getPortfolio })(PortfolioComponent) ;

