import { FETCH_ENROLLEES_SUCCESS, FETCH_ENROLLEES_START,FETCH_ENROLLEES_ERROR, HIDE_POPUP, SHOW_POPUP, DELETE_ENROLLEE_SUCCESS, RESET_SEARCH_FIELD, SET_SEARCHED_INPUT_VALUE, UPDATE_ENROLLEES, UPDATE_ENROLLE_DATA, FETCH_ENROLLEE_SUCCESS, UPDATE_ENROLLEE_FROM_CONTROLS, RESET_ENROLLEE } from "./actionTypes"
import {enrolleeControlsData,certificateControlsData} from '../../containers/CreateEnrolle/DataToEnrolle'
import * as firebase from 'firebase'
import axios from '../../axios/axios-arm'
import {createEnrolleeFormControls} from '../../utils/formControlsUtils'

    export function fetchEnrollees() {     
      return async dispatch => {        
        dispatch(fetchEnrolleesStart())            
        try {
          const response = await axios.get('/enrolls.json') 
          const enrollees   = response.data              
          dispatch(fetchEnrolleesSuccess(enrollees))
        }  catch (e) {
          dispatch(fetchEnrolleesErrors(e))
        }      
      }
    }

    export function fetchEnrollee(id) {     
      return async dispatch => {        
        dispatch(fetchEnrolleesStart())            
        try {
          const response = await axios.get(`/enrolls/${id}.json`)     
          let enrollee = response.data   
          dispatch(fetchEnrolleeSuccess(enrollee))   
          dispatch(  updateEnrolleFormcontrols([...createEnrolleeFormControls(enrolleeControlsData, enrollee)], [...createEnrolleeFormControls(certificateControlsData, enrollee.сertificate)]  )  )     
         
        }  catch (e) {
          dispatch(fetchEnrolleesErrors(e))
        }      
      }
    }

    export function updateEnrolleFormcontrols (enrollerControls, subjectsControls) {     
      return {
        type: UPDATE_ENROLLEE_FROM_CONTROLS,
        enrollerControls:enrollerControls,
        subjectsControls:subjectsControls
      }
    }

    export function fetchEnrolleeSuccess(enrollee) {
      return {
        type: FETCH_ENROLLEE_SUCCESS,
        enrollee
      }
    }

    export function fetchEnrolledEnrollees() {
     
      return async dispatch => {        
        dispatch(fetchEnrolleesStart())           
        try {
          const response = await axios.get('/enrolls.json')  
          const enrollees =   Object.fromEntries(Object.entries(response.data  ).filter(enrollee => {
            if(enrollee[1].readyToResults) {
              return enrollee
            }
            return null
          }))       
          dispatch(fetchEnrolleesSuccess(enrollees))
        }  catch (e) {
          dispatch(fetchEnrolleesErrors(e))
        }      
      }
    }

    export function findEnrollee(event, enrollees) {   
      return async dispatch => {
        let searchInputValue = event.target.value
        let foundEnrollees = []     
        dispatch(setSearchInputValue(searchInputValue))

         Object.entries(enrollees).forEach(enrollee => {     
          let name = enrollee[1].name.toLowerCase()
         
          if(name.indexOf(searchInputValue.toLowerCase()) === 0 && searchInputValue !== ''){
            Object.entries(enrollees).forEach(enrollee => {          
              if(enrollee[1].name.toLowerCase() === name){
                foundEnrollees.push(enrollee)            
              }
            })
            
            console.log(foundEnrollees)
            dispatch(updateEnrollees(Object.fromEntries(foundEnrollees)))
          }
        })
      
        if(searchInputValue === '') {
          const response = await axios.get('/enrolls.json')    
          dispatch(resetSeatchField(response.data))      
        }
      }
    }

    export function deleteEnrollee(enrollees, userToDelteId) {
      return async dispatch=> {
        dispatch(hidePopUp())
        let enrolleesWithoutDeleted =  Object.fromEntries(Object.entries(enrollees).filter((enroll) => {  
          if(enroll[0] !== userToDelteId) {          
            return  enroll[0]
          } 
          return null
        }))
        await firebase.database().ref('enrolls').child(userToDelteId).remove();    
        dispatch(deleteEnrolleeSucceess(enrolleesWithoutDeleted))
      }
    }

    export function setSearchInputValue (searchInputValue) {
      return {
        type: SET_SEARCHED_INPUT_VALUE,
        searchInputValue,
      }
    }

    export function updateEnrollees (enrollees) {    
      return {
        type: UPDATE_ENROLLEES,
        enrollees, 
      }
    }

    export function resetSeatchField (enrollees) {     
      return {
        type: RESET_SEARCH_FIELD,   
        enrollees,    
      }
    }

    export function updateEnrolleeData(enrollee) {

      return {
        type: UPDATE_ENROLLE_DATA,
        enrollee,
      }
    }

    export function resetEnrollee() {
      return {
        type: RESET_ENROLLEE,
      }
    }

    export function deleteEnrolleeSucceess(enrollees) {
      return {
        type: DELETE_ENROLLEE_SUCCESS,
        enrollees: enrollees,
        userToDelteId: null,
      }
    }

    export function showPopUp(enrollee) {
      return {
        type: SHOW_POPUP,
        popUp: true,
        enrollee:enrollee
      }
    }
    
    export function hidePopUp() {    
      return {
        type: HIDE_POPUP,
        popUp: false
      }
    }

    export function fetchEnrolleesStart() {
      return {
        type: FETCH_ENROLLEES_START
      }
    }
    
    export function fetchEnrolleesSuccess(enrollees) {
      return {
        type: FETCH_ENROLLEES_SUCCESS,
        enrollees
      }
    }
    
    export function fetchEnrolleesErrors(e) {
      return {
        type: FETCH_ENROLLEES_ERROR,
        error:e
      }
    }