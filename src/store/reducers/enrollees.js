import { FETCH_ENROLLEE_SUCCESS, FETCH_ENROLLEES_START,FETCH_ENROLLEES_ERROR, HIDE_POPUP, SHOW_POPUP, DELETE_USER_SUCCESS, RESET_SEARCH_FIELD, SET_SEARCHED_INPUT_VALUE, FIND_ENROLLEE_SUCCESS, UPDATE_ENROLLEES } from "../actions/actionTypes"


const initialState = {
  enrollees: null,
  loading:false,
  popUp:false,
  userToDelteId:null,
  searchInputValue: null,
}

export default function enrollees (state = initialState, action) {

  switch(action.type) {
    default: 
      return state
    case FETCH_ENROLLEES_START:
      return {
        ...state, loading:true, 
      }
    case FETCH_ENROLLEE_SUCCESS:
      return {
        ...state, loading: false, enrollees: action.enrollees
      }
    case FETCH_ENROLLEES_ERROR:
      return {
        ...state, loading: false, error: action.error
      }
    case HIDE_POPUP:
      return {
        ...state, popUp: action.popUp
      }
    case SHOW_POPUP:
      return {
        ...state, popUp: action.popUp, userToDelteId: action.enrollee
      }
    case DELETE_USER_SUCCESS: 
      return {
        ...state, userDeleteId: null, enrollees: action.enrollees
      }

    case RESET_SEARCH_FIELD: 
      return {
        ...state, searchInputValue:null, enrollees: action.enrollees
      }
    case SET_SEARCHED_INPUT_VALUE:
      return {
        ...state, searchInputValue: action.searchInputValue,
      }
    case UPDATE_ENROLLEES:
      console.log(action.enrollees)
      return {
        ...state,  enrollees: action.enrollees
      }
    
    
  }

}