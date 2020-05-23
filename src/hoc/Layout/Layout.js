import React, {Component} from 'react'
import styles from './Layout.scss'
import Navigation from '../../components/Navigation/Navigation'
// import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
// import Drawer from '../../components/Navigation/Drawer/Drawer'

class Layout extends Component {

  // state = {
  //   menu: false
  // }

  // toggleMenuHandler = () => {
  //   this.setState({
  //     menu: !this.state.menu
  //   })
  // }
  // menuCloseHandler = () => {
  //   this.setState({
  //     menu: false
  //   })
  // }

  render() {
    return (
      <div className={styles.layout}>
        {/* <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthentificated={this.props.isAuthentificated}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        /> */}
        <Navigation>
          
        </Navigation>
        <main className={styles.main}>
          { this.props.children }
        </main>
      </div>
    )
  }
}



export default Layout