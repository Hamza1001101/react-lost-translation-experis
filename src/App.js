import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

import Homepage from './components/homepage/Homepage';
import UserProfilePage from './components/profile/UserProfilePage'

import Translation from './components/translations/Translation';
import Header from './components/header/Header'

const App = () => {
  return (
    <>
      <h1>App</h1>

      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/homepage' />
          </Route>
          <Route path='/homepage' component={Homepage} />
          <Route path='/translate' component={Translation} />
          <Route path='/user-profile' component={UserProfilePage} />

        </Switch>



      </Router>


    </>
  );
}

export default App;
