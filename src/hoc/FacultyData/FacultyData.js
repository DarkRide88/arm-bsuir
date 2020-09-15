import React, {Component} from 'react'
import styles from './Layout.scss'
import Navigation from '../../components/Navigation/Navigation'
// import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
// import Drawer from '../../components/Navigation/Drawer/Drawer'

class FacultyData extends Component {



  render() {
    return (
      <div className={styles.layout}>

        <Navigation>
          
        </Navigation>
        <main className={styles.main}>
          { this.props.children }
        </main>
      </div>
    )
  }
}



export default FacultyData