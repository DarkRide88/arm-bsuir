import React from 'react'
import styles from './Exams.scss'
import Input from '../../components/UI/Input/Input'
import * as firebase from 'firebase'
import Loader from '../../components/UI/Loader/Loader'
import EnrollsTable from '../../components/EnrollsTable/EnrollsTable'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Search from '../../components/Search/Search'
import { connect } from 'react-redux'
import { fetchEnrollees, findEnrollee, updateEnrollees } from '../../store/actions/enrollees'

class Exams extends React.Component {

  onChange =  async (value, controlName, examName) => {   
    const enrollees = {...this.props.enrollees } 
    console.log(enrollees)
    enrollees[controlName].exams[examName].mark = value
   
    this.props.updateEnrollees(enrollees)
    this.updateIsUreadyToResult()
    this.calcAvgMark()
    await firebase.database().ref('enrolls').child(controlName).set(enrollees[controlName]);
  }

  getAvgMarkExam = (avg, enrollee, enrolleeName) => {
    let avgMark = 0
    let marksCount = 1
    let avgStudMark = 0

    Object.values(enrollee.exams).forEach(exam =>{   
      avgMark += +exam.mark  
      marksCount += 1
    })    
    avgStudMark = Math.round((avgMark + avg) /marksCount  *10)/10    
    const enrollees = {...this.props.enrollees } 
    enrollees[enrolleeName].avgMark = avgStudMark
    this.props.updateEnrollees(enrollees)
    avgMark = 0
  }

  calcAvgMark = () => { 
    Object.entries(this.props.enrollees).forEach(enrollee =>{
      let avgMark = 0
      let marksCount = 0
      Object.values(enrollee[1].сertificate).forEach(mark => {        
        avgMark += +mark
        marksCount += 1
      })
      avgMark = Math.round(avgMark/marksCount *10)/10    
      this.getAvgMarkExam(avgMark, enrollee[1], enrollee[0])
    })
    
  }

  updateIsUreadyToResult = () => {
    let obj = {}
    Object.entries(this.props.enrollees).forEach(enrollee => {          
         obj = Object.entries(enrollee[1].exams).filter(exam => {      
          if(exam[1].mark !== '' && +exam[1].mark>= 4){               
           return exam
          }
         return null
        })       
        if(obj.length === 3) {
          const enrollees = {...this.props.enrollees } 
          enrollees[enrollee[0]].readyToResults = true
          this.props.updateEnrollees(enrollees)
        } else {
          const enrollees = {...this.props.enrollees } 
          enrollees[enrollee[0]].readyToResults = false
          this.props.updateEnrollees(enrollees)
        
        }
    });
  }

  renderExams = () => {  
    return Object.entries(this.props.enrollees).map((enrolle, index) => { 
      console.log(enrolle[1])
       return(
        <tr  key={index}>
          <td>{enrolle[1].name}</td>
          <td>{enrolle[1].facultyName}</td>
          <td>{`${enrolle[1].exams.exam1.name}:`}</td>
          <td>
          <Input 
            label = 'exam1'
            value = {enrolle[1].exams.exam1.mark}
            maxLength = '1'
            onChange = {(event) => {this.onChange(event.target.value,enrolle[0],'exam1')}}
          /></td>
          <td>{`${enrolle[1].exams.exam2.name}:`}</td>
          <td>
          <Input 
          
            label = 'exam2'
            value = {enrolle[1].exams.exam2.mark}
            maxLength = '1'
            onChange = {(event) => {this.onChange(event.target.value,enrolle[0],'exam2')}}
          /></td> 
          <td>{`${enrolle[1].exams.exam3.name}:`}</td>
          <td>
          <Input 
            label = 'exam3'
            value = {enrolle[1].exams.exam3.mark}
            maxLength = '1'
            onChange = {(event) => {this.onChange(event.target.value,enrolle[0],'exam3')}}
          /></td>  
        </tr>
       )    
    })   
  }

  async componentDidMount() {
    this.props.fetchEnrollees()
    
  }

  render() {
    return(     
      <div className={styles.exams}>
        {this.props.enrollees !== null ?
          <Auxillary>
            <Search            
              type='search'
              placeholder='Найти абитуриента'  
              onChange={(event) => {this.props.findEnrollee(event, this.props.enrollees) }}
            />
            <EnrollsTable
              tableHeads = {['Имя', 'Факультет', '','','Оценки за экзамены','']}
            >
              {this.props.enrollees !== null ? this.renderExams(): null}
            </EnrollsTable>  
          </Auxillary>
          
        : <Loader/>}      
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    enrollees: state.enrollees.enrollees,
    searchInputValue: state.enrollees.searchInputValue,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEnrollees: () => dispatch(fetchEnrollees()),
    findEnrollee: ( event, enrollees ) => dispatch(findEnrollee(event, enrollees )),
    updateEnrollees: (enrollees) => dispatch(updateEnrollees(enrollees))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exams)