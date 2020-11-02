import styles from './AddNewFaculty.scss'
import React from 'react'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {validate} from '../../form/formFramework'
import {createFormControls} from '../../utils/formControlsUtils'
import * as firebase from 'firebase'
import { NavLink } from 'react-router-dom'

const faculty = [['', 'text','facultyName', '', 'Введите название факультета']]
const speciality = [
  ['Название специальности','text','name'],['Количество мест','text','numberOfPlaces'],
  ['Экзамен 1','text','exam1'], ['Дата консультации','date','exam1ConsDate'],['Дата сдачи','date','exam1ExamDate'],
  ['Время консультации','text','exam1ConsTime'],['Время сдачи','text','exam1ExamTime'],
  ['Экзамен 2','text','exam2'],  ['Дата консультации','date','exam2ConsDate'],['Дата сдачи','date','exam2ExamDate'],
  ['Время консультации','text','exam2ConsTime'],['Время сдачи','text','exam2ExamTime'],
  ['Экзамен 3','text','exam3'], ['Дата консультации','date','exam3ConsDate'],['Дата сдачи','date','exam3ExamDate'],
  ['Время консультации','text','exam3ConsTime'],['Время сдачи','text','exam3ExamTime'],
]


class AddNewFaculty extends React.Component {

  state = {
    isFacultyNameEmpty:true,
    isSpecialityEmpty:true,
    controls:{
      faculty:createFormControls(faculty) ,
      specialities:[],
    },
    facultyName: '',
    specialities :[]      
  }

  renderFacultyNameField = () => {
    let control = this.state.controls.faculty
   
    control = control[0]  
    
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



  submitHandler = event => {
    event.preventDefault()  
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




  onChangeSpecialityHandler = (value,index, controlName, control, controlIndex) => { 
    
    let specialities = this.state.specialities 
    let speciality    
    let controll = this.state.controls.specialities[index][controlIndex]    
    controll.touched = true
    controll.value = value
    controll.valid = validate(control.value, control.validation)

    if(specialities[index]){
       speciality = specialities[index]           
    } else {
      specialities[index] = {speaciality: {name :'', numberOfPlaces: 0}, exam1: '', exam2: '', exam3: '', numberOfPlaces: 0}      
       speciality = specialities[index]  
    }
    if(controlName === 'name' || controlName ==='numberOfPlaces') {      
      speciality['speaciality'][controlName] = value
    } else {
      speciality[controlName] = value
    }
  
    specialities[index] = speciality
    this.setState({
      specialities,
    }) 
    console.log(specialities)
  }

  onChangeHandler = () => {

  }



  renderSpecialities = () => {
    const controll = this.state.controls.specialities; 
    return controll.map((controls,index) => {     
      return (
        <div key={index} className={styles['speciality-container']}>
            {
              controls.map((control,i) => { 
                {/* console.log(control.name) */}
                let className 
                if(control.name.length > 5 && control.name !== 'numberOfPlaces') {
                  console.log('hi')
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

  addSpecialityHandler = () => {
    const controls = this.state.controls
    let  specialityControls = createFormControls(speciality)     
    specialityControls.push( {name:'id', type: 'hidden', value:Math.random()})    
    controls.specialities.push(specialityControls)
    this.setState({
      controls
    })   
  }


  addFacultyToBase = async (event) => {    
    let faculty = {}   
    faculty[this.state.facultyName] = this.state.specialities   
    event.preventDefault()
    await firebase.database().ref('facultys').push(faculty);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className={styles['add-new-faculty']}>           
        <form onSubmit={this.submitHandler}> 
             <div className={styles['facultyName']}>
                {this.renderFacultyNameField(this.onChangeHandler)}
             </div>            
            
             <div className={styles['specialities']}>
                 {this.renderSpecialities(this.onChangeHandler)}
             </div>
           
          <hr/>
          <Button 
              type="success"
              onClick={this.addSpecialityHandler}
              disabled={this.state.isFormValid === false}
          >
            Добавить специальность
          </Button>
          <NavLink to='/'>
            <Button
              type="success"
              onClick={this.addFacultyToBase}
              disabled={this.state.isFacultyNameEmpty === true}
            >
              Добавить факультет в базу
           </Button>       
            </NavLink>

        </form>
      </div>
    )
  }
}

export default AddNewFaculty