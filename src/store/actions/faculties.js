import { FETCH_FACULTYS_ERROR, FETCH_FACULTYS_START, FETCH_FACULTYS_SUCCESS, UPDATE_FACULTY_NAME, UPDATE_SPECIALITY_NAME } from "./actionTypes"

// import * as firebase from 'firebase'
import axios from '../../axios/axios-arm'
   
   
   
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
        }  catch (e) {
          dispatch(fetchFacultysErrors(e))
        }      
      }
    }

    export function updateSpecialityName (specilaityName) {
      return {
        type: UPDATE_SPECIALITY_NAME,
        specilaityName,
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