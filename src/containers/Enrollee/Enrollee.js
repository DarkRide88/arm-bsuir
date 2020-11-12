import React from 'react'
import styles from '../CreateEnrolle/CreateEnrolle.scss'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import { validate, validateForm} from '../../form/formFramework'
import {renderControls} from '../../utils/formControlsUtils'
import * as firebase from 'firebase'
import Loader from '../../components/UI/Loader/Loader'
import FacultyList from '../../components/FacultyList/FacultyList'
import { fetchFacultys, updateFacultyData, updateSpecialityName } from '../../store/actions/faculties'
import { connect } from 'react-redux'
import { fetchEnrollee, resetEnrollee, updateEnrolleeData, updateEnrolleFormcontrols, updateShoudUpdateEnrolleeStatus } from '../../store/actions/enrollees'
import {selectChangeHandler,selectSpecialtyHandler } from '../../utils/enrollees'


class Enrollee extends React.Component {

  changeEnrolleHandler = (value, controlName, controls) => {  
    const formControls = [...controls];   
    formControls[controlName].touched = true
    formControls[controlName].value = value   
    const enrollee = this.props.enrollee
    enrollee.name=controls[0].value
    enrollee.age=controls[1].value
    enrollee.address=controls[2].value
    enrollee.phoneNumber=controls[3].value
    enrollee.passNumber=controls[4].value
    this.props.updateEnrolleeData(enrollee)
    this.props.updateEnrolleFormcontrols(formControls, this.props.subjectsControls)

  }

  changeCertificate = (value, controlName, controls) => { 
    const formControls = [...controls]; 
    formControls[controlName].touched = true
    formControls[controlName].value = value    
    const enrollee = this.props.enrollee
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
    this.props.updateEnrolleFormcontrols(this.props.enrollerControls, formControls )
    this.props.updateEnrolleeData(enrollee)



  }

  updateEnroller = async (event) =>{
    event.preventDefault()  
    this.props.resetEnrollee()
    await firebase.database().ref('enrolls').child(this.props.match.params.id).set(this.props.enrollee);
    this.props.history.push('/');
  }


  async componentDidMount() {    
    this.props.resetEnrollee()
    if(this.props.faculties === null) {   
      this.props.fetchFacultys()
    }
    this.props.updateShoudUpdateEnrolleeStatus(true)
    this.props.fetchEnrollee(this.props.match.params.id)
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



  render() {  
    return (      
      <Auxillary>  
    
      {this.props.faculties === null || this.props.enrollee.address === '' || this.props.enrollerControls === null
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
                  
                >
                  Сохранить изменения
              </Button>
              </form>
        : <Loader/> }
            
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
    updateShoudUpdateEnrolleeStatus:(shouldUpdate) => dispatch(updateShoudUpdateEnrolleeStatus(shouldUpdate)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enrollee)