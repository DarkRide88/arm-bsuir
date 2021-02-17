import React from 'react'
import { Component } from 'react'
import styles from './DarkenMode.scss'



 class  DarkenMode  extends Component {

  state = {
    toggleDarken: true
  }

  animToggle = () => {  

    if(this.state.toggleDarken) {   
      document.getElementById('animToggle').classList.remove(styles['activeWhite'])
      document.getElementById('animToggle').classList.add(styles['activeDarken'])     

    } else {
      document.getElementById('animToggle').classList.remove(styles['activeDarken'])    
    }      
  }

  toggleDarkenMode = () =>{
    
    this.animToggle()
    this.setState({
      toggleDarken: !this.state.toggleDarken
    })
    
    if(this.state.toggleDarken) {   
      let root = document.querySelector(':root')
      root.style.setProperty('--main-nav-color', 'white')      
      document.documentElement.style.setProperty("--main-nav-color", "white")
      document.documentElement.style.setProperty("--default-text-color", "white")   
     
      document.documentElement.style.setProperty("--default-dataTr-color", "#64626b")
    
    
    } else {  
      document.documentElement.style.setProperty("--main-nav-color", "black")
      document.documentElement.style.setProperty("--default-text-color", "black")
      document.documentElement.style.setProperty("--default-dataTr-color", "rgb(241, 115, 115)")   
    }
   
  }


  render() {
    let classes = [styles['DarkenMode']]
    if(!this.state.toggleDarken) {
      classes.push(styles['toggle'])
    }
    return(
      <div data-title="Тёмная тема"  className={classes.join(' ')} onClick={this.toggleDarkenMode}>   
        <div id='animToggle' className={styles['animToggle'] }></div>
      </div>      
    )
  }
 
}

export default DarkenMode