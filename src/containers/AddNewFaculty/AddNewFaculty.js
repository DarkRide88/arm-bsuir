import styles from './AddNewFaculty.scss'
import React from 'react'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {createControl, validate, validateForm} from '../../form/formFramework'
import {createFormControls} from '../CreateEnrolle/CreateEnrolle'
const faculty = [['', 'text','facultyName', '', 'Введите название факультета']]
const speciality = [['Название специальности','text','speacialityName'],['Количество мест','text','placesCount'],['Экзамен 1','text','exam1'],['Экзамен 2','text','exam2'],['Экзамен 3','text','exam3']]



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
    console.log( this.state.controls.faculty[0])
    let facultyName = this.state.facultyName
    let controll = this.state.controls.faculty[0]
    controll.touched = true
    controll.value = value
    controll.valid = validate(control.value, control.validation)

    this.setState({
      facultyName,
    }) 
  }

  // onChangeSpecialityHandler = (value,name, control) => { 
   
  //   let specialities = this.state.specialities
  //   specialities.put 
  //   let controll = this.state.controls.faculty[0]
  //   controll.touched = true
  //   controll.value = value
  //   controll.valid = validate(control.value, control.validation)
  //   specialities[name].
  //   this.setState({
  //     speacialityName,
  //   }) 
  // }

  onChangeHandler = () => {

  }

  renderSpecialities = (handler) => {
    const controll = this.state.specialities; 
  
    return controll.map((controls,index) => {     
      return (
        <div key={index}>
            {
              controls.map((control,index) => {
                return(
                  <Auxillary key={index}>
                  
                      <Input
                        maxlength={control.maxlength}
                        type={control.type}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={(event) => {this.onChangeSpecialityHandler(event.target.value, index, event.target)}}   
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
   
    const specialities = this.state.specialities
    specialities.push(createFormControls(speciality))  
    
    this.setState({
      specialities
    })
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
    

        </form>
      </div>
    )
  }
}

export default AddNewFaculty