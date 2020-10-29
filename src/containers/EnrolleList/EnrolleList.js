import React from 'react'
import styles from './EnrolleList.scss'
import axios from '../../axios/axios-arm'
import { NavLink } from 'react-router-dom'
import * as firebase from 'firebase'
import Loader from '../../components/UI/Loader/Loader'
import Search from '../../components/Search/Search'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import EnrollsTable from '../../components/EnrollsTable/EnrollsTable'
import PopUp from '../../components/PopUp/PopUp'
import Button from '../../components/UI/Button/Button'

class EnrolleList extends React.Component {
  state = {
    enrollers:null,
    loading: true,
    popUp: false,
    userToDelteId: null,
  }

  popupOnDelete = (enrollee) => {
    this.setState({
      popUp: true,
      userToDelteId: enrollee    
    })    
  }
  hidePopUp = () => {
    this.setState({
      popUp: false   
    })
  }
  deleteEnrollee = async () => {
    let enrollers =  Object.fromEntries(Object.entries(this.state.enrollers).filter((enroll, index) => {  
      if(enroll[0] !== this.state.userToDelteId) {
        console.log(enroll)       
        return  enroll[0]
      } 
      return null
    }))
    await firebase.database().ref('enrolls').child(this.state.userToDelteId).remove();
    this.props.history.push('/');

    this.setState({
      popUp: false,
      userToDelteId: null,
      enrollers,
    })
  
  }

   renderEnrollers() {
    console.log(this.state.enrollers)
     if(this.state.enrollers) {
    return Object.entries(this.state.enrollers).map((enroll, index) => {  
     
      return(
      <tr  key={enroll[0] + index}>
        <td>
          <NavLink to={'/enrollee/' + enroll[0]}>
            {enroll[1].name}
          </NavLink>     
        </td>
        <td> {enroll[1].phoneNumber}</td>
        <td>{enroll[1].age}</td>     
        <td> {enroll[1].address}</td>
        <td>{enroll[1].facultyName}</td>
        <td>  <div><NavLink to={'/enrollee/' + enroll[0]}><i className={"fa fa-pencil fa-fw"}></i>     </NavLink> </div> </td>
        <td><Button  onClick={()=> {this.popupOnDelete(enroll[0])}}  type="delete">X</Button></td>
      </tr>
     )
   })
  } 
  }
  
 async componentDidMount() { 
    const response = await axios.get('/enrolls.json')  
    this.setState({
      enrollers: response.data,
      loading:false
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
    let content = 
     this.state.enrollers !== '' ?
      <Auxillary>       
        <Search            
            type='search'
            placeholder='Найти абитуриента'  
            onChange={this.searchHandler}
        />       
        <EnrollsTable
           tableHeads = {['Имя','Телефон','Дата рождения','Адрес','Факультет']}
        >
          { this.state.loading  ? <tr><td></td><td></td><Loader/></tr> : this.renderEnrollers()}
        </EnrollsTable>
   
      </Auxillary>
      : <h1 style={{textAlign:'center'}}>Нет зарегистрированных абитуриентов</h1>  
       
   
    if (this.state.enrollers == null) {
      content = <Loader/>
    }
    return (
      
      <div className={styles['enrolle-list']}> 
      {this.state.popUp === false ? null : 
        <PopUp         
          onAccept = {this.deleteEnrollee}  
          onRefuse = {this.hidePopUp}
          text = 'Вы уверены, что хотите удалить данного абитуриента?'  
      />
      }
  
     {content}
         
      </div>
      
    )
  }
}


export default EnrolleList