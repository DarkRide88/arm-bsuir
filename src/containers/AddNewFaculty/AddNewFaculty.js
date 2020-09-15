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
const speciality = [['Название специальности','text','name'],['Количество мест','text','numberOfPlaces'],['Экзамен 1','text','exam1'],['Экзамен 2','text','exam2'],['Экзамен 3','text','exam3']]


class AddNewFaculty extends React.Component {

  state = {
    controls:{
      faculty:createFormControls(faculty) ,
      specialities:[],
    },
    facultyName: '',
    specialities :[]      
  }

  renderFacultyNameField = (handler) => {
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
    let controll = this.state.controls.faculty[0]
    controll.touched = true
    controll.value = value
    controll.valid = validate(control.value, control.validation)
    let newFacultyName = value
    this.setState({
      facultyName: newFacultyName,
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
    // console.log(this.state.specialities)
    // console.log(this.state.facultyName)
    this.setState({
      specialities,
    }) 
  }

  onChangeHandler = () => {

  }



  renderSpecialities = (handler) => {
    const controll = this.state.controls.specialities; 
    return controll.map((controls,index) => {     
      return (
        <div key={index}>
            {
              controls.map((control,i) => { 
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
                        className={styles['facultyName']}
                      />           
                  </Auxillary>
                )
              })            
            }
           <hr/>
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
    // console.log(this.state.specialities)
    
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
             <hr/>
             <div className={styles['specialities']}>
                 {this.renderSpecialities(this.onChangeHandler)}
             </div>
           
          
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
              disabled={this.state.isFormValid === false}
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