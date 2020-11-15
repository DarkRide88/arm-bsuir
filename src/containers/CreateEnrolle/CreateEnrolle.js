import React from 'react'
import styles from './CreateEnrolle.scss'
import {enrolleeControlsData,certificateControlsData} from './DataToEnrolle'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import { validate, validateEnrollee} from '../../form/formFramework'
import * as firebase from 'firebase'
import { NavLink } from 'react-router-dom'
import {createFormControls, renderControls} from '../../utils/formControlsUtils'
import FacultyList from '../../components/FacultyList/FacultyList'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { checkIsFormValid, fetchFacultys, updateFacultyData, updateSpecialityName } from '../../store/actions/faculties'
import { updateEnrolleeData, updateShoudUpdateEnrolleeStatus } from '../../store/actions/enrollees'
import {selectChangeHandler,selectSpecialtyHandler } from '../../utils/enrollees'

class CreateEnrolle extends React.Component {

  state = {
    isFormValid: true,  
    formControls: {
      enrollerControls:[...createFormControls(enrolleeControlsData)],
      subjectsControls:[...createFormControls(certificateControlsData)],   
    },     
  }

  submitHandler = event => {
    event.preventDefault()  
  }

   registerEnrollee = async (event) => {
    event.preventDefault()
    await firebase.database().ref('enrolls').push(this.props.enrollee);
    this.props.history.push('/');     
  }

  changeEnrolleHandler = (value, controlName, controls) => {  
    const enrollee = this.props.enrollee
    const formControls = [...controls];
    const control = formControls[controlName]
    control.touched = true
    control.value = value    
    control.valid = validate(value, control.validation)
    enrollee.name=controls[0].value
    enrollee.age=controls[1].value
    enrollee.address=controls[2].value
    enrollee.phoneNumber=controls[3].value
    enrollee.passNumber=controls[4].value
    this.props.updateEnrolleeData(enrollee)  
    let IsValid = validateEnrollee(this.state.formControls.enrollerControls)
    this.props.checkIsFormValid(IsValid)
    this.setState({                
    })
  }

  changeCertificate = (value, controlName, controls) => { 
    const enrollee = this.props.enrollee
    const formControls = [...controls];
    const control = formControls[controlName]
    control.touched = true
    control.value = value     
    formControls[controlName] = control  
    control.valid = validate(value, control.validation)
    enrollee.сertificate.math = controls[0].value
    enrollee.сertificate.physics = controls[1].value
    enrollee.сertificate.chemistry = controls[2].value
    enrollee.сertificate.biology = controls[3].value
    enrollee.сertificate.geography = controls[4].value
    enrollee.сertificate.russianLang = controls[5].value
    enrollee.сertificate.belLang = controls[6].value
    enrollee.сertificate.belLitr = controls[7].value
    enrollee.сertificate.russianLitr = controls[8].value
    enrollee.сertificate.physicalEduc = controls[9].value
    enrollee.сertificate.english = controls[10].value
    enrollee.сertificate.historyBel = controls[11].value
    enrollee.сertificate.historyWorld = controls[12].value
    enrollee.сertificate.computerScince = controls[13].value
    let IsValid = validateEnrollee(this.state.formControls.subjectsControls)
    this.props.checkIsFormValid(IsValid)
    this.props.updateEnrolleeData(enrollee)
    this.setState({           
    })
  } 

  setStartedFacultyData = (facultyName, speaciality) => {
    this.props.faculties[facultyName].forEach(faculty => {        
      if(faculty.name=== speaciality){       
        let enrollee =  this.props.enrollee      
        enrollee.facultyName =  this.props.facultyNameKey
        enrollee.specialtyName =  this.props.specialityNameKey
        enrollee.exams = {
          exam1: {name:faculty['exam1'],mark: ''},
          exam2: {name:faculty['exam2'],mark: ''},
          exam3: {name:faculty['exam3'],mark: ''}
        }     
        this.props.updateEnrolleeData(enrollee)      
      }
    }) 
  }

  renderFacultyList () { 
    this.setStartedFacultyData(this.props.facultyName, this.props.specialtyName)   
    return (
      <FacultyList
      facultiesList = {this.props.faculties}
      defaultFacultyName = {Object.keys(this.props.faculties)[0]}
      selectFacultyChangeHandler = {(event)=> {selectChangeHandler(event, this.props)}}
      selectSpecialtyChangeHandler = {(event)=> {selectSpecialtyHandler(event, this.props)}}
      enrolleeSpeciality = {this.props.specialtyName}
      enrolleeFaculty = {this.props.facultyName}
    /> 
    )
  }

  componentDidMount() {     
    if(this.props.faculties === null) {        
      this.props.fetchFacultys()
    }
    this.props.updateShoudUpdateEnrolleeStatus(true)
  }  

  render() { 
    return (         
      <Auxillary>   
        { this.props.faculties !== null && this.props.faculties !== 'undefined'  ?                  
            <div className={styles['create-enrolle']}>     
              <form onSubmit={this.submitHandler}> 
                <div className={styles['create-enrolle__item1']}>
                  <h2>Данные абитуриента:</h2>  
                  <hr/>         
                  {renderControls(this.state.formControls.enrollerControls, this.changeEnrolleHandler)}                    
                  {this.renderFacultyList()}                       
                </div>  
                <div  className={styles['create-enrolle__item2']}>         
                  <h2>Аттестат:</h2>
                  <hr/>
                  <div className={styles['create-enrolle__certificate']}>
                  {renderControls(this.state.formControls.subjectsControls, this.changeCertificate)}</div>   
                </div>
                <hr/>     
                <NavLink to='/'>
                  <Button
                    type="success"
                    onClick={this.registerEnrollee}
                    disabled={this.props.isFormValid === false}
                  >
                    Зарегистрировать
                  </Button>       
                </NavLink>                  
              </form>        
            </div>
          :<Loader/>  
        }  
      </Auxillary>
    )
  }
}

function mapStateToProps(state) {
  return {
    faculties: state.faculties.faculties,
    loading: state.enrollees.loading,
    enrollee: state.enrollees.enrollee,
    specialtyName: state.faculties.specialtyName,
    facultyName:  state.faculties.facultyName,
    facultiesFromRespoense: state.faculties.facultiesFromRespoense,
    facultyNameKey: state.faculties.facultyNameKey,
    specialityNameKey: state.faculties.specialityNameKey,
    isFormValid: state.faculties.isFormValid

  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEnrollees: () => {dispatch(fetchFacultys())},
    fetchFacultys: () => {dispatch(fetchFacultys())},
    updateEnrolleeData: (enrollee) => {dispatch(updateEnrolleeData(enrollee))},
    updateFacultyData:(facultyName, specialtyName, facultyNameKey,specialityNameKey ) => dispatch(updateFacultyData(facultyName, specialtyName, facultyNameKey, specialityNameKey)),
    updateSpecialityName:(specialtyName, specialtyNameKey) => dispatch(updateSpecialityName(specialtyName, specialtyNameKey)),
    updateShoudUpdateEnrolleeStatus:(shouldUpdate) => dispatch(updateShoudUpdateEnrolleeStatus(shouldUpdate)),
    checkIsFormValid: (isFormValid) => dispatch(checkIsFormValid(isFormValid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEnrolle)