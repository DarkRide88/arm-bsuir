import React from 'react'
import styles from './CreateEnrolle.scss'
import {enrolleeControlsData,certificateControlsData} from './DataToEnrolle'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import { validate, validateEnrollee} from '../../form/formFramework'
import * as firebase from 'firebase'
import { NavLink } from 'react-router-dom'
import {createFormControls, renderControls} from '../../utils/formControlsUtils'
import FacultyList from '../../components/FacultyList/FacultyList'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { checkIsFormValid, fetchFacultys, updateFacultyData, updateSpecialityName } from '../../store/actions/faculties'
import { updateEnrolleeData, updateShoudUpdateEnrolleeStatus } from '../../store/actions/enrollees'
import {selectChangeHandler,selectSpecialtyHandler } from '../../utils/enrollees'

// For Test CreatEnrolle
const names = ['Артем','Егор','Павел','Сергей','Никита','Максим','Олег','Степан','Иван','Роман','Алексей']
const surnames = ['Иванов','Петров','Смирнов','Соболев','Добровольский','Фурс','Федоров','Семенов','Волков','Соловьев','Морозов']
const addresses = ['Скрипникова', 'Победителей', 'Независимости', 'Шамякина','Одинцова','Кирова','Байкальская','Азовская','Академическая','Братская','Беды']
const phoneNumbers = ['+375 44']


function random(min, max) {  
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

 



class CreateEnrolle extends React.Component {

  state = {
    isFormValid: true,  
    formControls: {
      enrollerControls:[...createFormControls(enrolleeControlsData)],
      subjectsControls:[...createFormControls(certificateControlsData)],   
    },     
  }


   testCreateEnrolle  ()  {  
    const enrollee = this.props.enrollee
 
    let enrollerControls = [...this.state.formControls.enrollerControls]
  
    let name = `${names[random(0,10)]}  ${surnames[random(0,10)]}`
    enrollerControls[0].value = name
    enrollee.name= name

    let age = `2020-07-${random(15,31)}`
    console.log(age)
    enrollerControls[1].value = age
    enrollee.age=age

    let address = `${addresses[Math.random(1).toFixed(1) * 10]} ${Math.random(1).toFixed(2) * 100}`
    enrollerControls[2].value = address
    enrollee.address=address

    let phoneNumber = `${phoneNumbers} ${Math.round(Math.random().toFixed(7)*1000000)}`
    enrollerControls[3].value = phoneNumber
    enrollee.phoneNumber= phoneNumber

    let passNumber = Math.round(Math.random().toFixed(8)*100000000)
    enrollerControls[4].value = passNumber
    enrollee.passNumber= passNumber

    this.props.updateEnrolleeData(enrollee)  
  
    this.props.checkIsFormValid(true)
    this.setState({                
    })
  }
  
  testCreateCertificate  () { 
    const enrollee = this.props.enrollee    
    let subjectsControls = [...this.state.formControls.subjectsControls]

    subjectsControls.forEach((mark) => {     
        let randomMark = random(6,10) 
        mark.value =  randomMark
        enrollee.сertificate[mark.name]  =  randomMark
        
    })    
    this.setState({         
    })     
    this.props.updateEnrolleeData(enrollee)

  } 



  submitHandler = event => {
    event.preventDefault()  
  }

   registerEnrollee = async (event) => {
    event.preventDefault()
    await firebase.database().ref('enrolls').push(this.props.enrollee);
    this.props.history.push('/');     
  }

  changeEnrolleHandler = (value, controlName, controls) => {  
    const enrollee = this.props.enrollee
    const formControls = [...controls];
    const control = formControls[controlName]
    control.touched = true
    control.value = value    
    control.valid = validate(value, control.validation)
    enrollee.name=controls[0].value
    enrollee.age=controls[1].value
    enrollee.address=controls[2].value
    enrollee.phoneNumber=controls[3].value
    enrollee.passNumber=controls[4].value
    this.props.updateEnrolleeData(enrollee)  
    let controlsToValidate = Object.assign({...this.state.formControls.enrollerControls},{...this.state.formControls.subjectsControls})
    let IsValid = validateEnrollee(controlsToValidate)
    this.props.checkIsFormValid(IsValid)
    this.setState({                
    })
  }

  changeCertificate = (value, controlName, controls) => { 
    const enrollee = this.props.enrollee
    const formControls = [...controls];
    const control = formControls[controlName]
    control.touched = true
    control.value = value     
    formControls[controlName] = control  
    control.valid = validate(value, control.validation)
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
    let controlsToValidate = Object.assign({...this.state.formControls.enrollerControls},{...this.state.formControls.subjectsControls})
    let IsValid = validateEnrollee(controlsToValidate)
    this.props.checkIsFormValid(IsValid)

    this.setState({           
    })
  } 

  setStartedFacultyData = (facultyName, speaciality) => {
    this.props.faculties[facultyName].forEach(faculty => {        
      if(faculty.name=== speaciality){       
        let enrollee =  this.props.enrollee      
        enrollee.facultyName =  this.props.facultyNameKey
        enrollee.specialtyName =  this.props.specialityNameKey
        enrollee.exams = {
          exam1: {name:faculty['exam1'],mark: ''},
          exam2: {name:faculty['exam2'],mark: ''},
          exam3: {name:faculty['exam3'],mark: ''}
        }     
        this.props.updateEnrolleeData(enrollee)      
      }
    }) 
  }

  renderFacultyList () { 
    this.setStartedFacultyData(this.props.facultyName, this.props.specialtyName)   
    return (
      <FacultyList
      facultiesList = {this.props.faculties}
      defaultFacultyName = {Object.keys(this.props.faculties)[0]}
      selectFacultyChangeHandler = {(event)=> {selectChangeHandler(event, this.props)}}
      selectSpecialtyChangeHandler = {(event)=> {selectSpecialtyHandler(event, this.props)}}
      enrolleeSpeciality = {this.props.specialtyName}
      enrolleeFaculty = {this.props.facultyName}
    /> 
    )
  }

  componentDidMount() {     
    if(this.props.faculties === null) {        
      this.props.fetchFacultys()
    }
    this.props.updateShoudUpdateEnrolleeStatus(true)
  }  


  render() { 
    if(this.props.faculties === null && this.props.loading === false ) {
      return(
        <h1 style={{textAlign:'center', marginTop:'1rem'}}>
          Создайте хотябы один факультет на <NavLink to="/add-new-faculty"> данной </NavLink> странице
        </h1>  
      )
    }
    return (         
      <Auxillary>   
        { this.props.faculties !== null && this.props.faculties !== 'undefined'  ?                  
            <div className={styles['create-enrolle']}>     
              <form onSubmit={this.submitHandler}> 
                <div className={styles['create-enrolle__item1']}>
                  <h2>Данные абитуриента:</h2>  
                  <hr/>         
                  {renderControls(this.state.formControls.enrollerControls, this.changeEnrolleHandler)}                    
                  {this.renderFacultyList()}                       
                </div>  
                <div  className={styles['create-enrolle__item2']}>         
                  <h2>Аттестат:</h2>
                  <hr/>
                  <div className={styles['create-enrolle__certificate']}>
                  {renderControls(this.state.formControls.subjectsControls, this.changeCertificate)}</div>   
                </div>
                <hr/>     
                <NavLink to='/'>
                  <Button
                    type="success"
                    onClick={this.registerEnrollee}
                    disabled={this.props.isFormValid === false}
                  >
                    Зарегистрировать
                  </Button>       
                </NavLink>                 
                <Button
                    type="success"
                    onClick={() => { this.testCreateCertificate(this.state.formControls.subjectsControls);
                                    this.testCreateEnrolle(this.state.formControls.subjectsControls)}}                   
                  >
                    Тестовое заполнение поля
                  </Button>        
              </form>        
            </div>
          :<Loader/>  
        }  
      </Auxillary>
    )
  }
}

function mapStateToProps(state) {
  return {
    faculties: state.faculties.faculties,
    loading: state.faculties.loading,
    enrollee: state.enrollees.enrollee,
    specialtyName: state.faculties.specialtyName,
    facultyName:  state.faculties.facultyName,
    facultiesFromRespoense: state.faculties.facultiesFromRespoense,
    facultyNameKey: state.faculties.facultyNameKey,
    specialityNameKey: state.faculties.specialityNameKey,
    isFormValid: state.faculties.isFormValid

  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEnrollees: () => {dispatch(fetchFacultys())},
    fetchFacultys: () => {dispatch(fetchFacultys())},
    updateEnrolleeData: (enrollee) => {dispatch(updateEnrolleeData(enrollee))},
    updateFacultyData:(facultyName, specialtyName, facultyNameKey,specialityNameKey ) => dispatch(updateFacultyData(facultyName, specialtyName, facultyNameKey, specialityNameKey)),
    updateSpecialityName:(specialtyName, specialtyNameKey) => dispatch(updateSpecialityName(specialtyName, specialtyNameKey)),
    updateShoudUpdateEnrolleeStatus:(shouldUpdate) => dispatch(updateShoudUpdateEnrolleeStatus(shouldUpdate)),
    checkIsFormValid: (isFormValid) => dispatch(checkIsFormValid(isFormValid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEnrolle)