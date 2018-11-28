import { GET_BIO } from '../Actions/languageAction';

export default function (state = {experience:[], education: []}, action) {
  switch (action.type) {
    case GET_BIO:
      return action.payload;
    default:
      return state;
  }
}
