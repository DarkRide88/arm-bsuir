import React from 'react'
import styles from '../CreateEnrolle/CreateEnrolle.scss'
import axios from '../../axios/axios-arm'
import {faculty,enrolleeControlsData,certificateControlsData} from '../../containers/CreateEnrolle/DataToEnrolle'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import { validate, validateForm} from '../../form/formFramework'
import {renderControls,renderOptions} from '../CreateEnrolle/CreateEnrolle'
import * as firebase from 'firebase'
import Loader from '../../components/UI/Loader/Loader'



const createFormControls = (controlsName,state) =>{ 
  let form =[]
  controlsName.map(control => {   
   Object.entries(state).map(enrollee => {     
      if(enrollee[0] === control[2] ){    
        form.push({
          maxlength:control[3],
          name: control[2],
          label: control[0],
          type: control[1],
          value: enrollee[1],
          errorMessage: 'Неверные данные',         
          required: true,
          valid: true,
          touched: true,   
          // validation:true,
          validation: {required:true},
        })
      } 
    }) 
  })
  return form   
}

class Enrollee extends React.Component {
  state = {
    isFormValid: true, 
    enrollee: null,
    loading: true,
    formControls: {
      enrollerControls:null,
      subjectsControls: null
    },
  }

  setFormControlsToState = () =>{
    let formControls = this.state.formControls
    formControls.enrollerControls = [...createFormControls(enrolleeControlsData, this.state.enrollee)]
    formControls.subjectsControls = [...createFormControls(certificateControlsData, this.state.enrollee.сertificate)]
    this.setState({
      formControls,
    })   
  }    
  
  async componentDidMount() {     
    try {
      const response = await axios.get(`/enrolls/${this.props.match.params.id}.json`)       
      this.setState({
        enrollee:response.data
      })         
    } catch (e) {
      console.log(e)
    }
    this.setFormControlsToState() 
  }  

  updateExamsNames = (speaciality) => {
    faculty[this.state.enrollee.facultyName].map(faculty => {   
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
    const enrollee = this.state.enrollee
    enrollee.facultyName = event.target.value
    enrollee.specialtyName = faculty[ event.target.value][0]["speaciality"].name
    this.setState({
      enrollee
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

  updateEnroller = async (event) =>{
    event.preventDefault()  
    await firebase.database().ref('enrolls').child(this.props.match.params.id).set(this.state.enrollee);
    this.props.history.push('/');
  }

  render() {  
    return (      
      <Auxillary>  
    
      {this.state.formControls.enrollerControls === null         
      ? <Loader/> 
      : <div className={styles['create-enrolle']}>    
     
        <h1>Редактировать данные абитуриента</h1>      
            <form onSubmit={this.submitHandler}> 
              <div className={styles['create-enrolle__item1']}>
              <h2>Данные абитуриента:</h2>            
              {renderControls(this.state.formControls.enrollerControls, this.changeEnrolleHandler)} 
                {renderOptions(faculty,this.state.enrollee.facultyName,this.selectChangeHandler, this.selectSpecialtyHandler, this.state)}    
              </div>  
              <div  className={styles['create-enrolle__item2']}>         
                <h2>Аттестат</h2>
                <div className={styles['create-enrolle__certificate']}>
                {renderControls(this.state.formControls.subjectsControls, this.changeCertificate)}
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
        </div>
      } 
      </Auxillary>      
    )
  }
}

export default Enrollee