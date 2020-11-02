import React from 'react'
import styles from './CreateEnrolle.scss'
import {enrolleeControlsData,certificateControlsData} from './DataToEnrolle'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import { validate, validateForm} from '../../form/formFramework'
import * as firebase from 'firebase'
import { NavLink } from 'react-router-dom'

import {createFormControls, renderControls} from '../../utils/formControlsUtils'
import FacultyList from '../../components/FacultyList/FacultyList'

import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchFacultys, updateFacultyName, updateSpecialityName } from '../../store/actions/faculties'
import { updateEnrolleeData } from '../../store/actions/enrollees'
class CreateEnrolle extends React.Component {

  state = {
    isFormValid: false,  
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

    updateExamsNames = (speaciality, facultyName) => {    
      this.props.faculties[facultyName].forEach(faculty => {    
      if(faculty.speaciality.name=== speaciality){       
        let enrollee = this.props.enrollee      
        enrollee.facultyName = facultyName
        enrollee.specialtyName = speaciality
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
    const enrollee = this.props.enrollee
    enrollee.facultyName = event.target.value;
    enrollee.specialtyName =  this.props.faculties[event.target.value][0]["speaciality"].name;
  
    this.props.updateFacultyName( enrollee.facultyName,enrollee.specialtyName) 
    this.props.updateEnrolleeData(enrollee)
    console.log(this.props.facultyName)
    this.updateExamsNames(enrollee.specialtyName,  enrollee.facultyName )   
   

  }  
  
    selectSpecialtyHandler = (event) => {      
    const enrollee = this.props.enrollee 
    enrollee.specialtyName = event.target.value   
    console.log(enrollee.specialtyName)
    this.props.updateEnrolleeData(enrollee)
    this.props.updateSpecialityName(event.target.value )  
    this.updateExamsNames(event.target.value, this.props.facultyName)
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
      this.props.updateEnrolleeData(enrollee)  
      this.setState({          
        isFormValid: validateForm(this.state.formControls.enrollerControls, this.state.formControls.subjectsControls)
      })
  }

    changeCertificate = (value, controlName, controls) => { 
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
        isFormValid: validateForm(this.state.formControls.enrollerControls, this.state.formControls.subjectsControls)
      })
  } 
  
  renderFacultyList () { 
    this.updateExamsNames(this.props.specialtyName, this.props.facultyName)
    return (
      <FacultyList
      facultiesList = {this.props.faculties}
      defaultFacultyName = {this.props.enrollee.facultyName}
      selectFacultyChangeHandler = {this.selectChangeHandler}
      selectSpecialtyChangeHandler = {this.selectSpecialtyHandler}
      state = {this.state}
      enrolleeSpeciality = {this.props.specialtyName}
      enrolleeFaculty = {this.props.facultyName}
    /> 
    )
  }

  componentDidMount() {     
    this.props.fetchFacultys()
  }  

  render() { 
    return (   
      
      <Auxillary>
   
        {  this.props.faculties !== null && this.props.faculties !== 'undefined'  ?   
                
           <div className={styles['create-enrolle']}>   
         
                <form onSubmit={this.submitHandler}> 
                  <div className={styles['create-enrolle__item1']}>
                  <h2>Данные абитуриента:</h2>           
                    {renderControls(this.state.formControls.enrollerControls, this.changeEnrolleHandler)}                    
                    {this.renderFacultyList()}      
                  </div>  
                  <div  className={styles['create-enrolle__item2']}>         
                    <h2>Аттестат:</h2>
                    <div className={styles['create-enrolle__certificate']}>
                    {renderControls(this.state.formControls.subjectsControls, this.changeCertificate)}</div>   
                  </div>
                  <hr/>     
                  <NavLink to='/'>
                  <Button
                    type="success"
                    onClick={this.registerEnrollee}
                    disabled={this.state.isFormValid === false}
                  >
                    Зарегистрировать
                </Button>       
                  </NavLink>
                  
                </form>        
            </div>
            : <Loader/>  
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
    facultyName:  state.faculties.facultyName
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFacultys: () => {dispatch(fetchFacultys())},
    updateEnrolleeData: (enrollee) => {dispatch(updateEnrolleeData(enrollee))},
    updateFacultyName:(facultyName, specialtyName ) => dispatch(updateFacultyName(facultyName, specialtyName)),
    updateSpecialityName:(specialtyName) => dispatch(updateSpecialityName(specialtyName))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEnrolle)