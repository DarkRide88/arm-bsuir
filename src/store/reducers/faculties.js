import { CHECK_IS_FROM_VALID, DELETE_FACULTY_SUCCESS, FETCH_FACULTYS_ERROR, FETCH_FACULTYS_LINKS, FETCH_FACULTYS_START, FETCH_FACULTYS_SUCCESS, FETCH_FACULTY_SUCCESS, HIDE_POPUP_FACULTY, SHOW_POPUP_FACULTY, UPDATE_FACULTY_FROM_CONTROLS, UPDATE_FACULTY_NAME, UPDATE_FACULTY_NAME_CONTROL, UPDATE_SPECIALITIES, UPDATE_SPECIALITIES_CONTROLS, UPDATE_SPECIALITY_NAME } from "../actions/actionTypes"

const initialState = {
  faculties: null,  
  facultyName: null,
  specialtyName: null,
  facultiesError: null,
  facultiesLinks: null,
  facultyToDeleteId: null,
  popUpFaculty:false,
  faculty:null,
  facultyNameControl: null,
  specialities :[],
  specialitiesControls: null,
  isFormValid: false,
}

export default function faculties (state = initialState, action) {
  switch(action.type) { 
    default: 
      return state
    case FETCH_FACULTYS_START:
      return {
        ...state, loading:true, 
      }
    case FETCH_FACULTYS_SUCCESS:    
      return {
        ...state, loading: false, faculties: action.faculties, facultyName: action.facultyName, specialtyName: action.specialtyName
      }
    case FETCH_FACULTYS_ERROR:
      return {
        ...state, loading: false, facultiesError: action.error
      }       
    case UPDATE_FACULTY_NAME: 
      return {
        ...state,   facultyName: action.facultyName, specialtyName: action.specialtyName
      }    
    case UPDATE_SPECIALITY_NAME: 
      return {
        ...state, specialtyName: action.specialtyName
      }    
    case FETCH_FACULTYS_LINKS: 
      return {
        ...state, facultiesLinks: action.facultiesLinks
      }    
    case SHOW_POPUP_FACULTY: 
      return {
        ...state, facultyToDeleteId: action.facultyToDeleteId, popUpFaculty: action.popUpFaculty
      }    
    case HIDE_POPUP_FACULTY: 
      return {
        ...state, popUpFaculty: false
      }
    case FETCH_FACULTY_SUCCESS: 
      return {
        ...state, faculty: action.faculty
      }    
    case UPDATE_FACULTY_FROM_CONTROLS: 
   
      return {
        ...state, facultyNameControl: action.facultyNameControl, specialitiesControls: action.specialitiesControls
      }
    case UPDATE_FACULTY_NAME_CONTROL:
      return {
        ...state, facultyNameControl: action.facultyNameControl
      }
    case UPDATE_SPECIALITIES:
      return {
        ...state, specialities: action.specialities
      }
    case UPDATE_SPECIALITIES_CONTROLS:
      return {
        ...state, specialitiesControls: action.specialitiesControls
      }
    case CHECK_IS_FROM_VALID:
      return{
        ...state, isFormValid:action.isFormValid
      }
    case DELETE_FACULTY_SUCCESS: 
    return {
      ...state, facultiesLinks: action.facultiesLinks
    }
  }
}


