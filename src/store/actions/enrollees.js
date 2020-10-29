import { FETCH_ENROLLEE_SUCCESS, FETCH_ENROLLEES_START,FETCH_ENROLLEES_ERROR, HIDE_POPUP, SHOW_POPUP, DELETE_USER_SUCCESS } from "./actionTypes"
import * as firebase from 'firebase'
import axios from '../../axios/axios-arm'
    
    export function fetchEnrollees() {
      return async dispatch => {
        dispatch(fetchEnrolleesStart())
        try {
          const response = await axios.get('/enrolls.json') 
          const enrollees = response.data
          dispatch(fetchEnrolleesSuccess(enrollees))
        }  catch (e) {
          dispatch(fetchEnrolleesErrors(e))
        }
      }
    }

    export function deleteEnrollee(enrollees, userToDelteId) {
      return async dispatch=> {
        dispatch(hidePopUp())
        let enrolleesWithoutDeleted =  Object.fromEntries(Object.entries(enrollees).filter((enroll, index) => {  
          if(enroll[0] !== userToDelteId) {          
            return  enroll[0]
          } 
          return null
        }))
        await firebase.database().ref('enrolls').child(userToDelteId).remove();
        // this.props.history.push('/');
    
        // this.setState({
        //   popUp: false,
        //   userToDelteId: null,
        //   enrollers,
        // })
        dispatch(deleteEnrolleeSucceess(enrolleesWithoutDeleted))
      }
    }

    export function deleteEnrolleeSucceess(enrollees) {
      return {
        type: DELETE_USER_SUCCESS,
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
        type: FETCH_ENROLLEE_SUCCESS,
        enrollees
      }
    }
    
    export function fetchEnrolleesErrors(e) {
      return {
        type: FETCH_ENROLLEES_ERROR,
        error:e
      }
    }