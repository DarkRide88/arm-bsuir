import { FETCH_ENROLLEES_SUCCESS, FETCH_ENROLLEES_START,FETCH_ENROLLEES_ERROR, HIDE_POPUP, SHOW_POPUP, DELETE_USER_SUCCESS, RESET_SEARCH_FIELD, SET_SEARCHED_INPUT_VALUE, UPDATE_ENROLLEES, UPDATE_ENROLLE_DATA, CREATE_ENROLLE } from "../actions/actionTypes"


const initialState = {
  enrollees: null,
  loading:true,
  popUp:false,
  userToDelteId:null,
  searchInputValue: null,
  enrolleesError:null,
  enrollee: {
    сertificate: {
      math:{},physics:{},chemistry:{},biology:{},geography:{},russianLang:{},belLang:{},belLitr:{},russianLitr:{},physicalEduc:{},english:{},historyBel:{},historyWorld:{},computerScince:{}  
    },
    name:'',
    age:'',
    phoneNumber:'',
    passNumber:'',
    address:'',
    medalist: false,
    facultyName: null,
    specialtyName: null,

    exams: {
      exam1: {
        name:null,
        mark: ''
      },
      exam2: {
        name:null,
        mark: ''
      },
      exam3: {
        name:null,
        mark: ''
      }
    }
  }
}

export default function enrollees (state = initialState, action) {

  switch(action.type) {
    default: 
      return state
    case FETCH_ENROLLEES_START:
      return {
        ...state, loading:true, 
      }
    case FETCH_ENROLLEES_SUCCESS:
      return {
        ...state, loading: false, enrollees: action.enrollees
      }
    case FETCH_ENROLLEES_ERROR:
      return {
        ...state, loading: false, enrolleesError: action.error.name
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
      return {
        ...state,  enrollees: action.enrollees
      }
    case UPDATE_ENROLLE_DATA: 
    console.log(state.enrollee)
    return {
      ...state, enrollee: action.enrollee
    }
    case CREATE_ENROLLE: 
    return {
      ...state, enrollee: initialState.enrollee
    }
  
    
  }

}