import React from 'react'
import styles from './FetchedDataTable.scss'

class FetchedDataTable extends React.Component {

  renderTableRows = () => {
    return this.props.tableHeads.map((head,index) => {     
      return (
        <th key={index} colSpan={head.colspan}>{head.name}</th>
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

export default FetchedDataTable