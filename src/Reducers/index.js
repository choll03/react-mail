import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import portfolioReducer from './portfolioReducer';
import nilaiReducer from './nilaiReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
	language: languageReducer,
	loading: loadingReducer,
	portfolio: portfolioReducer,
	nilai: nilaiReducer
});

export default rootReducer;