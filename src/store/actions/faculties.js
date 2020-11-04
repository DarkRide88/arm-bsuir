import { FETCH_FACULTYS_ERROR, FETCH_FACULTYS_LINKS, FETCH_FACULTYS_START, FETCH_FACULTYS_SUCCESS, HIDE_POPUP_FACULTY, SHOW_POPUP_FACULTY, UPDATE_FACULTY_NAME, UPDATE_SPECIALITY_NAME , FETCH_FACULTY_SUCCESS, UPDATE_FACULTY_FROM_CONTROLS, UPDATE_FACULTY_NAME_CONTROL, UPDATE_SPECIALITIES, UPDATE_SPECIALITIES_CONTROLS, CHECK_IS_FROM_VALID, DELETE_FACULTY_SUCCESS} from "./actionTypes"
import {createFormControls} from '../../utils/formControlsUtils'

import axios from '../../axios/axios-arm'
import * as firebase from 'firebase'

const facultyDefault = [['', 'text','facultyName', '', 'Введите название факультета']]   
const specialityDefault = [
  ['Название специальности','text','name'],['Количество мест','text','numberOfPlaces'],
  ['Экзамен 1','text','exam1'], ['Дата консультации','date','exam1ConsDate'],['Дата сдачи','date','exam1ExamDate'],
  ['Время консультации','text','exam1ConsTime'],['Время сдачи','text','exam1ExamTime'],
  ['Экзамен 2','text','exam2'],  ['Дата консультации','date','exam2ConsDate'],['Дата сдачи','date','exam2ExamDate'],
  ['Время консультации','text','exam2ConsTime'],['Время сдачи','text','exam2ExamTime'],
  ['Экзамен 3','text','exam3'], ['Дата консультации','date','exam3ConsDate'],['Дата сдачи','date','exam3ExamDate'],
  ['Время консультации','text','exam3ConsTime'],['Время сдачи','text','exam3ExamTime'],
] 
   
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
          // console.log(Object.entries(faculties)[0][1][0]['name'])
          const specialtyName = Object.entries(faculties)[0][1][0]["name"] 
         
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

    export function fetchFaculty(id) {
      return async dispatch => {        
        dispatch(fetchFacultysStart())            
        try {
          const response = await axios.get(`/facultys/${id}.json`)     
          let faculty = response.data           
          dispatch(fetchFacultySuccess(faculty))   
          console.log(Object.values(faculty)[0])
          dispatch( checkIsFormValid(true)) 
          dispatch(updateSpecialities(Object.values(faculty)[0])) 
          dispatch(updateFacultyFormcontrols(facultyNameToControl(faculty),specialitiesToControls(faculty)))
        
        }  catch (e) {
          dispatch(fetchFacultysErrors(e))
        }      
      }
    }


    export function facultyNameToControl(faculty) {           
      let facultyNameControl = createFormControls(facultyDefault)
      facultyNameControl[0].value = Object.keys(faculty)[0]
      return facultyNameControl
    }
    export function checkIsFormValid(isFormValid) {
      return {
        type: CHECK_IS_FROM_VALID,
        isFormValid
      }
    }
    export function specialitiesToControls(faculty) {
        let specialitiesControls =[]
     
       Object.values(faculty)[0].forEach(speciality => {
        let arr1 = []  
         Object.keys(speciality).forEach(specialityName => {
          let  specialityControl = createFormControls(specialityDefault)     
          specialityControl.map(control => {  
            if(control.name === specialityName){      
              control.valid = true
              control.touched = true
              control.value = speciality[specialityName]  
              arr1.push(control)              
            }           
          })             
         })
         let numberOfPlace = arr1.pop()      
         let name = arr1.pop()    
         arr1.unshift(name,numberOfPlace)
         specialitiesControls.push(arr1)  
       })      
      return specialitiesControls
    }
   
    export function updateSpecialities(specialities){
      return {
        type:UPDATE_SPECIALITIES,
        specialities
      }
    }

    export function updateFacultyFormcontrols(facultyNameControl, specialitiesControls) {
  
      return {
        type: UPDATE_FACULTY_FROM_CONTROLS,
        facultyNameControl,
        specialitiesControls
        
        
      }
    }

    export function updatefacultyNameControl(facultyNameControl){     
      return {
        type: UPDATE_FACULTY_NAME_CONTROL,
        facultyNameControl
      }
    }

    export function updateSpecialitiesControls(specialitiesControls){  
      return {
        type: UPDATE_SPECIALITIES_CONTROLS,
        specialitiesControls
      }
    }

    export function fetchFacultySuccess(faculty) {
      return {
        type: FETCH_FACULTY_SUCCESS,
        faculty,
      }
    }

    export function deleteFacultySucceess(facultiesWithoutDeleted) {
      console.log(facultiesWithoutDeleted)
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