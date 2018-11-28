import { GET_LIST_USER, GET_MESSAGE, COUNT_MESSAGE } from '../Actions/chatAction';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_LIST_USER:
      return {...state,koneksi:action.payload};
    case GET_MESSAGE:
      return {...state,message:action.payload};
    case COUNT_MESSAGE:
      return {...state,count:action.payload};
    default:
      return state;
  }
}