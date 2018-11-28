import React , { Component } from 'react';
import { auth } from '../Firebase';
// import io from 'socket.io-client';
// import { USER_CONNECTED, VERIFY_USER } from '../Events';
import _ from "lodash";
import TimeAgo from 'timeago-react';
import { connect } from 'react-redux';
import { getListUser, getMessage, adminSendMessage, adminReadMessage } from '../Actions/chatAction';
import Spinner from 'react-spinner-material';

// const socketUrl = "http://localhost:3231"

const LoadingComponent = () => {
	return(
		<div className="loading-spinner">
			<Spinner size={40} spinnerColor={"green"} spinnerWidth={2} visible={true} />
		</div>
	)
}

class AdminComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			socket: null,
			id:'',
			msg:'',
			sendTo:'',
		}

		this.logout = this.logout.bind(this);
	}

	componentWillMount() {
		auth.onAuthStateChanged(user => {
			if(!user) {
				this.props.history.push('/')
			}
			// else {
			// 	const socket = io(socketUrl)
			// 	socket.on('connect', ()=>{
			// 		this.setState({id: socket.id});
			//     	socket.emit(USER_CONNECTED, socket.id)
			//     })
			// 	this.setState({socket});
			// }
		})
	}

	componentDidMount() {
		this.props.getListUser();
	}


	scrollToBottom() {
		const scrollHeight = this.refs.msg.scrollHeight;
	 	// const height = this.refs.msg.clientHeight;
	 	this.refs.msg.scrollTop = scrollHeight;
	}

	componentDidUpdate() {
		if(this.state.sendTo !== ''){
			this.scrollToBottom();
		}
		
	// 	this.state.socket.on(USER_CONNECTED, koneksi => {
	// 		this.setState({
	// 			koneksi 
	// 		});
	// 	})
	}

	logout() {
		auth.signOut()
		.then(() => {
			this.props.history.push('/')
		})
		.catch(err => {
			console.log(err)
		})
	}

	listMessage(data) {
		this.setState({sendTo:data});
		this.props.getMessage(data);
		this.props.adminReadMessage(data);
	}

	sendMesageTo(data) {
		this.props.adminSendMessage(data, this.state.msg);
		this.setState({msg:''});
		
	}

	renderMessages() {
		let currentClasses = '';
		return _.map(this.props.message, (data,  i)=> {
			const create_at = data.create_at.split(" ");
		if(currentClasses === data.sendBy){
			currentClasses = data.sendBy;

			return (

                <li key={i} className={data.sendBy === "other"?"right":"left"} style={{padding:0,top:"-10px"}}>
                	<div className="body" style={{margin:"0 82px"}}>
                        <div className="message well well-sm">
                        	<span dangerouslySetInnerHTML={{ __html: data.msg }}></span>
		                    <small className="timestamp">{create_at[1]}</small>
                        </div>
                    </div>
                </li>
			)
		}else{
			currentClasses = data.sendBy;
			return (
			  		<li key={i} className={data.sendBy === "other"?"right":"left"}>
	                    <span className="avatar tooltips" data-toggle="tooltip " data-placement="left" data-original-title="Kevin Mckoy">
	                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYJ8bLEJ6Pq8ME6jGD9-3HrZkpEOZNaIQ8gg4qvfLvleb_K13" alt="avatar" className="img-circle" />
	                    </span>
	                    <div className="body">
		                    <div className="message well well-sm">
		                    	<span dangerouslySetInnerHTML={{ __html: data.msg }}></span>
		                    	<small className="timestamp">{create_at[1]}</small>
		                    </div>
		                </div>
			  		</li>
			  	)
		}
		})
	}

	deleteChat(data) {
		// const databaseRef = rootRef.ref().child('chat');
		// databaseRef.child(data).remove();
	}

	renderList (){
		return _.map(this.props.listUser, (data,  i)=> {
		  return (
		  	<li key={i} onClick={()=>this.listMessage(data.user)} className="new">
		  		<div className="body">
		  			<div className="header">
			  			<span className="username">{data.user}</span>
			  			<small className="timestamp text-muted">{data.create_at}</small>
			  		</div>
			  		<div>
				  		<span className="userMessage">{data.lastMsg}</span>
				  		{data.unRead > 0?
				  		<span className="badge badge-danger float-right">{data.unRead}</span>
				  		:null}
			  		</div>
			  	</div>
		  	</li>
		  )
		})
	}

	render () {
		return (
			<main className="page projects-page">
                <div className="row">
                	<div className="col-sm-12">
                		<div className="panel panel-white border-top-green">
                			<div className="panel-body chat">
                				<div className="row chat-wrapper">
                					<div className="col-md-4">
                						<div className="chat-list-wrapper" style={{overflowY: "auto", width: "auto", height: "550px"}}>
                							
	                                        {this.props.loadingListUser?
	                                        	<LoadingComponent />
	                                        	:
	                                        	<ul className="chat-list">{this.renderList()}</ul>
	                                        }
                							
                						</div>
                					</div>
                					<div className="col-md-8">
                					{ this.state.sendTo ===''?
                					<LoadingComponent />:
                					<div>
                						<div className="slimScrollDiv" style={{position: "relative", overflow: "hidden", width: "auto", height: "452px"}}>
                							<div className="message-list-wrapper" style={{overflow: "scroll", width: "auto", height: "452px"}} ref="msg">
                								<ul className="message-list">
                									
			                                        	{this.renderMessages()}
                								</ul>
                							</div>
                						</div>
                						<div className="compose-box">
		                                    <div className="row">
		                                       <div className="col-md-12 mg-btm-10">
		                                           <textarea id="btn-input" className="form-control input-sm" placeholder="Type your message here..." onChange={(e)=>{this.setState({msg:e.target.value})}} value={this.state.msg}></textarea>
		                                        </div>
		                                        <div className="col-md-8">
		                                            <button className="btn btn-green btn-sm" onClick={this.logout}>
		                                                <i className="fa fa-camera"></i>
		                                            </button>
		                                            <button className="btn btn-green btn-sm">
		                                                <i className="fa fa-video-camera"></i>
		                                            </button>
		                                            <button className="btn btn-green btn-sm">
		                                                <i className="fa fa-file"></i>
		                                            </button>
		                                        </div>
		                                        <div className="col-md-4">
		                                            <button className="btn btn-green btn-sm pull-right" onClick={()=>this.sendMesageTo(this.state.sendTo)}>
		                                                <i className="fa fa-location-arrow"></i> Send
		                                            </button>
		                                        </div>
		                                    </div>
		                                </div>
                					</div>
                					}
                				</div>
                			</div>
                		</div>
                	</div>
                </div>
            </div>
		    </main>
		)
	}
}

const mapStateToProps = state => {
	return {
		listUser:state.chat.koneksi,
		message:state.chat.message,
		loadingMessage:state.loading.loadingMessage,
		loadingListUser:state.loading.loadingListUser,
	}
}


export default connect(mapStateToProps,{ getListUser, getMessage, adminSendMessage, adminReadMessage })(AdminComponent) ;
