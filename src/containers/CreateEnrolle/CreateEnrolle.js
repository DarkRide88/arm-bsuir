import React from 'react'
import styles from './CreateEnrolle.scss'
import {enrolleeControlsData,certificateControlsData} from './DataToEnrolle'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import { validate, validateForm} from '../../form/formFramework'
import * as firebase from 'firebase'
import { NavLink } from 'react-router-dom'
import axios from '../../axios/axios-arm'
import {createFormControls, renderControls} from '../../utils/formControlsUtils'
import FacultyList from '../../components/FacultyList/FacultyList'
import {getFaculties} from '../../utils/getFaculties'
import Loader from '../../components/UI/Loader/Loader'
class CreateEnrolle extends React.Component {
  state = {
    isFormValid: false,   
    faculties: null,
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
      facultyName: null,
      specialtyName: null,

      exams: {
        exam1: {
          name:null,
          mark: ''
        },
        exam2: {
          name:null,
          mark: ''
        },
        exam3: {
          name:null,
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
      this.state.faculties[this.state.enrollee.facultyName].forEach(faculty => {   
      if(faculty['speaciality'] === speaciality){       
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
    enrollee.specialtyName =  this.state.faculties[event.target.value][0]["speaciality"].name;
   
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


  updateDataInState(faculties ) {
    let enrollee = this.state.enrollee   
    enrollee.facultyName = Object.entries(faculties)[0][0]
    enrollee.specialtyName = Object.entries(faculties)[0][1][0]["speaciality"].name
    enrollee.exams = {
      exam1: {
        name:Object.entries(faculties)[0][1][0]["exam1"],
        mark: ''
      },
      exam2: {
        name:Object.entries(faculties)[0][1][0]["exam2"],
        mark: ''
      },
      exam3: {
        name:Object.entries(faculties)[0][1][0]["exam3"],
        mark: ''
      }
    }
    this.setState({
      faculties,
      enrollee,
    })   
  }

  async componentDidMount() {     
    try {
      const response = await axios.get('/facultys.json') 
      let faculties = getFaculties(response.data)       
      this.updateDataInState(faculties)      
    } catch (e) {
      console.log(e)
    }
   
  }  

  render() { 
    return (   
      <Auxillary>
        {this.state.faculties === null 
          ? <Loader/>           
          : <div className={styles['create-enrolle']}>         
                <form onSubmit={this.submitHandler}> 
                  <div className={styles['create-enrolle__item1']}>
                  <h2>Данные абитуриента:</h2>           
                    {renderControls(this.state.formControls.enrollerControls, this.changeEnrolleHandler)}  
                          
                  
                    
                      <FacultyList
                          facultiesList = {this.state.faculties}
                          defaultFacultyName = {this.state.enrollee.facultyName}
                          selectFacultyChangeHandler = {this.selectChangeHandler}
                          selectSpecialtyChangeHandler = {this.selectSpecialtyHandler}
                          state = {this.state}
                          enrolleeSpeciality = {this.state.enrollee.specialtyName}
                          enrolleeFaculty = {this.state.enrollee.facultyName}
                        /> 
                    

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
        }  
      </Auxillary>
    )
  }
}

export default CreateEnrolle