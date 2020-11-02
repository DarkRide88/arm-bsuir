import React from 'react'
import styles from './ScheduleTable.scss'

class ScheduleTable extends React.Component {

  renderTableRows = () => {
    this.props.tableHeads.forEach(el => {
      console.log(el)
    })
    console.log()
    return this.props.tableHeads.map((head,index) => {
     
      return (
        <th key={index} colspan={head.colspan}>{head.name}</th>
      )
    });  
  }
  render() {
    return (
      <div className={styles['schedule-table']}>
        <table >
          <thead>
              <tr>
              {this.renderTableRows()}              
              </tr>
          </thead>        
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      </div>
    )
  }
  
}

export default ScheduleTable