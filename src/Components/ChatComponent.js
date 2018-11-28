import React , { Component } from 'react';
import Spinner from 'react-spinner-material';

class ChatComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			openChat : false,
			message : '',
		}

		this.handleOpenChat = this.handleOpenChat.bind(this);
		this.closeChat = this.closeChat.bind(this);
	}

	componentDidMount() {
		this.props.onRef(this)
	}

	componentWillMount() {
		this.props.onRef(null)
	}

	method() {
		const msg = this.refs.msg_value.innerHTML;
		this.refs.msg_value.innerHTML = "";
		this.refs.msg_value.focus();
		return msg;
	}

	componentDidUpdate() {
		if(this.state.openChat){
			this.scrollToBottom();
		}
		
	}

	scrollToBottom() {
		const scrollHeight = this.refs.msg.scrollHeight;
	 	const height = this.refs.msg.clientHeight;
	 	const maxScrollTop = scrollHeight - height;
	 	this.refs.msg.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
	}

	handleOpenChat() {
		this.setState({openChat: true}, () => {
			this.refs.msg_value.focus();
		});
	}

	closeChat() {
		this.setState({openChat: false});
	}

	render () {
		if(this.state.openChat){
			return (
				<div className="floating-chat expand">
		            <div className="chat enter">
		                <div className="header"><span className="title">what's on your mind?</span><button onClick={this.props.closeChat} className="btn btn-link" type="button"><i className="fa fa-times"></i></button></div>
		                <ul className="messages" ref="msg">
		                    {this.props.messages.map((data, i) => (
		                    	<li key={i} className={data.sendBy} dangerouslySetInnerHTML={{ __html: data.msg }} />
		                    ))}
		                </ul>
		                <div className="footer">
		                    { /*<input className="text-box" placeholder="Type your Message"/>*/}
		                    <div className="text-box" contentEditable ref="msg_value" placeholder="Type Here..."></div>
		                    <button className="btn btn-success" onClick={this.props.sendMessage} id="sendMessage"><i className="fa fa-send"></i></button></div>
		            </div>
		        </div>
			)
		}else {
			return (
				<div className="floating-chat" onClick={!this.props.loading?this.props.handleOpenChat:null} style={this.props.loading?{background:"none"}:null}>
					{this.props.loading?
						<Spinner size={40} spinnerColor={"blue"} spinnerWidth={5} visible={true} />
						:<div>
							{this.props.unRead > 0 ?<span className="badge badge-danger" style={{position:"absolute",top:"-5px",right:0}}>{this.props.unRead}</span>:null}
							<i className="fa fa-commenting"></i>
						</div>
					}
		        </div>
			)
			// return (
			// 	<div className="floating-chat" onClick={this.handleOpenChat}>
			// 		<span className="badge badge-danger" style={{position:"absolute",top:"-5px",right:0}}>9</span>
		 //            <i className="fa fa-commenting"></i>
		 //        </div>
			// )
		}
	}
}

export default ChatComponent ;