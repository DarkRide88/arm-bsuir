import React from 'react'
import styles from './CreateEnrolle.scss'
import {connect} from 'react-redux'
import {controlsNames,faculty,subjects} from './DataToEnrolle'
import Select from '../../components/UI/Select/Select'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Input from '../../components/UI/Input/Input'
import {createControl, validate, validateForm} from '../../form/formFramework'


// const controlsNames = [['Фио','text'],['Дата рождения', 'date'],['Адрес'],['Номер телефона'], ['Номер паспорта'] ]

const createFormControls = (controlNames) =>{ 
  let form = controlNames.map(control => {   
   return createControl({
     
      label: control[0],
      type: control[1],
      errorMessage: 'Неверные данные'
    }, {required: true})
    
  })
  return form 
}

// const createSubjectsControls = (subjects) => {
//   let form = subjects.map(control => {   
//     return createControl({
      
//        label: control,     
//        errorMessage: 'Неверные данные'
//      }, {required: true})
     
//    })
//    return form 
// }
class CreateEnrolle extends React.Component {
  state = {
    isFormValid: false,   
    enrollerControls:[...createFormControls(controlsNames)],
    subjectsControls:[...createFormControls(subjects)],   
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

  submitHandler = event => {
    event.preventDefault()
  }


  renderOptions = (faculty) => { 
    return (  
    <Auxillary>
    <Select 
        label="Выберите факультет"      
        onChange={this.selectChangeHandler}          
        options={
          Object.keys(faculty).map((faculty, index)=> { 
            return {text: faculty, value: faculty}   
          })          
        }
        
    />          
    <Select      
      label="Выберите cпециальность"      
      onChange={this.selectSpecialtyHandler}      
      options={
        faculty[this.state.facultyName].map((faculty, index)=> { 
        return {text: faculty['speaciality'], value: faculty['speaciality']}   
      })          
      }    
      /> 
   
    </Auxillary>    
    )     
  }

  updateExamsNames = (speaciality) => {
    faculty[this.state.facultyName].map(faculty => {   
      if(faculty['speaciality'] === speaciality){        
       this.setState({
         exams: {
           exam1: {name:faculty['exam1'],mark: ''},
           exam2: {name:faculty['exam2'],mark: ''},
           exam3: {name:faculty['exam3'],mark: ''}
         }
       })   
      }
    })  
   }

  selectChangeHandler = (event) => {     
    this.setState({
      facultyName: event.target.value,
      specialtyName: faculty[ event.target.value][0]["speaciality"]
    })
    this.updateExamsNames()
  }


  selectSpecialtyHandler = (event) => {          
    this.setState({
      specialtyName: event.target.value,     
    })
    this.updateExamsNames(event.target.value)
  }

  changeHandler = (value, controlName, controls) => {
    const formControls = controls.slice();
    const control = formControls[controlName]

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)
    console.log(formControls[0])
    formControls[controlName] = control  
    this.setState({     
      isFormValid: validateForm()
    })
  }

  renderControls(controls) { 
    return controls.map((control,index) => {     
      return(
        <Auxillary key={index}>
          <Input
          type={control.type}
          label={control.label}
          value={control.value}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          errorMessage={control.errorMessage}
           onChange={event => this.changeHandler(event.target.value, index, controls)}

        />
       </Auxillary>
      )
    })
     
    
  }
  

  render() { 
    return (   
      <div className={styles['create-enrolle']}>
        <div>
          <h1>Регистрация нового абитуриента</h1>

          <form onSubmit={this.submitHandler}> 
            {this.renderControls(this.state.enrollerControls)}           
            <h2>Аттестат:</h2>           
            {this.renderControls(this.state.subjectsControls)}
            {this.renderOptions(faculty)}  
            {console.log(this.state)}
           
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps() {
  return {

  }
}

function mapDispatchToProps() {
  return {
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEnrolle)