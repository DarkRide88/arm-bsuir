import styles from './EditFaculty.scss'
import React from 'react'


class EditFaculty extends React.Component {

  render() {
    return (
      <div className={styles.faculty}>
        <h1>Hi, it's EditFaculty</h1>
        {this.state.facultys}
      </div>
    )
  }
}

export default EditFaculty