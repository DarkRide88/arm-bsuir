import React from 'react';
import Layout from './hoc/Layout/Layout'
import EnrolleList from './containers/EnrolleList/EnrolleList';
import {Route, Switch, Redirect} from 'react-router-dom'
import CreateEnrolle from './containers/CreateEnrolle/CreateEnrolle';
import Enrollee from './containers/Enrollee/Enrollee';
import Schedule from './containers/Schedule/Schedule'
import Exams from './containers/Exams/Exams'
import Results from './containers/Results/Results'
import Faculties from './components/Faculties/Faculties'
import FacultyList from './containers/FacultyList/FacultyList';
import EditFaculty from './containers/EditFaculty/EditFaculty';
import AddNewFaculty from './containers/AddNewFaculty/AddNewFaculty';
import Facuclty from './containers/Faculty/Faculty'
function App() {
  return (
    <Layout>
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
          <Route path='/edit-faculty' exact component={EditFaculty}/>         
          <Route path='/add-new-faculty' exact component={AddNewFaculty}/>       
          <Redirect to='/' />
        </Switch>
    </Layout>
  
  );
}

export default App;
