import React from 'react';
import Layout from './hoc/Layout/Layout'
import EnrolleList from './containers/EnrolleList/EnrolleList';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import CreateEnrolle from './containers/CreateEnrolle/CreateEnrolle';
function App() {

  return (
    <Layout>
      <Switch>          
          <Route path='/' exact component={EnrolleList}/> 
          <Route path='/create-enrolle' exact component={CreateEnrolle}/>
          {/* <Route path='/schedule' exact component={Schedule}/>
          <Route path='/exams' exact component={Exams}/>
          <Route path='/results' exact component={Results}/>         */}
          <Redirect to='/' />
        </Switch>
    </Layout>
  
  );
}

export default App;
