import React from 'react'
import styles from '../CreateEnrolle/CreateEnrolle.scss'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import { validate, validateForm} from '../../form/formFramework'
import {renderControls} from '../../utils/formControlsUtils'
import * as firebase from 'firebase'
import Loader from '../../components/UI/Loader/Loader'
import FacultyList from '../../components/FacultyList/FacultyList'
import { fetchFacultys } from '../../store/actions/faculties'
import { connect } from 'react-redux'
import { fetchEnrollee, resetEnrollee, updateEnrolleeData } from '../../store/actions/enrollees'



class Enrollee extends React.Component {
  state = {    
    isFormValid: true, 
    formControls: {
      enrollerControls:null,
      subjectsControls: null
    },
  }


  updateExamsNames = (speaciality, facultyName, enrollee) => {
    this.props.faculties[facultyName].forEach(faculty => { 
      if(faculty.speaciality.name=== speaciality){            
        enrollee.exams = {
          exam1: {name:faculty['exam1'],mark: ''},
           exam2: {name:faculty['exam2'],mark: ''},
           exam3: {name:faculty['exam3'],mark: ''}
        }
        this.props.updateEnrolleeData(enrollee) 
      }
    })  
  }

  selectChangeHandler = (event) => {   
    const enrollee = {...this.props.enrollee}
    enrollee.facultyName = event.target.value
    enrollee.specialtyName = this.props.faculties[ event.target.value][0]["speaciality"].name
    console.log( enrollee)
   
    this.props.updateEnrolleeData(enrollee)
    this.updateExamsNames(enrollee.specialtyName,event.target.value , enrollee )   
  }

  selectSpecialtyHandler = (event) => {   
    const enrollee = this.props.enrollee
    enrollee.specialtyName = event.target.value       
    this.props.updateEnrolleeData(enrollee)
    this.updateExamsNames(event.target.value)  
  }


  changeEnrolleHandler = (value, controlName, controls) => {  
    const enrollee = this.props.enrollee
    const formControls = [...controls];
    const control = formControls[controlName]
    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)
    enrollee.name=controls[0].value
    enrollee.age=controls[1].value
    enrollee.address=controls[2].value
    enrollee.phoneNumber=controls[3].value
    enrollee.passNumber=controls[4].value
    this.setState({    
      enrollee,
      isFormValid: validateForm(this.props.enrollerControls, this.props.subjectsControls)
    })
  }

  changeCertificate = (value, controlName, controls) => { 
    console.log(controls)
    const enrollee = this.props.enrollee
    const formControls = [...controls];
    const control = formControls[controlName]
    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)
    formControls[controlName] = control  
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
    this.props.updateEnrolleeData(enrollee)
    this.setState({             
      isFormValid: validateForm(this.props.enrollerControls, this.props.subjectsControls)
    })
  }

  updateEnroller = async (event) =>{
    event.preventDefault()  
    this.props.resetEnrollee()
    await firebase.database().ref('enrolls').child(this.props.match.params.id).set(this.props.enrollee);
    this.props.history.push('/');
  }

  updateDataInState(enrollee ) {    
    this.setState({
      enrollee,
          
    })   
  }

  async componentDidMount() {     
    this.props.resetEnrollee()
    this.props.fetchFacultys()
    this.props.fetchEnrollee(this.props.match.params.id)
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
                <FacultyList
                      facultiesList = {this.props.faculties}
                      defaultFacultyName = {this.props.enrollee.facultyName}
                      selectFacultyChangeHandler = {this.selectChangeHandler}
                      selectSpecialtyChangeHandler = {this.selectSpecialtyHandler}
                      state = {this.state}
                      enrolleeSpeciality = {this.props.enrollee.specialtyName}
                      enrolleeFaculty = {this.props.enrollee.facultyName}
                />    

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
                  disabled={this.state.isFormValid === false}
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
    specialityName: state.faculties.specialityName,
    enrollee: state.enrollees.enrollee,
    enrollerControls :state.enrollees.enrollerControls,
    subjectsControls : state.enrollees.subjectsControls,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchFacultys: () => dispatch(fetchFacultys()),
    fetchEnrollee: (id) => dispatch(fetchEnrollee(id)),
    updateEnrolleeData: (enrollee) => dispatch(updateEnrolleeData(enrollee)),
    resetEnrollee: () => dispatch(resetEnrollee())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enrollee)