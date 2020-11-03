import { DELETE_FACULTY_SUCCESS, FETCH_FACULTYS_ERROR, FETCH_FACULTYS_LINKS, FETCH_FACULTYS_START, FETCH_FACULTYS_SUCCESS, HIDE_POPUP_FACULTY, SHOW_POPUP_FACULTY, UPDATE_FACULTY_NAME, UPDATE_SPECIALITY_NAME } from "./actionTypes"
import {hidePopUp} from './enrollees'
// import * as firebase from 'firebase'
import axios from '../../axios/axios-arm'
import * as firebase from 'firebase'
   
   
   export function fetchFacultys() {     
      return async dispatch => {        
        dispatch(fetchFacultysStart())            
        try {
          const facultiesResponse = await axios.get('/facultys.json')   

          let faculties = {}
          Object.entries(facultiesResponse.data).forEach((faculty,i) => {     
            Object.assign(faculties,faculty[1])      
          })              
          const facultyName = Object.entries(faculties)[0][0]
          const specialtyName = Object.entries(faculties)[0][1][0]["speaciality"].name 
      
          dispatch(fetchFacultysSuccess(faculties,facultyName,specialtyName))
          dispatch(fetchFacultysLinks(facultiesResponse.data))
        }  catch (e) {
          dispatch(fetchFacultysErrors(e))
        }      
      }
    }

    export function deleteFaculty (faculties,facultyToDelteId ) {
      return async dispatch => {        
        dispatch(hidePopUpFaculty())
        let facultiesWithoutDeleted =  Object.fromEntries(Object.entries(faculties).filter((faculty, index) => {  
          if(faculty[0] !== facultyToDelteId) {          
            return  faculty[0]
          } 
          return null
        }))
        await firebase.database().ref('facultys').child(facultyToDelteId).remove();    
        dispatch(deleteFacultySucceess(facultiesWithoutDeleted))
      }
    }

    export function deleteFacultySucceess(facultiesWithoutDeleted) {
      return {
        type:DELETE_FACULTY_SUCCESS,
        facultiesLinks:facultiesWithoutDeleted
      }
    }
    
    export function fetchFacultysLinks (facultiesLinks) {
      return {
        type: FETCH_FACULTYS_LINKS,
        facultiesLinks,
      }
    }
    
    export function updateSpecialityName (specialtyName) {
      return {
        type: UPDATE_SPECIALITY_NAME,
        specialtyName,
      }
    }

    export function updateFacultyName (facultyName, specialtyName) {
      return {
        type: UPDATE_FACULTY_NAME,
        facultyName,
        specialtyName,
      }
    }
    
    export function fetchFacultysStart() {
      return {
        type: FETCH_FACULTYS_START
      }
    }
    
    export function fetchFacultysSuccess(faculties, facultyName, specialtyName) {
      return {
        type: FETCH_FACULTYS_SUCCESS,
        faculties,
        facultyName,
        specialtyName,
      }
    }
    
    export function fetchFacultysErrors(e) {
      return {
        type: FETCH_FACULTYS_ERROR,
        error:e
      }
    }

    export function showPopUpFaculty(facultyToDeleteId) {
      return {
        type: SHOW_POPUP_FACULTY,
        popUpFaculty: true,
        facultyToDeleteId:facultyToDeleteId
      }
    }
    
    export function hidePopUpFaculty() {    
      return {
        type: HIDE_POPUP_FACULTY      
      }
    }