import { rootRef } from '../Firebase';
import moment from 'moment';

export const GET_LIST_USER = 'list_user';
export const GET_MESSAGE = 'get_message';
export const COUNT_MESSAGE = 'count_message';
export const MESSAGE_STATUS = 'message_status';
export const LIST_USER_STATUS = 'list_user_status';

function compare(a,b) {
  if (a.sort < b.sort)
    return -1;
  if (a.sort > b.sort)
    return 1;
  return 0;
}

export function getListUser() {
	return dispatch => {
		dispatch({
			type:LIST_USER_STATUS,
			payload:true
		});
		const databaseRef = rootRef.ref().child('chat');
		databaseRef.on('value', snapshot => {
			let koneksi = [];
			snapshot.forEach(childSnapShot => {
				const key = childSnapShot.key;
				let unRead = 0;
				databaseRef.child(key).orderByChild("read").equalTo(0).on('value', childSnapshot3 => {
					childSnapshot3.forEach(lastChild => {
						if(lastChild.val().sendBy === "self")
						{
							unRead++;
						}
					})
				})
				databaseRef.child(key).limitToLast(1).on('value', childSnapshot2 => {
					childSnapshot2.forEach(lastChild => {
						let create_at = lastChild.val().create_at.split(" ");
						let time;
						if(moment(create_at,"DD/MM/YYYY").isSame(Date.now(), "day")){
							time = create_at[1];
						}else{
							time = create_at[0];
						}

						koneksi.push(
							{
								user:key,
								lastMsg:lastChild.val().msg.substr(0, 25),
								sort:(lastChild.val().sort)*-1,
								unRead,
								create_at: time,
							}
						)
					})
				})
				unRead = 0;
				
			})
			dispatch({
				type:GET_LIST_USER,
				payload: koneksi.sort(compare),
			});
			dispatch({
				type:LIST_USER_STATUS,
				payload:false
			});
		})
	}
}

export function getMessage(user) {
	return dispatch => {
		dispatch({
			type:MESSAGE_STATUS,
			payload:true
		});
		const databaseRef = rootRef.ref().child('chat').child(user);
		databaseRef.on('value', snapshot => {
			let messages = [];
			snapshot.forEach(childSnapShot => {
				messages.push(childSnapShot.val());
			})
			dispatch({
				type:GET_MESSAGE,
				payload:messages
			});
			dispatch({
				type:MESSAGE_STATUS,
				payload:false
			});
		})
	}
}

export function countMessage(user, key) {
	return dispatch => {
		let count = 0;
		const databaseRef = rootRef.ref().child('chat').child(user).orderByChild("read").equalTo(0);

		databaseRef.on('value', snapshot => {
			snapshot.forEach(childSnapShot => {
				if(childSnapShot.val().sendBy === key)
				{
					count++;
				}
			})
			dispatch({
				type:COUNT_MESSAGE,
				payload:count
			});
			count = 0;
		})
	}
}


export function readingMessage(user){
	return dispatch => {
		const databaseRef = rootRef.ref().child('chat').child(user);
		databaseRef.orderByChild("read").equalTo(0).once('value', snapshot => {
			snapshot.forEach(childSnapshot => {
				if(childSnapshot.val().sendBy === "other"){
					databaseRef.child(childSnapshot.key).update({read:1});
				}
				
			})
		});
	}
}

export function adminReadMessage(user){
	return dispatch => {
		const databaseRef = rootRef.ref().child('chat').child(user);
		databaseRef.orderByChild("read").equalTo(0).once('value', snapshot => {
			snapshot.forEach(childSnapshot => {
				if(childSnapshot.val().sendBy === "self"){
					databaseRef.child(childSnapshot.key).update({read:1});
				}
				
			})
		});
	}
}

export function SendingMessage(user, msg) {
	return dispatch => {
		const databaseRef = rootRef.ref().child('chat');
		const time = moment().format("DD/MM/YYYY HH:mm");
		databaseRef.child(user).push({msg,sendBy:"self",read:0,sort:Date.now(),create_at:time});
	}
	
}

export function adminSendMessage(user, msg) {
	return dispatch => {
		const databaseRef = rootRef.ref().child('chat');
		const time = moment().format("DD/MM/YYYY HH:mm");
		databaseRef.child(user).push({msg,sendBy:"other",read:0,sort:Date.now(),create_at:time});
	}
	
}