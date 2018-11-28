import { GET_NILAI } from '../Actions/languageAction';

export default function (state = [], action) {
  switch (action.type) {
    case GET_NILAI:
      return action.payload;
    default:
      return state;
  }
}
