import React from 'react'
import styles from './EnrolleList.scss'
import {connect} from 'react-redux'

// import Loader from '../../components/UI/Loader/Loader'

class EnrolleList extends React.Component {
  render() {
    return (
      <div className={styles['enrolle-list']}>
        <h1>Enrolle List</h1>
      </div>
    )
  }
}

function mapStateToProps() {
  return {

  }
}

function mapDispatchToProps() {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EnrolleList)