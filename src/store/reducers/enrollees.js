import { FETCH_ENROLLEE_SUCCESS, FETCH_ENROLLEES_START,FETCH_ENROLLEES_ERROR, HIDE_POPUP, SHOW_POPUP, DELETE_USER_SUCCESS } from "../actions/actionTypes"


const initialState = {
  enrollees: null,
  loading:false,
  popUp:false,
  userToDelteId:null
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
    case DELETE_USER_SUCCESS: {
      return {
        ...state, userDeleteId: null, enrollees: action.enrollees
      }
    }
  }

}