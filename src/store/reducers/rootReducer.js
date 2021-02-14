import {combineReducers} from 'redux'
import enrollees from './enrollees'
import faculties from './faculties'
import authReducer from './auth'
export default combineReducers({
    enrollees, faculties, authReducer
})