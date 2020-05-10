import { combineReducers } from "redux"
import { reducer as reduxFormReducer } from 'redux-form';

import pages from './pages/PagesReducer'


export default combineReducers({pages});
