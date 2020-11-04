import styles from './Faculty.scss'
import React from 'react'
import { connect } from 'react-redux'
import { checkIsFormValid, fetchFaculty, updatefacultyNameControl, updateSpecialities, updateSpecialitiesControls } from '../../store/actions/faculties'
import Loader from '../../components/UI/Loader/Loader'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import {createFormControls} from '../../utils/formControlsUtils'
import { NavLink } from 'react-router-dom'
import Input from '../../components/UI/Input/Input'
import {validate, validateForm} from '../../form/formFramework'
import {renderFacultyNameField} from '../../utils/facultiesHandlers'
import * as firebase from 'firebase'
const faculty = [['', 'text','facultyName', '', 'Введите название факультета']]
const specialityDefault = [
  ['Название специальности','text','name'],['Количество мест','text','numberOfPlaces'],
  ['Экзамен 1','text','exam1'], ['Дата консультации','date','exam1ConsDate'],['Дата сдачи','date','exam1ExamDate'],
  ['Время консультации','text','exam1ConsTime'],['Время сдачи','text','exam1ExamTime'],
  ['Экзамен 2','text','exam2'],  ['Дата консультации','date','exam2ConsDate'],['Дата сдачи','date','exam2ExamDate'],
  ['Время консультации','text','exam2ConsTime'],['Время сдачи','text','exam2ExamTime'],
  ['Экзамен 3','text','exam3'], ['Дата консультации','date','exam3ConsDate'],['Дата сдачи','date','exam3ExamDate'],
  ['Время консультации','text','exam3ConsTime'],['Время сдачи','text','exam3ExamTime'],
] 


class Faculty extends React.Component {


  state = {
    controls:{
      faculty:createFormControls(faculty) ,
      specialities:[],
    },
    facultyName: '',
    specialities :[]  
  }


  onChangeFacultyHandler = (value, control) => { 

    let flag = true 
    if(value !== '') {
      flag = false
    }   
    let controll = this.state.controls.faculty[0]
    controll.touched = true
    controll.value = value
    controll.valid = validate(control.value, control.validation)
    let newFacultyName = value
    this.setState({
      facultyName: newFacultyName,
      isFacultyNameEmpty:flag
    }) 
  
  }


  renderSpecialities = () => { 
    const controll = this.props.specialitiesControls; 
  

    return controll.map((controls,index) => {     
      return (
        <div key={index} className={styles['speciality-container']}>
            {
              controls.map((control,i) => {                
                let className 
                if(control.name.length > 5 && control.name !== 'numberOfPlaces') {              
                  className = 'schedule-input'                  
                }
                return(
                  <Auxillary key={i}>
                  
                      <Input
                        maxlength={control.maxlength}
                        type={control.type}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={(event) => {this.onChangeSpecialityHandler(event.target.value, index, control.name, controls, i)}}   
                        placeholder={control.placeholder}   
                        className={styles[className]}
                      />           
                  </Auxillary>
                )
              })            
            }
           
        </div>
        
      )
    })
  }

  onChangeSpecialityHandler = (value,index, controlName, control, controlIndex) => { 
    
    let specialities = this.props.specialities 

    let speciality    
    let specialitiesControls = [...this.props.specialitiesControls]
  
    let controll = specialitiesControls[index][controlIndex]    

    // console.log(control[index])

    specialitiesControls[index][controlIndex].touched   = true
    specialitiesControls[index][controlIndex].value  = value
    specialitiesControls[index][controlIndex].valid = validate(value, control[index].validation)  
    if(specialities[index]){
       speciality = specialities[index]           
    } else {
      specialities[index] = {}      
       speciality = specialities[index]  
    }
 
    speciality[controlName] = value
    specialities[index] = speciality
    // validateForm(specialitiesControls)
    this.props.updateSpecialities(specialities)
    this.props.updateSpecialitiesControls(specialitiesControls)
    let IsValid = validateForm(specialitiesControls)
    this.props.checkIsFormValid(IsValid)
  
  }


  renderFacultyNameField = () => {    
    
    let control = this.props.facultyNameControl[0]
   

    return (
      <Input
      maxlength={control.maxlength}
      type={control.type}
      label={control.label}
      value={control.value}
      valid={control.valid}
      shouldValidate={!!control.validation}
      touched={control.touched}
      placeholder={control.placeholder}
      errorMessage={control.errorMessage}
      onChange={event => {this.onChangeFacultyHandler(event.target.value, event.target)}
      }
    />
    )
  }
  renderSpecialities(handler) {
    
  }

  componentDidMount() {
    this.props.fetchFaculty(this.props.match.params.id)
  }

  submitHandler(event) {
    event.preventDefault()
  }

   updateFacultyInDatabase = async (event) =>{
    event.preventDefault()     
    let faculty = {}   
    faculty[this.props.facultyNameControl[0].value] = this.props.specialities   
    await firebase.database().ref('facultys').child(this.props.match.params.id).set(faculty);
    this.props.history.push('/faculty-list');
  }
  addSpecialityHandler = () => {
    let specialitiesControls = [...this.props.specialitiesControls] 
    let  specialityControl = createFormControls(specialityDefault)     
    specialityControl.push( {name:'id', type: 'hidden', value:Math.random()})    
    specialitiesControls.push(specialityControl)
    this.props.updateSpecialitiesControls(specialitiesControls)
  }

  onChangeFacultyHandler = (value, control) => {    
    let flag = false 
    if(value !== '') {
      flag = true
    }   
    let facultyNameControll = {...this.props.facultyNameControl}
    facultyNameControll[0].touched = true
    facultyNameControll[0].value = value
    facultyNameControll[0].valid = validate(control.value, control.validation)
   
    this.props.updatefacultyNameControl(facultyNameControll)   
    
    this.props.checkIsFormValid(flag) 
  }


  render() {
    return (
      <div className={styles['faculty']}>
        {this.props.faculty !== null && this.props.facultyNameControl !==null  && this.props.specialitiesControls !== null?     
          <Auxillary>
          <form onSubmit={this.submitHandler}> 
            <div className={styles['facultyName']}>
                  {renderFacultyNameField(this.props.facultyNameControl[0],this.onChangeFacultyHandler)}
              </div>            
              
              <div className={styles['specialities']}>
                  {this.renderSpecialities() }
              </div>
            
            <hr/>
            <Button 
                type="success"
                onClick={this.addSpecialityHandler}
                // disabled={this.state.isFormValid === false}
            >
              Добавить специальность
            </Button>
            <NavLink to='/'>
              <Button
                type="success"
                onClick={this.updateFacultyInDatabase}
                disabled={this.props.isFormValid === false}
              >
                Сохранить изменения
            </Button>       
              </NavLink>
          </form>       
          </Auxillary>   
        : <Loader/>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    faculty: state.faculties.faculty,
    loading: state.enrollees.loading,
    facultyNameControl: state.faculties.facultyNameControl,
    specialityNameControl: state.faculties.specialityNameControl,
    specialitiesControls: state.faculties.specialitiesControls,
    specialities: state.faculties.specialities,
    isFormValid: state.faculties.isFormValid,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFaculty :(id) => dispatch(fetchFaculty(id)),
    updatefacultyNameControl: (name) => dispatch(updatefacultyNameControl(name)),
    updateSpecialities: (specialities) => dispatch(updateSpecialities(specialities)),
    updateSpecialitiesControls: (specialitiesControls) => dispatch(updateSpecialitiesControls(specialitiesControls)),
    checkIsFormValid: (isFormValid) => dispatch(checkIsFormValid(isFormValid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Faculty)