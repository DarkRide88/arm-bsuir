import React from 'react'
import styles from './EnrollsTable.scss'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

class EnrollsTable extends React.Component {

  renderTableRows = () => {
    // console.log(this.props.tableHeads)
    return this.props.tableHeads.map((head,index) => {
      return (
        <th key={index}>{head}</th>
      )
    });
    return (      
      <div>hi</div>
    )
  }
  render() {
    return (
      <div className={styles['enrolls-table']}>
        <table >
          <thead>
              <tr >
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

export default EnrollsTable