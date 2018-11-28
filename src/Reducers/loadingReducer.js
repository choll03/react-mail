import { MESSAGE_STATUS, LIST_USER_STATUS } from '../Actions/chatAction';
import { GET_LANGUAGE_STATUS, GET_PORTFOLIO_STATUS, GET_NILAI_STATUS } from '../Actions/languageAction';

export default function (state = {}, action) {
	switch(action.type){
		case MESSAGE_STATUS:
			return { ...state,loadingMessage:action.payload }
		case LIST_USER_STATUS:
			return { ...state,loadingListUser:action.payload }
		case GET_LANGUAGE_STATUS:
			return { ...state,loadingGetLanguage:action.payload }
		case GET_PORTFOLIO_STATUS:
			return { ...state,loadingGetPortfolio:action.payload }
		case GET_NILAI_STATUS:
			return { ...state,loadingGetNilai:action.payload }
		default:
			return state;
	}
}