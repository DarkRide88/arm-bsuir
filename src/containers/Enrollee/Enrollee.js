import React from 'react'
import styles from '../CreateEnrolle/CreateEnrolle.scss'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import { validate,  validateEnrollee} from '../../form/formFramework'
import {renderControls} from '../../utils/formControlsUtils'
import * as firebase from 'firebase'
import Loader from '../../components/UI/Loader/Loader'
import FacultyList from '../../components/FacultyList/FacultyList'
import { checkIsFormValid, fetchFacultys, updateFacultyData, updateSpecialityName } from '../../store/actions/faculties'
import { connect } from 'react-redux'
import { fetchEnrollee, resetEnrollee, updateEnrolleeData, updateEnrolleFormcontrols, updateShoudUpdateEnrolleeStatus } from '../../store/actions/enrollees'
import {selectChangeHandler,selectSpecialtyHandler } from '../../utils/enrollees'


class Enrollee extends React.Component {

  changeEnrolleHandler = (value, targetControl, controlId) => {  
    const formControls = [...this.props.enrollerControls];         
    const control = formControls[controlId]   

    control.touched = true
    control.value = value   
    control.valid = validate(value,   control.validation)
    const enrollee = {...this.props.enrollee}
    enrollee[targetControl.name]=targetControl.value
    formControls[controlId] = control
    this.props.updateEnrolleeData(enrollee)
    this.props.updateEnrolleFormcontrols(formControls, this.props.subjectsControls)
    let IsValid = validateEnrollee(this.props.enrollerControls)
    this.props.checkIsFormValid(IsValid)
  }

  changeCertificate = (value, targetControl, controlId) => { 
    const formControls = [...this.props.subjectsControls];         
    const control = formControls[controlId] 

    control.touched = true
    control.value = value    
    control.valid = validate(value,  control.validation)

    const enrollee = {...this.props.enrollee} 
    enrollee.сertificate[targetControl.name] = targetControl.value
    formControls[controlId] = control
    let IsValid = validateEnrollee(this.props.subjectsControls)
    this.props.checkIsFormValid(IsValid)
    this.props.updateEnrolleFormcontrols(this.props.enrollerControls, formControls )
    this.props.updateEnrolleeData(enrollee)
  }

  getFacultyDataFromKeys() {
    let facultyName
    let specialtyName 
    Object.entries(this.props.facultiesFromRespoense).forEach(faculty => {
      if(this.props.enrollee.facultyName === faculty[0]) {
        specialtyName = Object.values(faculty[1])[0][this.props.enrollee.specialtyName].name      
        facultyName = Object.keys(faculty[1])[0]
      }
    })
    return [specialtyName, facultyName]
  }

  renderFacultyList = () => { 
    if(this.props.isFirstLoad) {      
      let [specialtyName, facultyName] = this.getFacultyDataFromKeys()
      this.props.updateFacultyData(facultyName, specialtyName, this.props.enrollee.facultyName, this.props.enrollee.specialtyName)
    }     
    return(
      <FacultyList
      facultiesList = {this.props.faculties}
      defaultFacultyName = {this.props.enrollee.facultyName}
      selectFacultyChangeHandler = {(event)=> {selectChangeHandler(event, this.props)}}
      selectSpecialtyChangeHandler = {(event)=> {selectSpecialtyHandler(event, this.props)}}
      enrolleeSpeciality = {this.props.specialtyName}
      enrolleeFaculty = {this.props.facultyName}
      />    
      )
  }
  updateEnroller = async (event) =>{
    event.preventDefault()     
    this.props.resetEnrollee()
    await firebase.database().ref('enrolls').child(this.props.match.params.id).set(this.props.enrollee);
    this.props.history.push('/');
  }

  async componentDidMount() {    
    document.title = 'Абитуриент'
    this.props.checkIsFormValid(true)
    this.props.resetEnrollee()
    if(this.props.faculties === null) {   
      this.props.fetchFacultys()
    }
    this.props.updateShoudUpdateEnrolleeStatus(true)
    this.props.fetchEnrollee(this.props.match.params.id)
  }

  render() {  
    return (      
      <Auxillary>      
        { this.props.faculties === null || this.props.enrollee.address === '' || this.props.enrollerControls === null
          ? <Loader/> 
          : <div className={styles['create-enrolle']}>   
          {
            this.props.enrollerControls !== null ?
              <form onSubmit={this.submitHandler}> 
                <div className={styles['create-enrolle__item1']}>
                  <h2>Данные абитуриента:</h2>            
                  {renderControls(this.props.enrollerControls, this.changeEnrolleHandler)} 
                  {this.renderFacultyList()}
                </div>  
                <div  className={styles['create-enrolle__item2']}>         
                  <h2>Аттестат</h2>
                  <div className={styles['create-enrolle__certificate']}>
                    {renderControls(this.props.subjectsControls, this.changeCertificate)}
                  </div>   
                </div>            
                <hr/>            
                <Button
                  type="success"
                  onClick={this.updateEnroller}
                  disabled={this.props.isFormValid === false}
                >
                  Сохранить изменения
                </Button>
              </form>
            : <Loader/> 
          }            
            </div>
        } 
      </Auxillary>      
    )
  }
}

function mapStateToProps(state) {
  return {
    faculties: state.faculties.faculties,
    loading: state.enrollees.loading,
    facultyName: state.faculties.facultyName,
    specialtyName: state.faculties.specialtyName,
    enrollee: state.enrollees.enrollee,
    enrollerControls :state.enrollees.enrollerControls,
    subjectsControls : state.enrollees.subjectsControls,
    facultiesFromRespoense: state.faculties.facultiesFromRespoense,
    facultyNameKey: state.faculties.facultyNameKey,
    specialityNameKey: state.faculties.specialityNameKey,
    isFirstLoad: state.faculties.isFirstLoad,
    isFormValid: state.faculties.isFormValid
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFacultys: () => dispatch(fetchFacultys()),
    fetchEnrollee: (id) => dispatch(fetchEnrollee(id)),
    updateEnrolleeData: (enrollee) => dispatch(updateEnrolleeData(enrollee)),
    resetEnrollee: () => dispatch(resetEnrollee()),
    updateFacultyData:(facultyName, specialtyName, facultyNameKey,specialityNameKey ) => dispatch(updateFacultyData(facultyName, specialtyName, facultyNameKey, specialityNameKey)),
    updateSpecialityName:(specialtyName, specialtyNameKey) => dispatch(updateSpecialityName(specialtyName, specialtyNameKey)),
    updateEnrolleFormcontrols: (enrollerControls, subjectsControls) => dispatch( updateEnrolleFormcontrols (enrollerControls, subjectsControls)),
    updateShoudUpdateEnrolleeStatus:(shouldUpdate) => dispatch(updateShoudUpdateEnrolleeStatus(shouldUpdate)) ,
    checkIsFormValid: (isFormValid) => dispatch(checkIsFormValid(isFormValid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enrollee)