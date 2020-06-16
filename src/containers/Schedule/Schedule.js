import React from 'react'
import styles from './Schedule.scss'
import axios from '../../axios/axios-arm'

class Schedule extends React.Component{

  state = {
    enrollers: null
  }
  async componentDidMount() {
    const response = await axios.get('/enrolls.json')  
    this.setState({
      enrollers: response.data,    
    })      
    console.log(this.state.enrollers)
  }

  render() {
    return(
      <div className={styles.schedule}>
        Hello, it's schedule
      </div>
    )
  }
}


export default Schedule