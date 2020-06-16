import React from 'react'
import styles from './CreateEnrolle.scss'
import {enrolleeControlsData,faculty,certificateControlsData} from './DataToEnrolle'
import Select from '../../components/UI/Select/Select'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {createControl, validate, validateForm} from '../../form/formFramework'
import * as firebase from 'firebase'
import { NavLink } from 'react-router-dom'


// const controlsNames = [['Фио','text'],['Дата рождения', 'date'],['Адрес'],['Номер телефона'], ['Номер паспорта'] ]

export const createFormControls = (controlNames) =>{ 
  let form = controlNames.map(control => {   
   return createControl({
      maxlength:control[3],
      name: control[2],
      label: control[0],
      type: control[1],
      errorMessage: 'Неверные данные'
    }, {required: true})
    
  })
  
  return form 
}

export const renderOptions = (faculty,facultyName, changeHandler,specialtyHandler, state ) => { 
  return (  
  <Auxillary>
  <Select 
      label="Выберите факультет"      
      onChange={(event) => {changeHandler(event)}}    
      value = {state.enrollee.facultyName}     
      options={
        Object.keys(faculty).map((faculty, index)=> { 
          return {text: faculty, value: faculty}   
        })          
      }
      
  />    
  <Select      
    label="Выберите cпециальность"      
    onChange={(event) => {specialtyHandler(event)}} 
    value= {state.enrollee.specialtyName}
    options={
      faculty[facultyName].map((faculty, index)=> { 
      return {text: faculty['speaciality'].name, value: faculty['speaciality'].name}   
    })          
    }    
    /> 
 
  </Auxillary>    
  )     
}

export function renderControls(controls, handler) {    
  const controll = [...controls]; 
  return controll.map((control,index) => {     
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
        onChange={event => handler(event.target.value, index, controll)}

      />
     </Auxillary>
    )
  })
   
  
}

class CreateEnrolle extends React.Component {
  state = {
    isFormValid: false,   
    formControls: {
      enrollerControls:[...createFormControls(enrolleeControlsData)],
      subjectsControls:[...createFormControls(certificateControlsData)],   
    },    
    enrollee: {
      сertificate: {
        math:{},physics:{},chemistry:{},biology:{},geography:{},russianLang:{},belLang:{},belLitr:{},russianLitr:{},physicalEduc:{},english:{},historyBel:{},historyWorld:{},computerScince:{}  
      },
      name:'',
      age:'',
      phoneNumber:'',
      passNumber:'',
      address:'',
      medalist: false,
      facultyName: Object.entries(faculty)[0][0],
      specialtyName: Object.entries(faculty)[0][1][0]["speaciality"],

      exams: {
        exam1: {
          name:Object.entries(faculty)[0][1][0]["exam1"],
          mark: ''
        },
        exam2: {
          name:Object.entries(faculty)[0][1][0]["exam2"],
          mark: ''
        },
        exam3: {
          name:Object.entries(faculty)[0][1][0]["exam3"],
          mark: ''
        }
      }
    }
 
  }

  submitHandler = event => {
    event.preventDefault()  
  }

   registerEnrollee = async (event) => {
    event.preventDefault()
    await firebase.database().ref('enrolls').push(this.state.enrollee);
    this.props.history.push('/');
  }

    updateExamsNames = (speaciality) => {     
    faculty[this.state.enrollee.facultyName].map(faculty => {   
      if(faculty['speaciality'] === speaciality){    
        console.log(faculty['exam1'])    
        let enrollee = this.state.enrollee
        enrollee.exams = {
          exam1: {name:faculty['exam1'],mark: ''},
          exam2: {name:faculty['exam2'],mark: ''},
          exam3: {name:faculty['exam3'],mark: ''}
        }
       this.setState({
        enrollee
       })   
      }
    })  
   }
  
    selectChangeHandler = (event) => { 
    const enrollee = this.state.enrollee
    enrollee.facultyName = event.target.value;
    enrollee.specialtyName = faculty[event.target.value][0]["speaciality"].name;
    enrollee.
    this.setState({
      enrollee,
    })
    this.updateExamsNames(enrollee.specialtyName )   
   

  }  
  
    selectSpecialtyHandler = (event) => {      
    const enrollee = this.state.enrollee 
    enrollee.specialtyName = event.target.value   
    this.setState({
      enrollee,
       
    })
    this.updateExamsNames(event.target.value)
  }
  
    changeEnrolleHandler = (value, controlName, controls) => {  
      const enrollee = this.state.enrollee
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
        isFormValid: validateForm(this.state.formControls.enrollerControls, this.state.formControls.subjectsControls)
      })
  }

    changeCertificate = (value, controlName, controls) => {
      console.log(controls)
      const enrollee = this.state.enrollee
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
      this.setState({    
        enrollee,         
        isFormValid: validateForm(this.state.formControls.enrollerControls, this.state.formControls.subjectsControls)
      })
  }


  render() { 
    return (   
      <Auxillary>
     
      <div className={styles['create-enrolle']}>
      <h1>Регистрация нового абитуриента</h1>   
          <form onSubmit={this.submitHandler}> 
            <div className={styles['create-enrolle__item1']}>
            <h2>Данные абитуриента:</h2>           
               {renderControls(this.state.formControls.enrollerControls, this.changeEnrolleHandler)} 
               {renderOptions(faculty,this.state.enrollee.facultyName,this.selectChangeHandler, this.selectSpecialtyHandler, this.state)}      
            </div>  
            <div  className={styles['create-enrolle__item2']}>         
              <h2>Аттестат</h2>
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
      </Auxillary>
    )
  }
}

export default CreateEnrolle