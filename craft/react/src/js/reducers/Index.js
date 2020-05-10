import { combineReducers } from "redux"
import { reducer as reduxFormReducer } from 'redux-form';

import pages from './pages/pagesReducer'


export default combineReducers({pages});
