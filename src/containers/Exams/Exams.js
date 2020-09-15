import React from 'react'
import styles from './Exams.scss'
import axios from '../../axios/axios-arm'
import Input from '../../components/UI/Input/Input'
import * as firebase from 'firebase'
import Loader from '../../components/UI/Loader/Loader'
import EnrollsTable from '../../components/EnrollsTable/EnrollsTable'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Search from '../../components/Search/Search'

class Exams extends React.Component {

  state = {
    enrollers: null
  }
  onChange = (value, controlName, examName) => {   
    const enrollers = this.state.enrollers  
    enrollers[controlName].exams[examName].mark = value
    this.setState({
      enrollers,
    })
    this.updateIsUreadyToResult()
    this.calcAvgMark()
    firebase.database().ref('enrolls').set(this.state.enrollers);

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
    let enrollers = this.state.enrollers
    enrollers[enrolleeName].avgMark = avgStudMark
    this.setState({
      enrollers
    }) 
    avgMark = 0
  }

  calcAvgMark = () => {
 
    Object.entries(this.state.enrollers).forEach(enrollee =>{
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
    Object.entries(this.state.enrollers).forEach(enrollee => {          
         obj = Object.entries(enrollee[1].exams).filter(exam => {      
          if(exam[1].mark !== '' && +exam[1].mark>= 4){      
            console.log(exam[1])    
           return exam
          }
        })
        console.log(obj)
        if(obj.length === 3) {
          const enrollers = this.state.enrollers
          enrollers[enrollee[0]].readyToResults = true
          this.setState({
            enrollers
          })
        } else {
          const enrollers = this.state.enrollers
          enrollers[enrollee[0]].readyToResults = false
          this.setState({
            enrollers
          })
        }
    });
  }

  renderExams = () => {  
    return Object.entries(this.state.enrollers).map((enrolle, index) => {  
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
    const response = await axios.get('/enrolls.json')  
    this.setState({
      enrollers: response.data,    
    })  
  }

  searchHandler =  (event) =>{    
    let enr = []
     Object.entries(this.state.enrollers).forEach(enrollee => {     
      let name = enrollee[1].name.toLowerCase()
      if(name.indexOf(event.target.value.toLowerCase()) === 0 && event.target.value !== ''){
        Object.entries(this.state.enrollers).forEach(enrollee => {          
          if(enrollee[1].name.toLowerCase() === name){
            enr.push(enrollee)            
          }
        })
     
        this.setState({
          enrollers: Object.fromEntries(enr)
        })
      }
    })

  
    if(event.target.value === '') {
      firebase.database().ref('enrolls').on('value',(snap)=>{     
        this.setState({
          enrollers:snap.val()
        })
      })
    }

  }

  render() {

    return(     
      <div className={styles.exams}>
        {this.state.enrollers !== null ?
          <Auxillary>
            <Search            
              type='search'
              placeholder='Найти абитуриента'  
              onChange={this.searchHandler}
            />
            <EnrollsTable
              tableHeads = {['Имя', 'Факультет', '','','Оценки за экзамены','']}
            >
              {this.state.enrollers !== null ? this.renderExams(): null}
            </EnrollsTable>  
          </Auxillary>
          
        : <Loader/>}      
      </div>

    )
  }
}

export default Exams