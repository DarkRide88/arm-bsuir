import React, {Component} from 'react'
import styles from './Layout.scss'
import Navigation from '../../components/Navigation/Navigation'
import { connect } from 'react-redux'

class Layout extends Component {

  render() {
    return (
      <div className={styles.layout}> 
        <Navigation
          isAuthentificated = {this.props.isAuthentificated}
        >          
        </Navigation>
        <main className={styles.main}>
          { this.props.children }
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthentificated: state.authReducer.token
  }
}
export default connect(mapStateToProps)(Layout)
