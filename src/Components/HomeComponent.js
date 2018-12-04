import React , { Component } from 'react';
import Spinner from 'react-spinner-material';
import { connect } from "react-redux";
import { getLanguage } from "../Actions/languageAction";

class HomeComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading : false
			
		}
	}

	componentDidMount(){
		this.props.getLanguage(this.props.location.pathname, this.props.language);
		
	}

	render () {
		let { data } = this.props;
		
		if(this.props.loading)
		return(
			<div style={{position:'fixed', top:'50%',left:'50%'}}>
				<Spinner size={40} spinnerColor={"blue"} spinnerWidth={5} visible={true} />
			</div>
		)
		else 
		return (
			<div>
				<main className="page lanidng-page">
			        <section className="portfolio-block block-intro border-bottom">
			            <div className="container" style={{marginTop:'40px'}}>
			                <div className="avatar" style={{backgroundImage:"url(assets/img/avatars/avatar2.jpg)"}}></div>
			                <div className="about-me">
			                    <p>{data.opening} <strong>{data.name}</strong>. {data.bio}</p>
								<a className="btn btn-outline-primary" href="https://api.whatsapp.com/send?phone=6281535377109&text=Halo%20Mail">{data.button}</a>
							</div>
			            </div>
			        </section>
			        <section className="portfolio-block cv">
			            <div className="container">
			                <div className="work-experience group">
			                    <div className="heading">
			                        <h2 className="text-center">{data.we}</h2>
			                    </div>
								{
									data.experience.map((item, key) => {
										return(
											<div className="item" key={key}>
												<div className="row">
													<div className="col-md-6">
														<h3>{item.title}</h3>
														<h4 className="organization">{item.company}</h4>
													</div>
													<div className="col-md-6"><span className="period">{item.date}</span></div>
												</div>
												<p className="text-muted">{item.des}</p>
											</div>
										)
									})
								}
								
			                </div>
			                <div className="education group">
			                    <div className="heading">
			                        <h2 className="text-center">{data.edu}</h2>
			                    </div>
								{
									data.education.map((item, key) => {
										return(
											<div className="item" key={key}>
												<div className="row">
													<div className="col-md-6">
														<h3>{item.title}</h3>
														<h4 className="organization">{item.at}</h4>
													</div>
													<div className="col-6"><span className="period">{item.date}</span></div>
												</div>
											</div>
										)
									})
								}
			                    
			                </div>
			                <div className="group">
			                    <div className="row">
			                        <div className="col-md-6">
			                            <div className="skills portfolio-info-card">
			                                <h2>{data.skill}</h2>
											<h3>Bootstrap</h3>
			                                <div className="progress">
			                                    <div className="progress-bar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width: "70%"}}><span className="sr-only">70%</span></div>
			                                </div>
											<h3>Laravel</h3>
			                                <div className="progress">
			                                    <div className="progress-bar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style={{width: "65%"}}><span className="sr-only">65%</span></div>
			                                </div>
											<h3>React JS</h3>
			                                <div className="progress">
			                                    <div className="progress-bar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style={{width: "65%"}}><span className="sr-only">65%</span></div>
			                                </div>
											<h3>Adobe(Photoshop, Ilustator, Premier)</h3>
			                                <div className="progress">
			                                    <div className="progress-bar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width: "50%"}}><span className="sr-only">50%</span></div>
			                                </div>
			                            </div>
			                        </div>
			                        <div className="col-md-6">
			                            <div className="contact-info portfolio-info-card">
			                                <h2>{data.contact}</h2>
			                                <div className="row">
			                                    <div className="col-1"><i className="icon ion-android-calendar icon"></i></div>
			                                    <div className="col-9"><span>06/01/1996</span></div>
			                                </div>
			                                <div className="row">
			                                    <div className="col-1"><i className="icon ion-person icon"></i></div>
			                                    <div className="col-9"><span>Ismail</span></div>
			                                </div>
			                                <div className="row">
			                                    <div className="col-1"><i className="icon ion-ios-telephone icon"></i></div>
			                                    <div className="col-9"><span>+62 815-3537-7109</span></div>
			                                </div>
			                                <div className="row">
			                                    <div className="col-1"><i className="icon ion-at icon"></i></div>
			                                    <div className="col-9"><span>ismail15000000@gmail.com</span></div>
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                </div>
			                <div className="hobbies group">
			                    <div className="heading">
			                        <h2 className="text-center">{data.hobbi}</h2>
			                    </div>
			                    <div className="row">
									<div className="col-md-3">
										<div className="card special-skill-item border-0">
											<div className="card-header bg-transparent border-0">
												<i className="icon ion-ios-musical-note"></i>
											</div>
											<div className="card-body">
												<h3 className="card-title">{this.props.language === "indo"?"Bermain Musik":"Playing Music"}</h3>
											</div>
										</div>
									</div>
									<div className="col-md-3">
										<div className="card special-skill-item border-0">
											<div className="card-header bg-transparent border-0">
												<i className="icon ion-ios-camera"></i>
											</div>
											<div className="card-body">
												<h3 className="card-title">{this.props.language === "indo"?"Photograpi":"Photograph"}</h3>
											</div>
										</div>
									</div>
									<div className="col-md-3">
										<div className="card special-skill-item border-0">
											<div className="card-header bg-transparent border-0">
												<i className="icon ion-ios-book-outline"></i>
											</div>
											<div className="card-body">
												<h3 className="card-title">{this.props.language === "indo"?"Membaca":"Reading"}</h3>
											</div>
										</div>
									</div>
									<div className="col-md-3">
										<div className="card special-skill-item border-0">
											<div className="card-header bg-transparent border-0">
												<i className="icon ion-ios-football"></i>
											</div>
											<div className="card-body">
												<h3 className="card-title">{this.props.language === "indo"?"Bermain Bola":"Playing Football"}</h3>
											</div>
										</div>
									</div>
								</div>
			                </div>
			            </div>
			        </section>
			    </main>
			    <footer className="page-footer gradient">
		            <div className="container">
		                <div className="links"><a >{data.about}</a></div>
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
	return{
		loading: state.loading.loadingGetLanguage,
		data: state.language
	}
}



export default connect(mapStateToProps, {getLanguage})(HomeComponent) ;

