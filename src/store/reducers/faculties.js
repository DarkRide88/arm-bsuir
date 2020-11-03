import { FETCH_FACULTYS_ERROR, FETCH_FACULTYS_LINKS, FETCH_FACULTYS_START, FETCH_FACULTYS_SUCCESS, HIDE_POPUP_FACULTY, SHOW_POPUP_FACULTY, UPDATE_FACULTY_NAME, UPDATE_SPECIALITY_NAME } from "../actions/actionTypes"

const initialState = {
  faculties: null,  
  facultyName: null,
  specialtyName: null,
  facultiesError: null,
  facultiesLinks: null,
  facultyToDeleteId: null,
  popUpFaculty:false,
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
    case UPDATE_FACULTY_NAME: {
      return {
        ...state,   facultyName: action.facultyName, specialtyName: action.specialtyName
      }
    }
    case UPDATE_SPECIALITY_NAME: {
      return {
        ...state, specialtyName: action.specialtyName
      }
    }
    case FETCH_FACULTYS_LINKS: {
      return {
        ...state, facultiesLinks: action.facultiesLinks
      }
    }
    case SHOW_POPUP_FACULTY: {
      return {
        ...state, facultyToDeleteId: action.facultyToDeleteId, popUpFaculty: action.popUpFaculty
      }
    }
    case HIDE_POPUP_FACULTY: {
      return {
        ...state, popUpFaculty: false
      }
    }
  }
}


