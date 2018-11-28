import React , { Component } from 'react';
import { connect } from "react-redux";
import { getNilai } from "../Actions/languageAction";
import Spinner from 'react-spinner-material';

class NilaiComponent extends Component {

	componentDidMount(){
		this.props.getNilai()
	}

	render () {
		let total = 0;
		let sks = 0;
		return (
			<div>
			<main className="page projects-page">
		        <section className="portfolio-block projects-cards">
		            <div className="container" style={{marginTop:'40px'}}>
		                <div className="heading" style={{marginBottom:0}}>
		                    <h1><i className="fa fa-graduation-cap"></i></h1>
		                </div>
		                <div className="row">
							<div className="portfolio-info-card" style={{width:"100%",minHeight:'200px',boxShadow:"0 2px 20px rgba(0,0,0,.085)"}}>
							{this.props.loading?
								<div style={{position:'relative', left:'49%', marginTop:'30px'}}>
									<Spinner size={40} spinnerColor={"blue"} spinnerWidth={5} visible={true} />
								</div>:
								<table className="table text-center" style={{fontSize:"14px"}}>
									<thead className="table-active">
										<tr>
											<th className="text-left">Kode MK</th>
											<th className="text-left">Mata Kuliah</th>
											<th>SKS</th>
											<th>Nilai</th>
											<th>Mutu</th>
										</tr>
									</thead>
									<tbody>
										{
											this.props.nilai.map((item, key) => {
												sks += item.sks;
												total += item.mutu;
												return(
													<tr key={key}>
														<td className="text-left">{item.kode}</td>
														<td className="text-left">{item.nama}</td>
														<td>{item.sks}</td>
														<td>{item.nilai}</td>
														<td>{item.mutu}</td>
													</tr>
												)
											})
										}
										<tr>
											<td colSpan="4">Total SKS</td>
											<td>{sks}</td>
										</tr>
										<tr>
											<td colSpan="4">Total Mutu</td>
											<td>{total}</td>
										</tr>
										<tr>
											<td colSpan="4">IPK</td>
											<td>{(total/sks).toFixed(2)}</td>
										</tr>
									</tbody>
								</table>
								}
							</div>
		                </div>
		            </div>
		        </section>
		    </main>
		    </div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		nilai: state.nilai,
		loading: state.loading.loadingGetNilai
	}
}



export default connect(mapStateToProps, {getNilai})(NilaiComponent) ;

