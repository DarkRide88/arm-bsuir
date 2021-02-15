import React from 'react';
import Layout from './hoc/Layout/Layout'
import EnrolleList from './containers/EnrolleList/EnrolleList';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import CreateEnrolle from './containers/CreateEnrolle/CreateEnrolle';
import Enrollee from './containers/Enrollee/Enrollee';
import Schedule from './containers/Schedule/Schedule'
import Exams from './containers/Exams/Exams'
import Results from './containers/Results/Results'
import Faculties from './components/Faculties/Faculties'
import FacultyList from './containers/FacultyList/FacultyList';
import AddNewFaculty from './containers/AddNewFaculty/AddNewFaculty';
import Facuclty from './containers/Faculty/Faculty'
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { render } from '@testing-library/react';
import { autoLogin } from './store/actions/auth';

class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>                      
            <Route path='/auth' exact component={Auth}/>            
            <Route path='/schedule' exact component={Schedule}/>         
            <Route path='/results' exact component={Results}/>      
            <Redirect to='/auth' />
      </Switch>
    )
    if(this.props.isAuthentificated) {
      routes = (
      <Switch>          
            <Route path='/' exact component={EnrolleList}/>              
            <Route path='/create-enrolle' exact component={CreateEnrolle}/>
            <Route path='/schedule' exact component={Schedule}/>
            <Route path='/exams' exact component={Exams}/>
            <Route path='/results' exact component={Results}/>
            <Route path='/enrollee/:id' exact component={Enrollee}/> 
            <Route path='/faculty-list' exact component={FacultyList}/>  
            <Route path='/faculties/' exact component={Faculties}/> 
            <Route path='/faculty/:id' exact component={Facuclty}/>              
            <Route path='/add-new-faculty' exact component={AddNewFaculty}/>     
            <Route path='/logout' exact component={Logout}/>  
            <Redirect to='/' />
      </Switch>
      )
    }
    return (
      <Layout>
         {routes}
      </Layout>
    
    );
  }
  
}

function mapStateToProps(state) {
  return {
    isAuthentificated: !!state.authReducer.token
  }
}


function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => {dispatch(autoLogin())}
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))

