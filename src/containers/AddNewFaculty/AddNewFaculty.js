import styles from './AddNewFaculty.scss'
import React from 'react'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {validate,validateForm} from '../../form/formFramework'
import {createFormControls} from '../../utils/formControlsUtils'
import {renderFacultyNameField} from '../../utils/facultiesHandlers'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { checkIsFormValid, updateShoudUpdateFacultiesStatus } from '../../store/actions/faculties'

const faculty = [{label:'', type:'text',name:'facultyName', maxlength:'', placeholder:'Введите название факультета'}]
const speciality = [ 
  {label:'Название специальности', type:'text',name:'name'},{label:'Количество мест',type:'text',name:'numberOfPlaces'},
  {label:'Экзамен 1',type:'text',name:'exam1'}, {label:'Дата консультации',type:'date',name:'exam1DateCons'},{label:'Дата сдачи',type:'date',name:'exam1DateExam'},
  {label:'Время консультации',type:'text',name:'exam1TimeCons', placeholder:'чч:мм'},{label:'Время сдачи',type:'text',name:'exam1TimeExam', placeholder:'чч:мм'},
  {label:'Экзамен 2',type:'text',name:'exam2'},  {label:'Дата консультации',type:'date',name:'exam2DateCons'},{label:'Дата сдачи',type:'date',name:'exam2DateExam'},
  {label:'Время консультации',type:'text',name:'exam2TimeCons', placeholder:'чч:мм'},{label:'Время сдачи',type:'text',name:'exam2TimeExam', placeholder:'чч:мм'},
  {label:'Экзамен 3',type:'text',name:'exam3'}, {label:'Дата консультации',type:'date',name:'exam3DateCons'},{label:'Дата сдачи',type:'date',name:'exam3DateExam'},
  {label:'Время консультации',type:'text',name:'exam3TimeCons', placeholder:'чч:мм'},{label:'Время сдачи',type:'text',name:'exam3TimeExam', placeholder:'чч:мм'},
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

  submitHandler = event => {
    event.preventDefault()  
  }

  onChangeFacultyHandler = (inputValue, changedInput) => { 
    let flag = true 
    if(inputValue !== '') {
      flag = false
    }   
    console.log(inputValue)
    let controll = this.state.controls.faculty[0]
    console.log(controll)
    controll.touched = true
    controll.value = inputValue
    controll.valid = validate(changedInput.value, changedInput.validation)
    let newFacultyName = inputValue
    this.setState({
      facultyName: newFacultyName,
      isFacultyNameEmpty:flag
    })   
  }

  onChangeSpecialityHandler = (inputValue, specialityIndex, controlName, controls, controlIndex) => { 
    let specialities = this.state.specialities 
    let speciality    
    console.log(inputValue, specialityIndex, controlName, controls,controlIndex )
    let controll = this.state.controls.specialities[specialityIndex][controlIndex]    
    controll.touched = true
    controll.value = inputValue
    controll.valid = validate(inputValue, controls[specialityIndex].validation)
    if(specialities[specialityIndex]){
       speciality = specialities[specialityIndex]           
    } 
    else {
      specialities[specialityIndex] = {}      
       speciality = specialities[specialityIndex]  
    }
    speciality[controlName] = inputValue
    specialities[specialityIndex] = speciality
    this.setState({
      specialities,
    }) 
    let IsValid = validateForm(this.state.controls.specialities)
    this.props.checkIsFormValid(IsValid)
  }
 
  renderSpecialities = () => {
    const controll = this.state.controls.specialities; 
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
    this.props.history.push('/faculty-list');
  }

  componentDidMount() {
    this.props.updateShoudUpdateFacultiesStatus(true)
  }

  render() {
    return (
      <div className={styles['add-new-faculty']}>           
        <form onSubmit={this.submitHandler}> 
          <div className={styles['facultyName']}>        
            { renderFacultyNameField(this.state.controls.faculty[0] , this.onChangeFacultyHandler)}
          </div>   
          <div className={styles['specialities']}>
            {this.renderSpecialities(this.onChangeHandler)}
          </div>           
          <hr/>
          <Button 
            type="closing-button"
            onClick={this.addSpecialityHandler}
            disabled={this.state.isFormValid === false}
          >
            <span>Добавить специальность</span>
          </Button>
          {/* <NavLink to='/'> */}
            <Button
              type="closing-button"
              onClick={this.addFacultyToBase}
              disabled={this.props.isFormValid === false}
            >
              <span>Добавить факультет в базу</span>
            </Button>       
          {/* </NavLink> */}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFormValid: state.faculties.isFormValid
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkIsFormValid: (isFormValid) => dispatch(checkIsFormValid(isFormValid)),
    updateShoudUpdateFacultiesStatus: (shouldUpdate) => dispatch(updateShoudUpdateFacultiesStatus(shouldUpdate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewFaculty)